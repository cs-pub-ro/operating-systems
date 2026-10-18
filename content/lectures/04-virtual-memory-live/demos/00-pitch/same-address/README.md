# Demo: The Same Address, Twice

Two copies of one program, each printing the address of a global and the value it stored there.

## Run

Two terminals, one copy in each:

```console
make
./same_address
```

Leave both waiting and compare.

## Ask

* `&value` is `0x404040` in both. The values differ. Where are the two bytes?
* Press Enter in one copy. Did the other copy's write reach it?
* `main()` is at the same address too. Is that one copy of the code, or two?
* The local variable's address differs between the two runs. What moved it?
