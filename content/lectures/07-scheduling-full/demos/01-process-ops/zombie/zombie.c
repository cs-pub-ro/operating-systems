#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <unistd.h>
#include <spawn.h>
#include <sys/wait.h>

#include "utils.h"

static void wait_for_input(const char *msg)
{
	char buf[32];

	printf(" * %s\n", msg);
	printf(" -- Press ENTER to continue ...\n"); fflush(stdout);
	fgets(buf, 32, stdin);
}

int main(void)
{
	pid_t pid;
	int rc;
	int status;
	char *args[] = {"/usr/bin/sleep", "1"};

	rc = posix_spawn(&pid, "/usr/bin/sleep", NULL, NULL, args, NULL);
	DIE(rc != 0, "posix_spawn");

	printf("PID: %d, parent PID: %d, child PID: %d\n", getpid(), getppid(), pid);

	/* Have the child process become a zombie. */
	wait_for_input("See child process become a zombie");

	rc = waitpid(pid, &status, 0);
	DIE(rc < 0, "waitpid");

	printf("Process exited with status %d\n", WEXITSTATUS(status));
	if (WIFEXITED(status))
		printf("Process exited successfully.\n");

	return 0;
}
