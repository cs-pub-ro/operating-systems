# Demo: The Five Operations

Allocate a kilobyte, write `0xc3` (`ret`) into it, read it back, jump to it, free it.

## Run

```console
make
./basic
gdb -batch -ex run -ex bt -ex 'info proc mappings' ./basic
```

## Ask

* Which of the five steps failed? Say it before scrolling up.
* The address was just written to, so it exists. What is wrong with the access?
* Why would you *want* memory you can write to be impossible to run?
