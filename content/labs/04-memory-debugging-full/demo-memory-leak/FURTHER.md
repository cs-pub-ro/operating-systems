# Going Further: Finding a Memory Leak With Valgrind

## Things to try

1. **Make the leak big.**
   Feed the buggy version ten thousand lines:

   ```console
   seq 1 10000 | valgrind --leak-check=full ./shout > /dev/null
   ```

   ```text
   definitely lost: 58,894 bytes in 10,000 blocks
   ```

   One block per line, forever, and longer lines leak more.
   A process that handles a thousand lines of text a second leaks a few megabytes a minute, and is restarted by someone on call a few days later.
1. **Watch it without Valgrind.**
   Run the buggy version on `yes | head -n 10000000` and look at its memory from another terminal with `ps -o rss= -p <pid>`, or in `top`.
   The resident size climbs for as long as the input lasts.
   This is what a leak looks like in production: nothing in the output, everything in the process size.
1. **Leave the block reachable instead.**
   Keep a global `char *last` pointing at the most recent copy and never free it.
   With `--show-leak-kinds=all` Valgrind reports it as `still reachable`: a pointer to the block exists at exit, so it *could* have been freed.
   It is sloppy rather than broken, and on a program that is about to exit it costs nothing; in a long-running loop it is the same bug with a nicer name.
1. **Move the `free()` to the wrong place.**
   Free the copy *before* printing it.
   `gcc` 14 warns at once, `pointer 'shout' used after 'free'`, which is worth noticing: this is one of the few memory bugs a compiler can see.
   Build it anyway and run Valgrind: the leak is gone, and in its place are hundreds of `Invalid read` errors inside `printf()`, each with `Address ... inside a block of size N free'd` and the line of the `free()`.
   You have traded a resource bug for a correctness bug, and in a bigger program a security hole.

## Questions to answer

* **Why does the report point at `upper_copy()` and not at the place where the leak happened?**
  Because there is no such place.
  A leak is a `free()` that never ran, and the only concrete fact Valgrind has is where the orphaned block was allocated.
* **How many blocks does the program allocate for `input.txt`, and how many are yours?**
  Eight in total.
  Six are the copies made by `upper_copy()`; the other two are the buffers stdio allocates behind `stdin` and `stdout` the first time they are used, and the C library frees those itself.
* **Who owns the copy, and where does it say so?**
  The caller, `main()`; the comment above `upper_copy()` says "whoever calls this function owns the copy".
  That sentence is the contract, and the fix is `main()` honouring it.

## Discussion points

* **A leak has no moment.**
  It is the absence of a `free()`, so no tool can point at the line where it "happened".
  Start from the allocation and follow the pointer to where it was last used; the `free()` goes right after.
* **Correct output proves nothing about memory.**
  This program passes every test that checks what it prints.
  Only a tool that watches every allocation can see what is wrong with it.
* **Ownership is the question to ask.**
  For every block: who frees it, and when?
  A function that returns heap memory has to say in its comment whether the caller becomes the owner, and a caller that reads the comment knows it has a `free()` to write.

## References

* `man 1 valgrind`, and the [Valgrind quick start guide](https://valgrind.org/docs/manual/quick-start.html)
* [The Memcheck manual on leak kinds](https://valgrind.org/docs/manual/mc-manual.html#mc-manual.leaks)
* `man 3 malloc`, `man 3 free`
