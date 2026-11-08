# Demo: A Thread Changing State

## Run

```console
make
./change_state
```

In a second terminal, once at the prompt and once during the burn:

```console
ps -o pid,comm,state,etime,cputime -p "$(pgrep -x change_state)"
```

## Ask

* Which of the two times moves at the prompt, and which during the burn?
* What is the thread waiting for while it is `S`?
