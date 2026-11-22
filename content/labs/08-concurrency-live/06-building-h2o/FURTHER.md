# Going Further: Building H2O

Optional.

## Things to try

1. **`if` instead of `while`.**
   Change the two waits of your solution to test once.
   Does the program stop, or does it finish with the wrong groups?
   Follow one hydrogen thread that is woken up by a broadcast meant for others.
1. **Release outside the lock.**
   Releasing with the lock held is the short solution.
   Write one that releases after unlocking: it needs a fifth counter, for the atoms of the current molecule that have a ticket and have not released yet.
   Compare the two for length, and for the number of places where a mistake can be made.
1. **A different molecule.**
   Change your solution to build ammonia, NH3: three hydrogen and one nitrogen.
   Which numbers change?
1. **Unequal supply.**
   On paper: one thread brings all the hydrogen, one atom at a time, and another brings the oxygen.
   What happens?
   Why did the executable not have every thread bring a fixed number of atoms?

## Questions to answer

* Exercise 05 said to keep the work outside the lock.
  Here the release is inside it.
  What is different?
* Two condition variables, one for hydrogen and one for oxygen, instead of one.
  What would `form()` call, and how many times?
* The three threads of a molecule are woken "at once".
  Do their three releases happen in a fixed order?
  Does it matter?

## Discussion points

* **A counter is a promise.**
  `tickets_h == 0 && tickets_o == 0` means "the molecule before has left" only because of where the release was put.
  Move the release and the same test means something weaker.
* **Who forms the next molecule?**
  Every change that can make the condition true has to be followed by somebody testing it.

## References

* `man 3 pthread_cond_wait`, `man 3 pthread_cond_broadcast`
* Allen B. Downey, *The Little Book of Semaphores*, section 5.6, *Building H2O* — <https://greenteapress.com/wp/semaphores/>
