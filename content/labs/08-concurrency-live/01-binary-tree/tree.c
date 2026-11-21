// SPDX-License-Identifier: BSD-3-Clause

/*
 * A binary search tree of integer keys, with no duplicates, that several
 * threads may use at the same time.
 *
 * For now it is safe with one thread only: nothing here is synchronized.
 */

#include <stdlib.h>
#include <pthread.h>

#include "tree.h"

struct node {
	int key;
	struct node *left;
	struct node *right;
};

struct tree {
	struct node *root;	/* NULL when the tree is empty            */
	size_t size;		/* number of nodes                        */
	/* TODO 1: a mutex that protects the two fields above, and the nodes. */
};

struct tree *tree_create(void)
{
	struct tree *tree;

	tree = malloc(sizeof(*tree));
	if (tree == NULL)
		return NULL;

	tree->root = NULL;
	tree->size = 0;
	/* TODO 1: initialize the mutex. */

	return tree;
}

static void destroy_nodes(struct node *node)
{
	if (node == NULL)
		return;

	destroy_nodes(node->left);
	destroy_nodes(node->right);
	free(node);
}

void tree_destroy(struct tree *tree)
{
	destroy_nodes(tree->root);
	/* TODO 1: destroy the mutex. */
	free(tree);
}

/*
 * Insert `key` in the subtree that starts at `node`, and return the root of
 * the subtree, which is new if the subtree was empty.  `*inserted` is set to
 * 1 if a node was added.
 */
static struct node *insert_node(struct node *node, int key, int *inserted)
{
	if (node == NULL) {
		node = malloc(sizeof(*node));
		if (node == NULL)
			return NULL;
		node->key = key;
		node->left = NULL;
		node->right = NULL;
		*inserted = 1;
		return node;
	}

	if (key < node->key)
		node->left = insert_node(node->left, key, inserted);
	else if (key > node->key)
		node->right = insert_node(node->right, key, inserted);

	return node;
}

/*
 * TODO 2: the tree and its size change here.  Lock around what must not be
 * interleaved with another thread, in this function and in tree_remove().
 * Think about where the lock goes: here, or in the recursive function?
 */
int tree_insert(struct tree *tree, int key)
{
	int inserted = 0;

	tree->root = insert_node(tree->root, key, &inserted);
	if (inserted)
		tree->size++;

	return inserted;
}

/*
 * Remove `key` from the subtree that starts at `node`, and return the root
 * of what is left.  `*removed` is set to 1 if a key was removed.
 */
static struct node *remove_node(struct node *node, int key, int *removed)
{
	struct node *next;

	if (node == NULL)
		return NULL;

	if (key < node->key) {
		node->left = remove_node(node->left, key, removed);
		return node;
	}
	if (key > node->key) {
		node->right = remove_node(node->right, key, removed);
		return node;
	}

	/* This is the node.  With at most one child, the child replaces it. */
	if (node->left == NULL || node->right == NULL) {
		next = node->left != NULL ? node->left : node->right;
		free(node);
		*removed = 1;
		return next;
	}

	/*
	 * Two children: the node takes the smallest key of its right
	 * subtree, and that key is removed from there instead.
	 */
	next = node->right;
	while (next->left != NULL)
		next = next->left;
	node->key = next->key;
	node->right = remove_node(node->right, next->key, removed);

	return node;
}

int tree_remove(struct tree *tree, int key)
{
	int removed = 0;

	tree->root = remove_node(tree->root, key, &removed);
	if (removed)
		tree->size--;

	return removed;
}

/*
 * TODO 3: this function changes nothing.  Does it need the lock?  If you
 * lock here, check every way out of the function.
 */
int tree_contains(struct tree *tree, int key)
{
	struct node *node;

	node = tree->root;
	while (node != NULL) {
		if (key == node->key)
			return 1;
		node = key < node->key ? node->left : node->right;
	}

	return 0;
}

/* TODO 4: the size and the walk are read by one thread while others write. */
size_t tree_size(struct tree *tree)
{
	return tree->size;
}

static void walk_nodes(struct node *node, void (*visit)(int key, void *arg),
		       void *arg)
{
	if (node == NULL)
		return;

	walk_nodes(node->left, visit, arg);
	visit(node->key, arg);
	walk_nodes(node->right, visit, arg);
}

void tree_walk(struct tree *tree, void (*visit)(int key, void *arg), void *arg)
{
	walk_nodes(tree->root, visit, arg);
}
