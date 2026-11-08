#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <unistd.h>
#include <spawn.h>
#include <sys/wait.h>

#include "utils.h"

int main(void)
{
	pid_t pid;
	int rc;
	int status;
	char *const args[] = {"/usr/bin/sleep", "100", NULL};

	pid = fork();
	switch (pid) {
	case -1: /* error */
		perror("fork");
		exit(EXIT_FAILURE);
	case 0: /* child process */
		rc = execve("/usr/bin/sleep", args, NULL);
		DIE(rc != 0, "execve");
	default: /* parent process */
		/* continue execution */
		break;
	}

	printf("PID: %d, parent PID: %d, child PID: %d\n", getpid(), getppid(), pid);

	rc = waitpid(pid, &status, 0);
	DIE(rc < 0, "waitpid");

	printf("Process exited with status %d\n", WEXITSTATUS(status));
	if (WIFEXITED(status))
		printf("Process exited successfully.\n");

	return 0;
}
