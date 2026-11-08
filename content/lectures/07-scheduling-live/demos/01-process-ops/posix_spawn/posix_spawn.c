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
	char *args[] = {"/usr/bin/sleep", "100"};

	rc = posix_spawn(&pid, "/usr/bin/sleep", NULL, NULL, args, NULL);
	DIE(rc != 0, "posix_spawn");

	printf("PID: %d, parent PID: %d, child PID: %d\n", getpid(), getppid(), pid);

	rc = waitpid(pid, &status, 0);
	DIE(rc < 0, "waitpid");

	printf("Process exited with status %d\n", WEXITSTATUS(status));
	if (WIFEXITED(status))
		printf("Process exited successfully.\n");

	return 0;
}
