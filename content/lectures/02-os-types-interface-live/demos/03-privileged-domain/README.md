# Demo: Privileged Instructions Fault in User Mode

Two tiny assembly programs try to run a privileged instruction -- `cli`, which disables interrupts, and `mov rax, cr3`, which reads the page-table base -- from an ordinary process.

## Run

```console
cd ../../../02-os-types-interface-full/demos/03-privileged-domain
make
./cli
./cr3
```

Each prints `first`, hits the forbidden instruction, and is killed before `second`.
The kernel logs the fault:

```console
sudo dmesg | tail -2
```

Now run one again as root:

```console
sudo ./cli
```

## Ask

* There is no check for `cli` anywhere in the kernel. What refused to run it, then?
* Under `sudo` it crashes exactly the same way. What does that say about the difference between root and kernel mode?
* If a program cannot run privileged instructions itself, how does it ever get privileged work done?
