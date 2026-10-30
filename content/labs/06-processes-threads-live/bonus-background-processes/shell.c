// SPDX-License-Identifier: BSD-3-Clause

/*
 * A small shell: commands with arguments, chained with `;`, `&&` and `||`,
 * and run in the background with `&`.
 *
 *     minish> sleep 5 &
 *     [started 12345]
 *     minish> echo meanwhile
 *     meanwhile
 *     minish>
 *     [12345 finished]
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
 * Split `line` into words separated by spaces or tabs, in place: each word
 * gets a terminating '\0' and a pointer to it is stored in `tokens`.
 * Returns the number of words, at most `max`.  Already written.
 *
 *     "ls -l /tmp && echo done"  ->  "ls", "-l", "/tmp", "&&", "echo", "done"
 */
static int tokenize(char *line, char *tokens[], int max)
{
	int count = 0;
	char *word;

	word = strtok(line, " \t");
	while (word != NULL && count < max) {
		tokens[count++] = word;
		word = strtok(NULL, " \t");
	}

	return count;
}

/*
 * Whether a word is one of the operators that end a command.
 *
 * TODO 2: `&` is one too.  Like `;`, it ends the command before it, and
 * the next command runs whatever the status; unlike `;`, the shell does
 * not wait for the command before it.
 */
static int is_operator(const char *word)
{
	return strcmp(word, ";") == 0 || strcmp(word, "&&") == 0 ||
	       strcmp(word, "||") == 0;
}

/*
 * Collect the background children that have finished since the last
 * time we looked, without waiting for the ones still running.  Called
 * before every prompt.
 *
 * TODO 4: a child that has finished stays around, as a zombie, until
 * its parent waits for it, so waiting is not optional; it is only the
 * blocking that is.  waitpid() has a flag for that, WNOHANG, and a
 * first argument that means "any child"; call it in a loop until it
 * says there is nobody left to collect, and print a line for each
 * child it returns.  (The other way to do this is to have the kernel
 * tell the shell when a child ends, with the SIGCHLD signal; see
 * `man 7 signal`.  It is harder to get right, and not needed here.)
 */
static void reap_background(void)
{
}

/*
 * Run the command in `argv` (terminated by a NULL pointer) as a new process.
 * In the foreground, wait for it and return its exit status: 0 for success,
 * 127 if it could not be run, 128 plus the signal number if a signal killed
 * it.  In the background, return 0 at once.
 *
 * TODO 3: with `background` set, print the child's pid on stderr and
 * return without waiting; reap_background() collects the child later.
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

	if (WIFSIGNALED(status)) {
		fprintf(stderr, "[killed by signal %d]\n", WTERMSIG(status));
		return 128 + WTERMSIG(status);
	}

	if (WEXITSTATUS(status) != 0)
		fprintf(stderr, "[exit status %d]\n", WEXITSTATUS(status));

	return WEXITSTATUS(status);

	return 0;
}

/*
 * Run a whole line: one command after another, each one from the word after
 * the previous operator up to the next operator.  The operator in front of
 * a command decides whether it runs at all, given the status of the last
 * command that ran.
 */
static void run_line(char *tokens[], int ntokens)
{
	const char *op = ";";	/* as if a `;` stood before the first command */
	int start = 0;
	int status = 0;

	while (start < ntokens) {
		const char *next_op = NULL;
		int end = start;

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

		/*
		 * TODO 1: run the command, or skip it.  `op` is the operator in
		 * front of it and `status` is what the last command that ran
		 * returned.  After `;` a command always runs; after `&&` only
		 * if the previous one succeeded; after `||` only if it failed.
		 * A command that runs updates `status`; one that is skipped
		 * leaves it alone.  After `&` the next command always runs.
		 * The command runs in the background when the operator after
		 * it, `next_op` is `&`.
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
		if (strcmp(tokens[0], "exit") == 0)
			break;

		run_line(tokens, ntokens);
	}

	if (feof(stdin))
		printf("\n");

	return 0;
}
