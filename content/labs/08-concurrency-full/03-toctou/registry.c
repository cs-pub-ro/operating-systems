// SPDX-License-Identifier: BSD-3-Clause

/*
 * A registry of user names: a name can be registered once, by whoever asks
 * first, and several threads may ask at the same time.
 *
 * One mutex protects the array of names and the count.  Registering is one
 * critical section: the check that the name is free and the store that
 * takes it are done without releasing the lock in between.
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

/*
 * Is the name in the array?  Called with the lock held: this is the part of
 * the lookup that the functions below share.
 */
static int find_name(struct registry *reg, const char *name)
{
	size_t i;

	for (i = 0; i < reg->count; i++)
		if (strcmp(reg->names[i], name) == 0)
			return 1;

	return 0;
}

int registry_contains(struct registry *reg, const char *name)
{
	int found;

	pthread_mutex_lock(&reg->lock);
	found = find_name(reg, name);
	pthread_mutex_unlock(&reg->lock);

	return found;
}

/*
 * The check and the act, under one lock.  "The name is free" is true only
 * for as long as nobody else can register it, which is only for as long as
 * the lock is held.
 */
int registry_register(struct registry *reg, const char *name)
{
	int registered = 0;

	pthread_mutex_lock(&reg->lock);
	if (reg->count < MAX_NAMES && !find_name(reg, name)) {
		strncpy(reg->names[reg->count], name, NAME_LEN - 1);
		reg->names[reg->count][NAME_LEN - 1] = '\0';
		reg->count++;
		registered = 1;
	}
	pthread_mutex_unlock(&reg->lock);

	return registered;
}

size_t registry_count(struct registry *reg)
{
	size_t count;

	pthread_mutex_lock(&reg->lock);
	count = reg->count;
	pthread_mutex_unlock(&reg->lock);

	return count;
}
