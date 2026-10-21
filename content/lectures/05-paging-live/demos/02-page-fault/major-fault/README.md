# Demo: Minor and Major, on the Same File

## Run

```console
make
./major_fault
fincore data.bin 2>/dev/null
```

Not on `/tmp`: the directory has to be on a real disk.

## Ask

* 16,384 major faults, then 0. What changed between the two passes?
* 0.3 s against 0.002 s, for the same instructions. Where did the time go?
* The second pass took 1,024 faults for 16,384 pages. What did the kernel do with the other 15 in each 16?
