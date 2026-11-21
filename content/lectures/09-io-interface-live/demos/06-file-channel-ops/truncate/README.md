# Demo: Size Is Not Space

A program that sets the size of a file to 20 GiB, then writes one byte in the middle.

## Run

```console
make
df -h .
./truncate
ls -lh fake-gargantua.dat
ls -sh fake-gargantua.dat
du -h fake-gargantua.dat
make clean
```

## Ask

* How long did it take to make 20 GiB? Was there room on the disk?
* Which command shows the size, and which the space?
* What does a read from the start of this file return, and does the disk take part?
* Where have you seen "promise a lot, pay for what is used" before in this course?
