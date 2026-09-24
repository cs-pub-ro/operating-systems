# How the Lab Works

This is the practical half of the Operating Systems class: C on Linux, aimed at the layers underneath your program.

Something very important: [ask the teaching assistant](#ask-the-teaching-assistant).
Whenever you are stuck, unsure what an exercise wants, or lost in an explanation, ask — that is what the teaching assistant is there for.

## What you need

* A Linux environment on an x86-64 machine: your own installation, a virtual machine, WSL, a container, or one of the faculty's lab machines.
  Sessions 02 and 05 depend on x86-64 specifically, so an ARM machine will not do for those.
* The tools each session uses, listed in the *Prerequisites and required tools* section of that session's `README.md`.
* A terminal you are comfortable in, and the habit of reading `man` pages.

## Check setup

Check that your system has all it needs for the lab, by downloading and running the [`check-prerequisites.sh` script](https://github.com/cs-pub-ro/operating-systems-sessions/blob/master/scripts/check-prerequisites.sh):

```console
wget http://raw.githubusercontent.com/cs-pub-ro/operating-systems-sessions/refs/heads/master/scripts/check-prerequisites.sh
chmod a+x check-prerequisites.sh
./check-prerequisites.sh
```

The script installs nothing.
It reports what is missing and prints the command that installs it on your distribution.

If something is missing, be sure to install and configure it.

## How a session is structured

Every session is one directory, and the exercises inside it come in three kinds.
The kind is the prefix of the exercise directory name:

* `demo-*` — the warm-up, worked through together with the teaching assistant at the start of the session.
  The demo sets up the idea, and often the code, that the exercises after it build on.
* `NN-*` — the core exercises, solved individually or in teams, in their numeric order.
  They usually build on one another, and this is the part of the session that matters most.
* `bonus-*` — optional, for when you are through the core exercises, or to take home.

A session runs through those three kinds in that order.
You do a demo together with the teaching assistant, then move on to the core exercises, and finally, for those who get that far, to the bonus execises.

A session directory often holds more than one demo, but only one of them is done in the session: the teaching assistant picks the one that fits the group.
The rest are there for you to read afterwards.

Each exercise directory is self-contained: sources, a `Makefile`, and the files that go with them.

The session's own `README.md` is the map: what you should be able to do by the end, what you need installed, and the order the exercises are taken in.
Read it first.

Inside an exercise directory:

* `README.md` is the exercise itself: the goal, the background you need, what to do, how to build and run it, and how to check your work.
* `FURTHER.md`, where there is one, holds extensions and questions to dig into once the exercise works.
  It is optional, and it is worth your time when the core exercises are done.

Skeleton files carry `TODO` markers.
Those markers are the work: the surrounding code is there so you can spend the session on the interesting part rather than on boilerplate.

## Working through an exercise

1. Read the whole `README.md` before writing anything, including *Check Your Work*.
   Knowing what "done" looks like changes how you start.
1. Build early and build often.
1. Change one thing at a time, and run it.
1. Read the first error, not the last one.
   The compiler's later errors are usually consequences of the first.
1. When the exercise says to measure something, measure it before you explain it.
   The number is the evidence; the explanation comes afterwards.

## Good practices

* **Compile with warnings on, and fix them.**
  `gcc -Wall -Wextra` finds a good share of the bugs the later sessions teach you to hunt with a debugger.
  A warning you have decided to ignore is a bug you have decided to keep.
* **Read the manual page of functions you call.**
  `man 3 malloc`, `man 2 write`.
  Section 2 is system calls, section 3 is library functions; the *RETURN VALUE* and *ERRORS* parts are the ones you will actually need.
* **Check every return value.**
  `malloc`, `open`, `read`, `write` and friends all fail, and a program that ignores that fails later, somewhere else, in a way that is much harder to explain.
* **Free what you allocate, on every path.**
  Including the early returns and the error paths, which is where the leaks live.
* **Reach for a tool instead of guessing.**
  `gdb` for a crash or a wrong value, `valgrind` for anything to do with memory, `strace` for what a program asks the kernel to do, and `nm`, `objdump` and `readelf` for what is inside a binary.
  A debugging session is faster than a third round of added `printf` calls.
* **Write it yourself.**
  Using an AI assistant to produce the code during the lab defeats the purpose of the lab: the skills here are built by typing, failing, and fixing.
  Talk to your colleagues, compare approaches, explain your bug out loud — that is the kind of help that leaves something behind.

## Ask the teaching assistant

The teaching assistant is in the room for exactly this: to be asked.
Ask when you are stuck, ask when the exercise is not clear, ask when the output makes no sense, ask when something said during the demo went past you.
Ask for directions, too, not only about errors: which approach to take, whether what you have written is a sane way to do it, why the code behaves the way it does, what to look at once an exercise works.
No question here is too small, too basic or too late.

Ask early rather than after twenty minutes of staring at the same screen.
A misunderstanding caught in its first minutes costs you one question; the same misunderstanding carried to the end of the session costs you the session.
Asking is not an admission that you are behind — it is the whole point of having a lab instead of a book, and everyone in the room is expected to do it.

If an exercise is done and you are not sure *why* it works, that is also worth a question.
Take your results to the teaching assistant and explain them: the *Check Your Work* sections are written to give you something to discuss rather than an output to match.

## Getting unstuck

None of this replaces asking; it is what makes the answer land on something concrete.
Before you raise your hand, if you have a minute for it, try:

1. Re-read the exercise and your code, and say out loud what each line is supposed to do.
   The line where the sentence sounds wrong is usually the bug.
1. Read the manual page of the function that misbehaves.
1. Shrink the problem: a ten-line program that shows the same behaviour is a bug you can see.
1. Point the right tool at it, and read what it says carefully.
1. Ask a colleague sitting next to you.

Then ask the teaching assistant, and bring what you have: the command you ran, the output you got, the output you expected, and what you have already tried.
This is not just politeness, it is half of debugging — a surprising number of bugs are solved out loud while describing them.
And if the minute is not there, or the bug has already eaten it, ask anyway.
