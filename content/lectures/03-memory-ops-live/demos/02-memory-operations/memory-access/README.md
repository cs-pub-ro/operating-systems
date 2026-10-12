# Demo: Permissions Are Per Area

Read, write and execute, against the data area and the code area.
Four combinations work; three, commented out in `main()`, each crash.

## Run

```console
make
./memory-access
```

Uncomment one of the three lines at the end of `main()`, rebuild, run again.

## Ask

* Reading code works. Why would a program be allowed to read its own instructions?
* Executing data, writing code, reading address 0: which of the three is a different kind of fault from the other two?
* Why does the kernel leave address 0 unmapped on purpose?
