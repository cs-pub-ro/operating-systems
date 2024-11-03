# Baby steps - Python

Run the code in `chapters/compute/processes/guides/create-process/support/popen.py`.
It simply spawns a new process running the `ls` command using [`subprocess.Popen()`](https://docs.python.org/3/library/subprocess.html#subprocess.Popen).
Do not worry about the huge list of arguments that `Popen()` takes.
They are used for **inter-process-communication**.
You'll learn more about this in the [Application Interaction chapter].

Note that this usage of `Popen()` is not entirely correct.
You'll discover why later, but for now focus on simply understanding how to use `Popen()` on its own.

Now change the command to anything you want.
Also give it some arguments.
From the outside, it's as if you were running these commands from the terminal.
