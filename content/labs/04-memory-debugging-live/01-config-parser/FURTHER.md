# Going Further: The Config Parser That Forgets

Optional.

## Things to try

1. **Make duplicate keys update the old value.**
   Right now `a = 1` followed by `a = 2` stores two settings.
   Change `config_add()` to replace the value of an existing key instead.
   There is a new way to leak in there; find it with Valgrind before you look for it in the code.
1. **Return a pointer instead of a copy.**
   Change `config_get()` to return `cfg->settings[i].value` itself, and update its comment.
   Which `free()` has to go, and what can the caller no longer do with the result?
1. **Make the leak visible without Valgrind.**
   Call `config_get()` a million times in a loop in the buggy version and watch the process grow in `top`.
1. **Exit without cleaning up.**
   Remove the call to `config_free()` from the fixed version and run Valgrind with `--show-leak-kinds=all`.
   Look at which kind the twelve blocks are reported as, then make `cfg` a `static` variable and run again.
   Why does the kind change, and is either version a bug?

## Questions to answer

* Valgrind pointed at `strdup()` for both leaks, not at `config_free()` or at `main()`.
  Why can it not point at the place where the `free()` is missing?
* One record had three lost blocks and the other six.
  Where do the two numbers come from?
* Why does the `(not set)` case need no `if` around the `free()`?

## Discussion points

* **Every heap block has exactly one owner.**
  The owner is whoever is responsible for freeing it, and a function that hands out heap memory has to say in its comment whether the caller becomes the owner.
  Both leaks here are an owner forgetting its duty, not a line of code that is wrong.
* **Count what you own.**
  A struct with two heap strings needs two `free()` calls in its teardown.
  The buggy version got one of them.
* **Leaks come in different shapes.**
  Here the allocation and the missing `free()` are in different functions; in the demo they were in the same loop.
  The Valgrind report looks the same in both cases, which is what makes it useful.

## References

* `man 3 strdup`, `man 3 free`
* [The Memcheck manual on leak kinds](https://valgrind.org/docs/manual/mc-manual.html#mc-manual.leaks)
