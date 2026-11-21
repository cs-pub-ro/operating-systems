/* SPDX-License-Identifier: BSD-3-Clause */

/*
 * A binary search tree of integer keys, with no duplicates, that several
 * threads may use at the same time.
 *
 * The library is libtree.so, built from tree.c.  `struct tree` is defined
 * there: the executable only ever holds a pointer to one.
 */

#ifndef TREE_H_
#define TREE_H_		1

#include <stddef.h>

struct tree;

/* A new, empty tree; NULL if there is no memory for it. */
struct tree *tree_create(void);

/* Free every node, and the tree. */
void tree_destroy(struct tree *tree);

/* Add a key.  Returns 1 if it was added, 0 if it was already there. */
int tree_insert(struct tree *tree, int key);

/* Remove a key.  Returns 1 if it was removed, 0 if it was not there. */
int tree_remove(struct tree *tree, int key);

/* Returns 1 if the key is in the tree, 0 if not. */
int tree_contains(struct tree *tree, int key);

/* The number of keys in the tree. */
size_t tree_size(struct tree *tree);

/* Call visit(key, arg) for every key, in increasing order. */
void tree_walk(struct tree *tree, void (*visit)(int key, void *arg), void *arg);

#endif
