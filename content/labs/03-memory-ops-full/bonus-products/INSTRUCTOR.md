# Instructor Notes: Sort Products With a Linked List

## Purpose

The bonus for the `02-products` line, and the exercise that removes the last fixed quantity.
`01-xor-encrypt` had every size known; `02-products` had a fixed count but unknown name lengths; this one has an unknown count too, so the static array becomes a linked list that grows without a cap.
That completes the session's ramp, and it is worth naming when a student reaches it.

It is a genuine bonus — pointer-to-pointer insertion and correct list teardown are not trivial — so expect most of the room to take it home.

## Expected solution

Three TODOs in the two list helpers:

* **TODO 1** — in `list_insert`: `malloc` the node, `malloc` and copy the name (`strlen + 1`), set the price; free-and-return-`-1` on either allocation failing.
* **TODO 2** — in `list_insert`: walk to the sorted position and splice the node in.
* **TODO 3** — in `list_free`: walk the list, freeing name then node, saving `next` first.

`main`, the read loop, and the printing are all given.

## Two things worth drawing on the board

* **The pointer to a pointer.**
  `struct product **head` walks the *pointers between* nodes, not the nodes.
  Draw the list and the `link` variable pointing at a `next` field; show that when the new node goes at the front, `link` points at the caller's `head`, and the *same* two assignments work.
  Students who have only seen `prev`-pointer insertion find this genuinely illuminating, and it is the same idea that makes the session-04 list removal clean.
  A correct `prev`-pointer version with a head special case is fully acceptable — do not mark it down, but show them the other one.
* **Save `next` before you free.**
  `free(head); ... head->next` is a use-after-free. This is the session's recurring bug in miniature, and Valgrind names it precisely if they get it wrong.

## Common mistakes

* **Reading `head->next` after `free(head)`** in `list_free` — the classic teardown use-after-free.
* **Freeing only the nodes, not the names** (or vice versa) — half the blocks leak. Valgrind's "indirectly lost" line is the tell for leaked names.
* **A head special case done wrong** — inserting the cheapest product but never updating `head`, so it silently vanishes from the list.
* **`malloc(strlen(name))`** without the `+ 1` — carried over from `02-products`, still a one-byte overflow.
* **Leaking on the allocation-failure path** — forgetting that a failed name `malloc` has to `free(node)` before returning.

## Verified reference values

Measured on Ubuntu 24.04 / gcc 14.2 / x86-64.

| Fact | Value |
| --- | --- |
| Products in the shipped `products.txt` | 40 (more than `02-products`' cap of 32) |
| `make test` | prices come out in ascending order |
| Cheapest / dearest | `Cable organizer` at 7, `Standing desk` at 699 |
| Under Valgrind | 83 allocs, 83 frees (40 nodes + 40 names + stdio), 0 in use at exit, 0 errors |
| Empty / odd-length file | 0 (or the whole pairs only) products, no crash, no leak |

## Practical notes

* `make clean` removes the `products` binary, the only artefact; it is in `.gitignore`.
* The file argument defaults to `products.txt`, so `./products` works from the task directory.
* Nothing here is timing-sensitive.
