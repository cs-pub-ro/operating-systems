#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define MAX_TASKS 10000

typedef struct {
	char *name;
	int priority;
	// Other task data...
} Task;

Task *tasks[MAX_TASKS];
int taskCount;

void createTask(const char *name, int priority)
{
	if (taskCount >= MAX_TASKS) {
		printf("Cannot create more tasks.\n");
		return;
	}

	Task *newTask = (Task *) malloc(sizeof(Task));

	newTask->name = strdup(name);
	newTask->priority = priority;

	tasks[taskCount++] = newTask;
}

void processHighPriorityTasks(void)
{
	for (int i = 0; i < taskCount; i++) {
		if (tasks[i] != NULL) {
			if (tasks[i]->priority > 5) {
				printf("Processing high priority task: %s\n", tasks[i]->name);
				// Process the task...

				free(tasks[i]);
				tasks[i] = NULL;
			}
		}
	}
}

int main(void)
{
	for (int i = 0; i < 1000000; i++) {
		char taskName[20];

		snprintf(taskName, sizeof(taskName), "Task_%d", i);
		createTask(taskName, i % 10);

		if (i % 20 == 0)
			processHighPriorityTasks();
	}

	// Cleanup (in a real system, this might never be reached)
	for (int i = 0; i < taskCount; i++) {
		if (tasks[i] != NULL) {
			free(tasks[i]->name);
			free(tasks[i]);
		}
	}

	return 0;
}
