# Going Further: Finding a Memory Leak With Valgrind

Optional.

## Things to try

1. **Make the leak big.**
   Feed the buggy version ten thousand lines and read the `definitely lost` line again:

   ```console
   seq 1 10000 | valgrind --leak-check=full ./shout > /dev/null
   ```

   The leak grows with the input.
   What does that do to a program that runs for a month?
1. **Watch it without Valgrind.**
   Run the buggy version on a very long input and look at its memory in another terminal, with `ps -o rss= -p <pid>` or `top`.
   A leak is invisible in the output and visible in the process size.
1. **Leave the block reachable instead.**
   Keep a global pointer to the last copy and do not free it.
   Valgrind now reports it as `still reachable` rather than `definitely lost`.
   What is the difference, and which one is a bug?
1. **Move the `free()` to the wrong place.**
   Free the copy *before* printing it, and run Valgrind.
   The leak is gone and something worse has taken its place; read what the report says about it.

## Questions to answer

* The report says the lost blocks were allocated in `upper_copy()`.
  Why does it not point at the place where the leak happened?
* How many blocks does the program allocate for `input.txt`, and how many of them are yours?
  Valgrind prints the total; predict it before you look.
* Who owns the copy that `upper_copy()` returns, and where does the comment above the function say so?

## Discussion points

* **A leak has no moment.**
  It is the absence of a `free()`, so no tool can point at the line where it "happened".
  The best Valgrind can do is say where the lost block came from, and leave the rest to you.
* **Correct output proves nothing about memory.**
  This program passes every test that checks what it prints.
* **Ownership is the question to ask.**
  For every block: who frees it, and when?
  A function that returns heap memory has to say in its comment who owns the result.

## References

* `man 1 valgrind`, and the [Valgrind quick start guide](https://valgrind.org/docs/manual/quick-start.html)
* [The Memcheck manual on leak kinds](https://valgrind.org/docs/manual/mc-manual.html#mc-manual.leaks)
* `man 3 malloc`, `man 3 free`
