# Wait for Me

Enter the `wait-for-me/` directory (or `chapters/compute/processes/drills/tasks/wait-for-me/` if you are working directly in the repository).
Run `make` and then enter `support/` folder and go through the practice items below.

Use the `tests/checker.sh` script to check your solutions.

```bash
wait_for_me_processes ...................... passed ... 100
100 / 100
```

1. Run the code in `wait_for_me_processes.py` (e.g: `python3 wait_for_me_processes.py`).
    The parent process creates one child that writes a message to the given file.
    Then the parent reads that message.
    Simple enough, right?
    But running the code raises a `FileNotFoundError`.
    If you inspect the file you gave the script as an argument, it does contain a string.
    What's going on?

    [Quiz](../../questions/cause-of-file-not-found-error.md)

    In order to solve race conditions, we need **synchronization**.
    This is a mechanism similar to a set of traffic lights in a crossroads.
    Just like traffic lights allow some cars to pass only after others have already passed, synchronization is a means for threads to communicate with each other and tell each other to access a resource or not.

    The most basic form of synchronization is **waiting**.
    Concretely, if the parent process **waits** for the child to end, we are sure the file is created and its contents are written.

1. Use `join()` to make the parent wait for its child before reading the file.
