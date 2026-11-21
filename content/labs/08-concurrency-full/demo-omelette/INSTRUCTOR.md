# Instructor Notes: Three Eggs Make an Omelette

## Purpose

Two things at once: the format of a challenge, which every later task uses, and the first reading of broken synchronization code.
Spend a few minutes on the format, because nobody will explain it again: what is given, what is built, what `chall` does without the library, what the flag is for.

## Running it

1. `./chall` before `make`: the loader error.
   Ask what is missing and where the program looks for it; `readelf -d chall | grep RUNPATH`.
1. `make`, `./chall` twice: different numbers, the same complaints.
1. Read `kitchen.h` with the room: which functions are whose.
1. TODO 1, run; TODO 2, run; TODO 3, run.
   Run after each: the message changes, and that is the lesson in reading symptoms.
1. Twenty runs in a loop at the end.

## Expected answers

* **TODO 1**: lock and unlock around the three statements of `egg_create()`.
* **TODO 2**: `while` instead of `if`.
* **TODO 3**: `basket_take_eggs()` and `eggs -= EGGS_PER_OMELETTE` moved before the unlock.

## Things students get wrong

* **Signalling only when `eggs` reaches 3.**
  Passes.
  Ask what happens with two cooks, or when the count goes from 2 to 5 between two looks.
* **`pthread_cond_broadcast()` instead of `signal`.**
  Correct and harmless with one cook.
* **A second mutex for the basket.**
  Then `eggs` and the basket can disagree; one invariant, one lock.
* **Unlocking before the signal in `egg_create()`.**
  Correct as well, as long as the change to `eggs` was made under the lock; say so if somebody asks, and do not let it become a rule either way.

## Verified reference values

| Fact | Value |
| --- | --- |
| Skeleton | 1,000 omelettes started short, 50 to 180 collisions in the basket, up to 11 eggs not counted |
| TODO 1 only | all eggs counted, 1,000 omelettes still started short |
| TODO 1 and 2 | anything from 2 to 850 rules broken; some runs time out (1 in 4 when measured) |
| Reference, `make test` | the flag, 20 runs out of 20 |
| Proof passed to `flag_print()` | 3000, 1000, 0 |

## Practical notes

* The first five complaints are printed and the rest only counted.
* Each hen sleeps 20 microseconds before every egg (`LAYING_TIME` in `chall.c`), which is what makes the cook wait at all.
  Without it the hens fill the basket before the cook wakes up once, and the `if` never shows.
* With TODO 1 and 2 done, the run that times out is the one to keep on the screen: `eggs` was decremented outside the lock, an update was lost, and the cook is waiting for an egg that is already in the basket.
* `flag.h` is regenerated with `../utils/gen_flag.py flag 3000 1000 0 > flag.h`, and the live copy with `../utils/publish.sh demo-omelette`.
