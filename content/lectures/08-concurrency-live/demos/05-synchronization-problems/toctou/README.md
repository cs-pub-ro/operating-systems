# Demo: Time of Check to Time of Use

A shop with a million items and eight buyers.
Read `buy_one()` in `toctou.c` before running anything.

## Run

```console
make
./toctou
./toctou
./check-and-act
```

## Ask

* Every access to `stock` is under the lock. Is `buy_one()` correct?
* How can the shop sell more than it has? What happens between the check and the take?
* What does `check-and-act` lock differently?
* Would a race detector find this?
