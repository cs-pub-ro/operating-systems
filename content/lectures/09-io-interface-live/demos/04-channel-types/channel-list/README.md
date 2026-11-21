# Demo: One Process, Every Kind of Channel

A program that opens a file, a device, a pipe, a FIFO and three sockets, prints its file descriptor table, and waits.

## Run

```console
make
./channels
```

While it waits, in a second terminal:

```console
lsof -p $(pidof channels) -a -d 0-1023
ss -ltun | grep 4242
ls -l fifo_channel socket_channel
```

## Ask

* How many types does the `type` column show, for eleven entries?
* Entries 5 and 6 lead to the same thing. What is it, and can another process open it?
* What is the difference between entry 5 and entry 7?
* For each entry: how would another process get to the same thing?
