# Demo: Create and Join

## Run

```console
make
./create_join
```

## Ask

* Each thread returns a number through `pthread_join()`. How does the main thread get it?
* There is no mutex. Why is the program still correct?
* What would break if a thread returned the address of one of its local variables?
