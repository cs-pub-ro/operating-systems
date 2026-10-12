# Demo: Memory You Forget to Free Is Gone

A task scheduler frees every processed task but not the name inside it.

## Run

```console
make
valgrind --leak-check=full ./task > /dev/null
```

## Ask

* 20,001 allocations, 16,001 frees. Which 4,000 blocks were never freed, and where were they allocated?
* The program printed the right output and exited with 0. Is it correct?
* On a spacecraft, with no restart button, how long does forty bytes per task last?
