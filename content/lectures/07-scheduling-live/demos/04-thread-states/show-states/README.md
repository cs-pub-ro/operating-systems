# Demo: Showing Thread States

## Run

```console
ps -e -L -o pid,lwp,comm,state | head
ps -e -L -o state --no-headers | sort | uniq -c
ps -e -L -o pid,lwp,comm,state | grep ' R$'
```

## Ask

* Map `R`, `S`, `D`, `I`, `Z` onto running, ready, blocked. Which letter covers two states?
* Nearly everything is `S`. What is each of those threads waiting for?
