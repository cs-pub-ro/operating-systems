# Going Further: Set the Access Level (heap-1)

Optional.

## Things to try

1. Try to win by typing the target value by hand at the menu, without a script.
   Where does the whitespace-splitting behaviour of `scanf("%s", ...)` get in your way?
1. Change the payload so the trailing string is off by one byte, and watch the comparison fail.
1. Rewrite the exploit in pwntools so the target string is a variable, then re-point it at `demo-heap-0`.
   How little has to change between the two?

## Questions to answer

* What exactly does `check_win()` compare `access_level` against, byte for byte, terminator included?
* Why does the filler length matter as much as the target string?
* If the target were an 8-byte number instead of a 4-character word, what would you have to change?

## Discussion points

* **Corrupting a value and choosing a value are different skills.** This one is the second.
* **A string comparison includes the terminator.** Getting the visible characters right is not always enough.
* **This is the template for the rest of the session.** Precise bytes at a known offset is every remaining challenge.

## References

* `man 3 strcmp`
* [pwntools packing helpers](https://docs.pwntools.com/en/stable/util/packing.html)
