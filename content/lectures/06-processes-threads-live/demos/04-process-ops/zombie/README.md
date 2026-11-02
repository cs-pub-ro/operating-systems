# Demo: A Zombie Process

## Run

```console
make
./zombie
```

In a second terminal, before pressing `ENTER`:

```console
ps -o pid,stat,cmd -C sleep
```

## Ask

* What do the `Z` and `<defunct>` mean? Is the process using any memory?
* What makes the zombie disappear?
