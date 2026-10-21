# Exercise: The Program That Is Right and Still Broken

**Tools:** GCC, Make, Valgrind

## Goal

Find and fix a memory leak caused by a pointer being overwritten, using Valgrind.

## Background

`main.c` reads words from standard input and reports how many there were and which one was the longest.
The answer it prints is correct, it never crashes, and `-Wall -Wextra` says nothing.

The program keeps exactly one string on the heap at a time, the longest word seen so far, and `main()` frees it at the end.
That sounds like it should balance.
It does not, and the reason is one assignment.

## Your Task

1. Run the program under Valgrind with `--leak-check=full` and read the leak report.
   Write down how many blocks were lost and in which function they were allocated.
1. Count how many words in `input.txt` are longer than every word before them.
   That is how many heap copies the program makes; compare with the number of lost blocks.
1. Find the assignment that loses a block.
   A pointer variable holds one address: ask what happens to the address that was in it when a new one is stored on top.
1. Fix it, keeping the output identical.
   The struct owns the string it points to, so the old string has to be released before the pointer is overwritten.

## Build & Run

```console
make
./longest < input.txt
valgrind --leak-check=full ./longest < input.txt
```

## Check Your Work

```console
valgrind --leak-check=full ./longest < input.txt
printf 'aaa\n' | ./longest
printf '' | ./longest
printf 'zz\naaa\nbbbb\naaaaa\n' | ./longest
```

Every run must end at `All heap blocks were freed` with 0 errors, and the reported longest word must still be right in each case.

The last two inputs are the interesting ones.
`free(NULL)` is legal and does nothing, so empty input needs no special case.
Freeing the same pointer twice is undefined behaviour, and Valgrind reports it as an invalid free.
A fix that trades a leak for a double free is not a fix; check both.
