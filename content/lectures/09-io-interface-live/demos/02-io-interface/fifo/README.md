# Demo: I/O Operations on a FIFO

The calls of the file demo, on a FIFO.
Two terminals, in this directory.

## Run

```console
make
./receive_fifo        # first terminal
ls -l fifo_channel    # second terminal
./send_fifo           # second terminal
```

## Ask

* Where does the receiver stop before the sender is started, and what is it doing there?
* What size does `ls -l` show for the FIFO? And after the message went through?
* Which calls are the same as for the file, and which behave differently?
* When does `read()` return 0 here?
