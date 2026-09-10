# Going Further: Sort Products With a Linked List

Optional.

## Things to try

1. **Prove the leak.**
   Remove `list_free(head)`, rebuild, run `valgrind --leak-check=full`, and read "definitely lost" versus "indirectly lost" — why are the names *indirectly* lost?
1. **Free in the wrong order** (`free(head); free(head->name);`) and read the invalid-read report.
1. **Append then sort** instead of inserting in order: build the list at the head, then sort by moving node pointers into an array and `qsort`-ing, or with a list merge sort.
1. **Delete the most expensive product** before printing — walk to the last node, free it, and fix the previous node's `next`.
1. **Rewrite `list_insert` with a `prev` pointer** instead of `struct product **`, and count how many extra lines the head special case costs.

## Questions to answer

* Why is `list_insert` passed `struct product **head` rather than the head node?
* In `list_free`, why must `next` be saved before `free(head)`?
* For *N* products, how many `malloc`s does the program make, and how many `free`s balance them?
* What order do equal-priced products end up in, and would `<` instead of `<=` in the walk change it?
* What did the 32-product cap in `02-products` buy, and what did it cost?

## Discussion points

* **Nothing here is bounded** — the count is dynamic too, which is what a linked list is for.
* **A pointer to a pointer removes the head special case**: you walk the pointers between nodes, so the head is just another one to update.
* **Two allocations per node means two frees per node**, in the order that never reads freed memory.
* **Sorted-on-insert vs sort-at-the-end** is a real design choice; for a lab-sized file either is fine.
* **A linked list is not free** — it trades away random access and cache locality for growth without a cap.
