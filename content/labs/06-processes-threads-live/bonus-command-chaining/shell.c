// SPDX-License-Identifier: BSD-3-Clause

/*
 * A small shell: commands with arguments and builtins, run in the background
 * with `&`, and chained with `;`, `&&` and `||`, which decide whether the
 * next command runs from how the last one ended.
 *
 *     minish> gcc -Wall main.c && ./a.out || echo "build failed"
 *     minish> sleep 5 & echo meanwhile
 */

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <sys/types.h>
#include <sys/wait.h>

#define LINE_LEN	1024
#define MAX_TOKENS	64

/*
 * Print the prompt and read one line from standard input into `line`,
 * dropping the newline.  Returns 0 on success and -1 at end of input
 * (Ctrl-D).  Already written.
 */
static int read_line(char *line, size_t len)
{
	printf("minish> ");
	fflush(stdout);

	if (fgets(line, len, stdin) == NULL)
		return -1;

	line[strcspn(line, "\n")] = '\0';

	return 0;
}

/*
 * Split `line` into words separated by spaces or tabs, in place; a `;` is a
 * word of its own, with or without spaces around it.  Leaves the array
 * ending in a NULL pointer.  Returns the number of words, at most `max`.
 * Already written.
 *
 *     "ls -l && echo done"  ->  "ls", "-l", "&&", "echo", "done"
 *     "ls; pwd;"            ->  "ls", ";", "pwd", ";"
 */
static int tokenize(char *line, char *tokens[], int max)
{
	static const char semicolon[] = ";";
	int count = 0;
	char *word, *semi;

	word = strtok(line, " \t");
	while (word != NULL && count < max) {
		while ((semi = strchr(word, ';')) != NULL) {
			*semi = '\0';
			if (*word != '\0' && count < max)
				tokens[count++] = word;
			if (count < max)
				tokens[count++] = (char *) semicolon;
			word = semi + 1;
		}
		if (*word != '\0' && count < max)
			tokens[count++] = word;
		word = strtok(NULL, " \t");
	}
	tokens[count] = NULL;

	return count;
}

/*
 * Handle the commands the shell runs itself: `cd` and `exit`.  Returns 1 if
 * `argv` was a builtin, 0 otherwise.  From exercise 02.
 */
static int run_builtin(char *argv[])
{
	if (strcmp(argv[0], "exit") == 0)
		exit(0);

	if (strcmp(argv[0], "cd") == 0) {
		const char *dir = argv[1] ? argv[1] : getenv("HOME");

		if (dir == NULL)
			dir = "/";
		if (chdir(dir) < 0)
			perror("cd");
		return 1;
	}

	return 0;
}

/* Whether a word is one of the operators that separate two commands. */
static int is_operator(const char *word)
{
	return strcmp(word, ";") == 0 || strcmp(word, "&&") == 0 ||
	       strcmp(word, "||") == 0 || strcmp(word, "&") == 0;
}

/*
 * Collect the background children that have finished since the last prompt,
 * without waiting for the ones still running.  From the background bonus.
 */
static void reap_background(void)
{
	pid_t pid;

	while ((pid = waitpid(-1, NULL, WNOHANG)) > 0)
		fprintf(stderr, "[%d finished]\n", (int) pid);
}

/*
 * Run the command in `argv` (a NULL-terminated array) as a new process.  In
 * the foreground, wait for it and return its exit status: 0 for success, 127
 * if it could not be run, 128 plus the signal number if a signal killed it.
 * In the background, return 0 at once; reap_background() collects it later.
 */
static int run_command(char *argv[], int background)
{
	pid_t pid;
	int status;

	pid = fork();
	if (pid < 0) {
		perror("fork");
		return 127;
	}

	if (pid == 0) {
		execvp(argv[0], argv);
		perror(argv[0]);
		exit(127);
	}

	if (background) {
		fprintf(stderr, "[started %d]\n", (int) pid);
		return 0;
	}

	if (waitpid(pid, &status, 0) < 0) {
		perror("waitpid");
		return 127;
	}

	/*
	 * TODO 1: take `status` apart and return it.  It is not the exit code;
	 * it packs several things together, and `man 2 waitpid` has the macros
	 * that unpack it.  If a signal killed the child (WIFSIGNALED), return
	 * 128 plus the signal number (WTERMSIG); otherwise return the exit code
	 * (WEXITSTATUS).  Print a line on stderr for anything other than a
	 * normal exit with 0, so you can see what the shell saw.
	 */

	return 0;
}

/*
 * Run a whole line, one command after another.  The operator in front of a
 * command decides whether it runs, from the status of the last command that
 * ran; the operator after it decides whether the shell waits for it.
 */
static void run_line(char *tokens[], int ntokens)
{
	const char *op = ";";	/* as if a `;` stood before the first command */
	int start = 0;
	int status = 0;

	while (start < ntokens) {
		const char *next_op = NULL;
		int end = start;
		int background;

		/* The command is tokens[start] .. tokens[end - 1]. */
		while (end < ntokens && !is_operator(tokens[end]))
			end++;
		if (end == start) {
			fprintf(stderr, "syntax error near '%s'\n", tokens[end]);
			return;
		}

		/* Remember the operator, then put the NULL that execvp() needs in its place. */
		if (end < ntokens)
			next_op = tokens[end];
		tokens[end] = NULL;

		/* A command is a background one when the operator after it is `&`. */
		background = next_op != NULL && strcmp(next_op, "&") == 0;

		/*
		 * TODO 2: run the command, or skip it.  `op` is the operator in
		 * front of it and `status` is what the last command that ran
		 * returned.  Run it after `;` or `&` always, after `&&` only if
		 * the previous command succeeded (status 0), after `||` only if
		 * it failed.  Try run_builtin() first (and set `status` to 0 for
		 * a builtin); otherwise call run_command() with `background`.  A
		 * command that is skipped leaves `status` alone.
		 */

		if (next_op == NULL)
			break;
		op = next_op;
		start = end + 1;
	}
}

int main(void)
{
	char line[LINE_LEN];
	char *tokens[MAX_TOKENS + 1];
	int ntokens;

	for (;;) {
		reap_background();
		if (read_line(line, sizeof(line)) < 0)
			break;

		ntokens = tokenize(line, tokens, MAX_TOKENS);
		if (ntokens == 0)
			continue;

		run_line(tokens, ntokens);
	}

	if (feof(stdin))
		printf("\n");

	return 0;
}
