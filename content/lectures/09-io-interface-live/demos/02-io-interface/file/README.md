# Demo: I/O Operations on a File

Two programs that print every call they make, with what it returned.

## Run

```console
make
./write_file
ls -l file_channel
./read_file
rm file_channel
```

## Ask

* In how many calls does the name of the file appear?
* What do the other calls use instead, and why is it 3?
* `read()` asked for 255 bytes. How many did it get, and what did the second `read()` return?
* Between the two programs, who was connected to the file?
