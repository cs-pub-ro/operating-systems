# Demo: Moving Work into the Kernel with `sendfile()`

Two servers send the same 10 MB file to a client.
One reads each chunk into a user buffer and sends it out; the other hands the whole file to the kernel with one `sendfile()`.

## Run

Two terminals.
Build and make the test file first:

```console
cd ../../../../02-os-types-interface-full/demos/04-optimize-os-interface/sendfile
make
./create_file.sh
```

In the first terminal, start one server:

```console
./server_sendfile        # or: ./server_write
```

In the second, run the client a few times:

```console
./client
```

The `sendfile()` server is two to three times faster.

## Ask

* `server_write` reads each chunk into user space and writes it straight back out. How many times is each byte copied?
* `sendfile()` never brings the data into user space. What two costs does that remove?
* If the server had to *encrypt* the file before sending, which of the two techniques would still apply?
