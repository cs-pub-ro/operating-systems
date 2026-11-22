# Demo 03: Three Eggs Make an Omelette

**Directory**: `demo-03-omelette/`

This is the first challenge of the session, and every challenge is laid out like this one.
`chall` is an executable, already built, that calls the functions of a shared library and prints a flag if they behaved.
`chall.c` and `flag.h` are its source, to read; the key the flag is decrypted with was taken out of them.
`kitchen.h` is the interface of the library, and is not to be changed.
`kitchen.c` is the library, and the one file you work on: `make` builds `libkitchen.so` from it, and `./chall` looks for that file in its own directory, so it does not start before the first `make`.
A run that has not ended after ten seconds is stopped with a message; `./chall 0` lets it hang, for a look with `ps` or GDB.

Three hen threads lay eggs and put them in a basket, and one cook thread takes three eggs at a time and makes an omelette.
The executable, `chall`, owns the basket and the threads.
The library, `kitchen.c`, decides who may touch the basket and when: `egg_create()` is what a hen calls, and `omelette_make()` is what the cook calls.
The basket is not safe for two threads at once, and it notices when two are in it together, and when the cook starts an omelette with fewer than three eggs in it.

The library already has a mutex and a condition variable in it, and it is wrong in three places.
Together with the teaching assistant you will build it, run `./chall` a few times, and read what the basket complains about.
Then you will go through the three TODOs in `kitchen.c`, one at a time, running the executable after each, until the flag is printed on every run.
The question to carry out of this demo: when the cook is woken up, what does it know about the number of eggs?
