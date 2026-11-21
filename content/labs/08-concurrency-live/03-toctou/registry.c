// SPDX-License-Identifier: BSD-3-Clause

/*
 * A registry of user names: a name can be registered once, by whoever asks
 * first, and several threads may ask at the same time.
 *
 * One mutex protects the array of names and the count, and every function
 * that touches them takes it.  Even so, a name can end up registered twice.
 */

#include <stdlib.h>
#include <string.h>
#include <pthread.h>

#include "registry.h"

struct registry {
	char names[MAX_NAMES][NAME_LEN];
	size_t count;		/* names in use                       */
	pthread_mutex_t lock;	/* protects the two fields above      */
};

struct registry *registry_create(void)
{
	struct registry *reg;

	reg = malloc(sizeof(*reg));
	if (reg == NULL)
		return NULL;

	reg->count = 0;
	pthread_mutex_init(&reg->lock, NULL);

	return reg;
}

void registry_destroy(struct registry *reg)
{
	pthread_mutex_destroy(&reg->lock);
	free(reg);
}

int registry_contains(struct registry *reg, const char *name)
{
	int found = 0;
	size_t i;

	pthread_mutex_lock(&reg->lock);
	for (i = 0; i < reg->count; i++) {
		if (strcmp(reg->names[i], name) == 0) {
			found = 1;
			break;
		}
	}
	pthread_mutex_unlock(&reg->lock);

	return found;
}

/* Store a name.  Returns 1 if it was stored, 0 if the registry is full. */
static int registry_add(struct registry *reg, const char *name)
{
	int added = 0;

	pthread_mutex_lock(&reg->lock);
	if (reg->count < MAX_NAMES) {
		strncpy(reg->names[reg->count], name, NAME_LEN - 1);
		reg->names[reg->count][NAME_LEN - 1] = '\0';
		reg->count++;
		added = 1;
	}
	pthread_mutex_unlock(&reg->lock);

	return added;
}

/*
 * TODO: every access to the array below is made with the lock held, and
 * the function is still wrong.  Find the moment at which what this thread
 * knows about the registry stops being true, and close it.
 *
 * Careful: this mutex cannot be locked twice by the same thread.
 */
int registry_register(struct registry *reg, const char *name)
{
	if (registry_contains(reg, name))
		return 0;

	return registry_add(reg, name);
}

size_t registry_count(struct registry *reg)
{
	size_t count;

	pthread_mutex_lock(&reg->lock);
	count = reg->count;
	pthread_mutex_unlock(&reg->lock);

	return count;
}
