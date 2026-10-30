// SPDX-License-Identifier: BSD-3-Clause

/*
 * A small shell: commands with arguments, chained with `;`, `&&` and `||`.
 *
 *     minish> ls -l /tmp
 *     minish> gcc -Wall main.c && ./a.out || echo "build failed"
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

/* Whether a word is one of the operators that separate two commands. */
static int is_operator(const char *word)
{
	return strcmp(word, ";") == 0 || strcmp(word, "&&") == 0 ||
	       strcmp(word, "||") == 0;
}

/*
 * Run the command in `argv` (terminated by a NULL pointer) as a new process
 * and wait for it.  Returns the command's exit status, 0 meaning success;
 * 127 if it could not be run at all; 128 plus the signal number if a signal
 * killed it, the way other shells report it.
 */
static int run_command(char *argv[])
{
	/*
	 * TODO 1: fork, exec, wait, as in the demo, with two changes.
	 *
	 * The command now has arguments, so the child uses execvp(), which
	 * takes the whole argv[] array: argv[0] is the program to look up
	 * in PATH, and the array is what the program receives as its own
	 * argv.  If exec returns, it failed: report it and leave the child
	 * with status 127.
	 *
	 * The parent needs to know how the child ended, so waitpid() gets a
	 * place to store the status.  The status is not the exit code; it
	 * packs several things together.  `man 2 waitpid` has the macros
	 * that take it apart: whether the child exited normally and with
	 * what code, or whether a signal killed it and which one.  Print a
	 * line on stderr for anything other than a normal exit with 0, and
	 * return the value the comment above describes. Use `WEXITSTATUS`
	 * to get the actual status of the child process.
	 */

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
		 * TODO 2: run the command, or skip it.  `op` is the operator in
		 * front of it and `status` is what the last command that ran
		 * returned.  After `;` a command always runs; after `&&` only
		 * if the previous one succeeded; after `||` only if it failed.
		 * A command that runs updates `status`; one that is skipped
		 * leaves it alone.
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

	while (read_line(line, sizeof(line)) == 0) {
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
