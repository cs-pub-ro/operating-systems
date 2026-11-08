# Demo: The Nice Value

## Run

```console
make
./start-all.sh
```

Watch `htop` while it runs, then compare the groups:

```console
grep Elapsed pri-20-*.txt | sort -t: -k3
grep Elapsed pri0-*.txt | sort -t: -k3
grep Elapsed pri+19-*.txt | sort -t: -k3
```

## Ask

* Three times as many processes as CPUs. In which order do the groups finish, and by how much?
* Every CPU is at 100% the whole time. What does nice decide, then?
* Did the +19 group ever stop running?
