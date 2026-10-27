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

/* Whether a word is one of the operators that end a command. */
static int is_operator(const char *word)
{
	return strcmp(word, ";") == 0 || strcmp(word, "&&") == 0 ||
	       strcmp(word, "||") == 0 || strcmp(word, "&") == 0;
}

/*
 * Collect the background children that have finished since the last
 * time we looked, without waiting for the ones still running.  Called
 * before every prompt, so a finished child is a zombie for one prompt
 * at most.
 */
static void reap_background(void)
{
	pid_t pid;

	while ((pid = waitpid(-1, NULL, WNOHANG)) > 0)
		fprintf(stderr, "[%d finished]\n", (int) pid);
}

/*
 * Run the command in `argv` as a new process.  In the foreground, wait for
 * it and return its exit status: 0 for success, 127 if it could not be run,
 * 128 plus the signal number if a signal killed it.  In the background,
 * return 0 at once; reap_background() collects the child later.
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
}

/*
 * Run a whole line, one command after another.  The operator in front of a
 * command decides whether it runs; the operator after it decides whether
 * the shell waits for it.
 */
static void run_line(char *tokens[], int ntokens)
{
	const char *op = ";";
	int start = 0;
	int status = 0;

	while (start < ntokens) {
		const char *next_op = NULL;
		int end = start;

		while (end < ntokens && !is_operator(tokens[end]))
			end++;
		if (end == start) {
			fprintf(stderr, "syntax error near '%s'\n", tokens[end]);
			return;
		}

		if (end < ntokens)
			next_op = tokens[end];
		tokens[end] = NULL;

		if (strcmp(op, ";") == 0 || strcmp(op, "&") == 0 ||
		    (strcmp(op, "&&") == 0 && status == 0) ||
		    (strcmp(op, "||") == 0 && status != 0))
			status = run_command(&tokens[start],
					     next_op != NULL && strcmp(next_op, "&") == 0);

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
