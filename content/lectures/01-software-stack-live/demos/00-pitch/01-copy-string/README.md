# Demo: Two Ways to Build the Same String

Ten million times, build `John, Paul, George, Joel` with `strcat()` and with `strcpy()` at known offsets.

## Run

```console
cd ../../../../01-software-stack-full/demos/00-pitch/01-copy-string
make
./copy-string
./copy-string-improved
```

## Ask

Both print the same string. One takes about thirty times longer.

* Which one is slower, and why is it not the implementation's fault?
* What does `strcat()` have to do before it can write its first byte?
* What would change if a C string carried its length?
