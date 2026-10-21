# Going Further: The Config Parser That Forgets

## Things to try

1. **Make duplicate keys update the old value.**
   Change `config_add()` so that `a = 1` followed by `a = 2` keeps one setting with the value `2`.
   The obvious version, `s->value = strdup(value);` on the existing setting, leaks the old value: it is the bug of `02-longest-word`, and Valgrind finds it as one lost block per duplicate.
   The fix is the same three-statement order as there: copy, free the old, assign.
1. **Return a pointer instead of a copy.**
   Change `config_get()` to `return cfg->settings[i].value;`, and update its comment to say that the pointer belongs to the configuration.
   The `free(value)` in `main()` has to go, or it becomes a double free that `config_free()` completes later.
   What the caller loses is the right to keep the value after `config_free()`; what it gains is one allocation less per lookup.
   Both designs are used in real libraries, and the only wrong choice is not writing down which one it is.
1. **Make the leak visible without Valgrind.**
   Call `config_get()` a million times in a loop in the buggy version, and watch the process in `top`.
   About twenty bytes per call, plus the allocator's bookkeeping, is some thirty megabytes of resident memory, visible to the eye.
1. **Exit without cleaning up.**
   Remove the call to `config_free()` from the fixed version and run with `--show-leak-kinds=all`.
   The twelve blocks are reported as `definitely lost`, which surprises people: `cfg` pointed at all of them.
   But `cfg` lives in `main()`'s stack frame, and by the time Valgrind runs its leak check `main()` has returned and the frame is gone, so nothing points at them any more.
   Make `cfg` a `static` variable and run again: the same twelve blocks are now `still reachable`, because a global survives until the process exits.
   Neither version frees anything; the kind only says whether a pointer still existed at the end.
   On a program that is about to exit it is harmless either way; in a function that loads a configuration and returns, the same omission is a leak on every call.

## Questions to answer

* **Why does Valgrind point at `strdup()` for both leaks?**
  Because a leak has no moment.
  The only concrete fact is where the orphaned block was allocated; the missing `free()` is a line that does not exist, and no tool can point at a line that does not exist.
* **Where do the three and the six come from?**
  Six settings in `config.txt`, one value each, lost by `config_free()`; four lookups in `main()`, three of which find a key and get a copy, lost by `main()`.
  `timeout` is not in the file, so its lookup allocates nothing.
* **Why does the `(not set)` case need no `if` around the `free()`?**
  `free(NULL)` is defined by the standard to do nothing.

## Discussion points

* **Every heap block has exactly one owner.**
  The owner is whoever is responsible for freeing it.
  A function that hands out heap memory has to say in its comment whether the caller becomes the owner, and both leaks here are an owner that did not do its job rather than a line that is wrong.
* **Count what you own.**
  A struct with two heap strings needs two `free()` calls in its teardown.
  The buggy version got one of them, which is the version that hides best: the code *looks* like it cleans up.
* **Leaks come in different shapes and one report.**
  In the demo the allocation and the missing `free()` were in the same loop; here one leak is inside a data structure and the other crosses an API boundary.
  Valgrind reports both the same way, which is exactly what makes it useful: it does not need to know your design to notice that a block was never freed.

## References

* `man 3 strdup`, `man 3 free`
* [The Memcheck manual on leak kinds](https://valgrind.org/docs/manual/mc-manual.html#mc-manual.leaks)
