# Demo: The Address Space, Line by Line

A program that waits so that `pmap` can look at it, built statically and dynamically.

## Run

Two terminals.
First:

```console
make
./see-pmap-static
```

Second, at each prompt:

```console
pmap -x $(pidof see-pmap-static)
```

Then the same with `./see-pmap`.

## Ask

* Twelve lines. Which came from the file, which are the heap and the stack, and which did nobody ask for?
* After allocating, only three lines changed. Which three, and in what direction?
* The dynamic build has twice the lines and a fifth of the `Dirty` kilobytes. What is libc's code area sharing, and with whom?
