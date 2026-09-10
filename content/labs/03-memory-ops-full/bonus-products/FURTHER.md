# Going Further: Sort Products With a Linked List

## Things to try

1. **Prove the leak.**
   Comment out the final `list_free(head)`, rebuild, and run `valgrind --leak-check=full`.
   You will see both nodes and names reported lost. Note that the names come up as *indirectly* lost — they are only reachable through a node that is itself lost.
1. **Free in the wrong order.**
   Swap the two frees so it reads `free(head); free(head->name);`.
   Valgrind will report an invalid read: `head->name` was fetched out of a block that had already been freed. This is why `next` is saved first.
1. **Append instead of insert, then sort.**
   Build the list unsorted (always insert at the head), then sort it — either by collecting the node pointers into a temporary array and `qsort`-ing that, or with a list merge sort.
   Which is simpler to get right, and which touches less memory?
1. **Delete the most expensive product** before printing.
   Walk to the last node, free it, and fix the second-to-last node's `next`. This is the removal case the session-04 hash table also has to get right.
1. **Rewrite `list_insert` with a plain `prev` pointer** instead of `struct product **`.
   You will need a special case for inserting at the head. Compare the two versions — the pointer-to-pointer is fewer lines and has no special case.
1. **Add a tail pointer** so appending is O(1). What does it cost you to keep it correct on every insert and delete?

## Questions to answer

* Why is `list_insert` given `struct product **head` rather than `struct product *head`? What could it not do with just the node?
* In `list_free`, why must `next` be read before `free(head)`?
* How many `malloc` calls does the program make for a file of *N* products, and how many `free` calls balance them?
* The insertion walk stops while `(*link)->price <= price`. What ordering do equal-priced products end up in, and would `<` instead of `<=` change it?
* `02-products` capped the count at 32 and this one does not. What did that cap buy, and what did it cost?

## Discussion points

* **Nothing here is bounded.**
  The array cap is gone, so the count is dynamic too — this is the first exercise where *every* size is decided at run time, which is what a linked list (or a growable array) is for.
* **A pointer to a pointer erases the head special case.**
  Walking the *pointers* rather than the *nodes* means the head is just another pointer to update. It is the same trick `03-in-memory-db`'s successor and the session-04 list removal both reward.
* **Two allocations per node means two frees per node**, in the order that does not read freed memory.
* **Sorted-on-insert versus sort-afterwards** is a real design choice: O(n) per insert here, versus one O(n log n) pass at the end. For a lab-sized file it does not matter; the point is to see that it is a choice.
* **A linked list is not free.**
  Compared with `02-products`' array it trades random access and cache locality for unbounded, allocation-free-of-a-cap growth. Which one to reach for depends on what the program needs to do with the data.

## References

* `man 3 malloc`, `man 3 free`
* [Linus Torvalds' "good taste" linked-list deletion](https://github.com/mkirchner/linked-list-good-taste) — the pointer-to-pointer technique in full
* `man 3 qsort` — for the append-then-sort variant
