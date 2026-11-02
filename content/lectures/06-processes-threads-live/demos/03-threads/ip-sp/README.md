# Demo: Instruction Pointer and Stack Pointer

## Run

```console
make
./ip_sp
nm ip_sp | grep ' t thread'
```

## Ask

* Three threads report the same IP, three report another. Why two values, not six?
* Every SP is different, and about 8 MB apart. What is at each SP?
