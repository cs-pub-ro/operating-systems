/* SPDX-License-Identifier: BSD-3-Clause */

/*
 * A registry of user names: a name can be registered once, by whoever asks
 * first, and several threads may ask at the same time.
 *
 * The library is libregistry.so, built from registry.c.  `struct registry`
 * is defined there: the executable only ever holds a pointer to one.
 */

#ifndef REGISTRY_H_
#define REGISTRY_H_	1

#include <stddef.h>

#define NAME_LEN	32	/* a name, with its terminator   */
#define MAX_NAMES	4096	/* names a registry can hold     */

struct registry;

/* A new, empty registry; NULL if there is no memory for it. */
struct registry *registry_create(void);

void registry_destroy(struct registry *reg);

/* Returns 1 if the name is registered, 0 if not. */
int registry_contains(struct registry *reg, const char *name);

/*
 * Register a name.  Returns 1 if the name is now the caller's, 0 if it was
 * already taken or the registry is full.  Of all the threads that ask for
 * the same name, exactly one gets 1.
 */
int registry_register(struct registry *reg, const char *name);

/* The number of names registered. */
size_t registry_count(struct registry *reg);

#endif
