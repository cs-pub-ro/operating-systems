# Demo: Swap, in a Box

## Run

```console
make
./swap
systemd-run --user --scope -p MemoryMax=64M ./swap
```

Swap has to be enabled (`swapon --show`).

## Ask

* The boxed write still succeeded. Where did 193 MB go, and who decided?
* Reading it back took 8,424 major faults and two seconds. Why does each read push something else out?
* The program's code is the same in both runs. What did it see of all this?
