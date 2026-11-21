# Demo: The File Pointer and the Size

Seven calls on one file.
With `step`, the program waits for ENTER after each: say what the pointer and the size will be before pressing it.

## Run

```console
make
./file-ops step
```

While it waits, in a second terminal:

```console
cat /proc/$(pidof file-ops)/fdinfo/3
ls -l f.txt
```

At the end:

```console
od -A d -c f.txt
```

## Ask

* Which calls move the file pointer? Which change the size? Which does both?
* After `ftruncate(256)`, where is the pointer, and where is the end of the file?
* Why does the second `read()` return 0?
* What is in the file between bytes 256 and 768 at the end, and who wrote it?
