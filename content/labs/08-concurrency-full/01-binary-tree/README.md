# Exercise: A Binary Search Tree for Eight Threads

**Tools:** GCC, Make, Valgrind (Helgrind)

## Goal

Reference solution of the tree challenge: one mutex, a field of the tree, taken in the five functions of the interface and in none of the recursive helpers.

## Background

```C
struct tree {
	struct node *root;	/* NULL when the tree is empty            */
	size_t size;		/* number of nodes                        */
	pthread_mutex_t lock;	/* protects the two fields above, and the nodes */
};
```

The executable holds a `struct tree *` and nothing else: the structure is defined in `tree.c`, so adding a field to it changes nothing for the executable, which was built before the field existed.
That is what an opaque type buys, and it is why the mutex can go inside.

Eight threads insert 4,000 keys each, look up every fourth one right after inserting it, then remove every second key, checking after each removal that the key is gone and that its neighbour, which stays, is still there.
Thread `t` uses the keys that leave the remainder `t` when divided by eight, in a shuffled order that is the same on every run.
At the end the tree must hold 16,000 keys with a known sum, in increasing order when walked, and `tree_size()` must agree.

Files:

* `tree.c`, `tree.h` — the library, and its interface.
* `chall.c`, `flag.h`, `flag` — the executable, the encrypted flag with its key, and the flag in clear.
* `test.sh` — twenty runs, each of which has to print the flag.

## Build & Run

```console
make
./chall
```

```text
keys found by walking the tree: 16000 (expected 16000)
size kept by the tree:          16000 (expected 16000)
sum of the keys:                256193168 (expected 256193168)
keys out of order:              0
calls with a wrong result:      0
flag: SO{...}
```

## Results and Explanations

### What goes wrong without the mutex

```text
thread 3: key 18099 was inserted, and is not found
thread 0: key 10288 was inserted, and is not found
thread 6: key 31734 was inserted, and is not found
thread 3: key 22739 could not be removed
thread 3: key 267 was not removed, and is not found
keys found by walking the tree: 15871 (expected 16000)
size kept by the tree:          3578 (expected 16000)
sum of the keys:                254111343 (expected 256193168)
keys out of order:              0
calls with a wrong result:      260
No flag: the tree did not behave like a tree.
```

Thirty runs of the library as given ended like this:

| Outcome | Runs |
| --- | --- |
| Wrong numbers, no flag | 24 |
| Abort, with a message from the allocator | 5 |
| Segmentation fault | 1 |

Each line of the output is an interleaving.

* **A key that was inserted and is not found.**
  Two threads walk down to the same empty place, a `left` or a `right` that is `NULL`, and each hangs its new node there.
  The second assignment overwrites the first, and the first thread's node is no longer part of the tree.
* **A size that is a quarter of what it should be.**
  `tree->size++` and `tree->size--` are read, change, write, done by eight threads with no lock: the lost update of lecture 08, tens of thousands of times.
* **Keys out of order, or more keys than were left in.**
  A removal replaces a node's key with its successor's and then removes the successor; an insertion that passes through between the two steps is placed by the old key.
* **The abort and the crash.**
  A node freed by one thread while another is standing on it, or freed twice by two removals that found it together.

### TODO 1 — the mutex belongs to the tree

```C
pthread_mutex_init(&tree->lock, NULL);       /* in tree_create() */
pthread_mutex_destroy(&tree->lock);          /* in tree_destroy() */
```

A global mutex would work for this executable, which has one tree, and would make two unrelated trees wait for each other.

### TODO 2 — lock at the interface, not in the recursion

```C
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
```

The critical section is the whole operation: the walk down, the new node, the assignment to `tree->root` and the change of the size.
The size is inside because it is part of the same invariant, "`size` is the number of nodes"; a thread that reads the size between the insertion and the increment sees a tree that disagrees with itself.

The lock is not taken in `insert_node()`, for two reasons.

* `insert_node()` calls itself.
  A mutex of the default kind cannot be locked twice by one thread: the second `pthread_mutex_lock()`, one level down, waits for the lock that the same thread took one level up, for ever.
  The executable reports this as a time-out.
* Even with a lock that could be taken again, locking per node and releasing between levels would protect each step and not the operation.
  Another thread could change the tree between two steps of this one's descent.

So the rule is the one written in the comments of the file: the functions of the interface take the lock, and the helpers are "called with the lock held".

### TODO 3 — a reader needs the lock, and one way out

```C
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
```

The skeleton had `return 1` in the loop.
With a lock taken above it, that `return` leaves the function with the mutex held, and the next thread to touch the tree waits for ever: a time-out, again.
The loop was rewritten to leave through one door.

Why lock at all, in a function that changes nothing?
Because of what the writers do while it runs: `remove_node()` frees nodes and rewrites keys, and a lookup that is standing on a node at that moment reads freed memory, or follows a path chosen by a key that has just changed.

### The test that passes

With locks in `tree_insert()` and `tree_remove()` and none in `tree_contains()`, `tree_size()` and `tree_walk()`, the executable printed the flag in 47 runs out of 50.

That library is wrong.
The lookup is a dozen pointer dereferences, a few tens of nanoseconds, and for it to fail another thread has to free or rewrite one of those dozen nodes inside that window.
It happens, three times in fifty here, and the other forty-seven runs say nothing.

Helgrind does not wait for it to happen.
It watches every memory access and every lock, and reports memory touched by two threads with no lock in common, whether or not anything went wrong on this run:

```console
valgrind --tool=helgrind ./chall 0
```

```text
Possible data race during write of size 8 at 0x4AAD7B8 by thread #3
   at 0x486E64D: tree_contains (tree.c:172)
```

On the reference solution it ends with `ERROR SUMMARY: 0 errors from 0 contexts`, and the flag.
(`./chall 0` turns the time-out off, because the program runs many times slower under Valgrind.)

A test of the result finds the bugs that showed.
A flag means that this run found nothing, and the argument that the library is right is made by reading it.

### TODO 4 — the size and the walk

`tree_size()` takes the lock to read one variable, and `tree_walk()` holds it for the whole traversal.
At the point where the executable calls them the threads are gone, so no run would fail without these locks.
They are there because the library cannot know that: a function that touches the shared fields takes the lock, always, and nobody has to remember which callers are safe.

Holding the lock across `visit()` has a price, stated in the comment: `visit()` must not call back into the tree.

### What it costs

```console
time ./chall
```

```text
real	0m0.054s
user	0m0.049s
sys	0m0.057s
```

`user` is no larger than `real`: eight threads, one of them in the tree at a time.
The tree is safe, and no faster than it would be with one thread.

## References

* `man 3 pthread_mutex_init`, `man 3 pthread_mutex_lock`
* Valgrind manual, *Helgrind: a thread error detector* — <https://valgrind.org/docs/manual/hg-manual.html>
* Session 07, `bonus-synchronized-db` — the same reasoning on an array
