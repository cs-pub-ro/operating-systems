// SPDX-License-Identifier: BSD-3-Clause

/*
 * A binary search tree of integer keys, with no duplicates, that several
 * threads may use at the same time.
 *
 * One mutex, a field of the tree, protects the root, every node and the
 * size.  It is taken in the functions of the interface and nowhere else:
 * the recursive helpers below them run with the lock already held.
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
	pthread_mutex_t lock;	/* protects the two fields above, and the nodes */
};

struct tree *tree_create(void)
{
	struct tree *tree;

	tree = malloc(sizeof(*tree));
	if (tree == NULL)
		return NULL;

	tree->root = NULL;
	tree->size = 0;
	pthread_mutex_init(&tree->lock, NULL);

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
	pthread_mutex_destroy(&tree->lock);
	free(tree);
}

/*
 * Insert `key` in the subtree that starts at `node`, and return the root of
 * the subtree, which is new if the subtree was empty.  `*inserted` is set to
 * 1 if a node was added.  Called with the lock held.
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

int tree_insert(struct tree *tree, int key)
{
	int inserted = 0;

	pthread_mutex_lock(&tree->lock);
	tree->root = insert_node(tree->root, key, &inserted);
	if (inserted)
		tree->size++;
	pthread_mutex_unlock(&tree->lock);

	return inserted;
}

/*
 * Remove `key` from the subtree that starts at `node`, and return the root
 * of what is left.  `*removed` is set to 1 if a key was removed.  Called
 * with the lock held.
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

	pthread_mutex_lock(&tree->lock);
	tree->root = remove_node(tree->root, key, &removed);
	if (removed)
		tree->size--;
	pthread_mutex_unlock(&tree->lock);

	return removed;
}

/*
 * A function that only reads still takes the lock: a thread that removes
 * can free the node this one is looking at.  There is one way out of the
 * critical section, after the loop, so the lock is released whatever the
 * search found.
 */
int tree_contains(struct tree *tree, int key)
{
	struct node *node;
	int found = 0;

	pthread_mutex_lock(&tree->lock);
	node = tree->root;
	while (node != NULL) {
		if (key == node->key) {
			found = 1;
			break;
		}
		node = key < node->key ? node->left : node->right;
	}
	pthread_mutex_unlock(&tree->lock);

	return found;
}

size_t tree_size(struct tree *tree)
{
	size_t size;

	pthread_mutex_lock(&tree->lock);
	size = tree->size;
	pthread_mutex_unlock(&tree->lock);

	return size;
}

/* Called with the lock held. */
static void walk_nodes(struct node *node, void (*visit)(int key, void *arg),
		       void *arg)
{
	if (node == NULL)
		return;

	walk_nodes(node->left, visit, arg);
	visit(node->key, arg);
	walk_nodes(node->right, visit, arg);
}

/*
 * The lock is held for the whole walk, so the tree the caller sees is the
 * tree at one moment.  The price is that `visit` must not call back into
 * the tree: it would wait for a lock its own thread holds.
 */
void tree_walk(struct tree *tree, void (*visit)(int key, void *arg), void *arg)
{
	pthread_mutex_lock(&tree->lock);
	walk_nodes(tree->root, visit, arg);
	pthread_mutex_unlock(&tree->lock);
}
