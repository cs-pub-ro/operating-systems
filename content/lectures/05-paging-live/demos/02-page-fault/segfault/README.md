# Demo: Eight Accesses, Two Kinds of No

## Run

```console
make
./segfault
./segfault 1
./segfault 6
./segfault 3
strace -e trace=none ./segfault 3 2>&1 | grep SIGSEGV
```

## Ask

* Case 1 and case 6 touch the same byte of the same kind of page. Why does one get a frame and the other a signal?
* Case 3 reads one byte past the page. Which question did the kernel answer "no" to?
* All eight accesses started with the same trap. Where did the three outcomes get decided?
