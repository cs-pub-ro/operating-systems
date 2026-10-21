# Exercise: The Histogram That Counts Too Much

**Tools:** GCC, Make, Valgrind

## Goal

Reference (bug-free) implementation of the grade histogram.
The exercise is the one case in this session that **only a print can solve**: an out-of-bounds write that Valgrind is structurally incapable of seeing, that AddressSanitizer misses too, and that never crashes.

## Background

The program reads grades from standard input, rejects anything outside `0..100`, and counts each one into a ten-point bucket:

```C
#define NBUCKETS	10

struct stats {
	int counts[NBUCKETS];	/* how many grades landed in each bucket */
	int total;		/* how many grades we processed in total  */
};
```

The buckets are `0-9`, `10-19`, ..., `80-89` and `90-100`.
Note the last one: it is eleven values wide, because the grade range is inclusive at both ends.

Files:

* `main.c` — the fixed implementation.
* `input.txt` — twelve sample grades, one of which is a perfect 100.

## Build & Run

```console
make
./histogram < input.txt
```

```text
  0 -   9 |  0
 10 -  19 |  0
 20 -  29 |  0
 30 -  39 | # 1
 40 -  49 | # 1
 50 -  59 | # 1
 60 -  69 | ## 2
 70 -  79 | ## 2
 80 -  89 | ## 2
 90 - 100 | ### 3
processed 12 grades
```

Twelve grades in, twelve grades counted, bars adding up to twelve.
The edge cases behave too:

```console
printf '0\n100\n100\n' | ./histogram
printf '101\n-5\n' | ./histogram      # both rejected, nothing counted
printf '' | ./histogram               # no input at all
```

## Results and Explanations

### The bug

`record_grade()` derived the bucket index straight from the grade:

```C
int bucket = grade / 10;
```

For a grade of 100 that yields `10`, one past the end of `counts[NBUCKETS]`.
Valid grades run `0..100`, so `grade / 10` runs `0..10`: **eleven** possible indices for an array of ten.

The fix folds the top value into the last bucket:

```C
if (bucket >= NBUCKETS)
	bucket = NBUCKETS - 1;
```

`0..100` is 101 values, not 100.
Every ten-point bucketing of an inclusive range has to decide where the top value goes, and the arithmetic will not decide it for you.

### Why the program did not crash

`counts[10]` is not outside the allocation.
It is the memory immediately after the array *inside* `struct stats`, which is the `total` field:

```text
  struct stats  +--------------------------------------------------+-------+
                |            counts[0] .. counts[9]                | total |
                +--------------------------------------------------+-------+
                                                                    ^
                                                    counts[10] lands here
```

So every grade of 100 did two wrong things at once: it was counted in no bucket at all, **and** it incremented `total` a second time.
That is exactly the discrepancy the buggy version shows: twelve grades in, "processed 13 grades", and bars adding up to 11.

The numbers were the only evidence available, and they were quiet about it.
A histogram with one bar one unit short looks like a histogram.

### Why Valgrind reports nothing

```console
valgrind ./histogram < input.txt
```

```text
ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)
```

That is correct behaviour, not a Valgrind failure.
Memcheck tracks **allocations**: for every byte it knows which `malloc()`ed block it belongs to and whether that block is live.
The write to `counts[10]` lands squarely inside a block the allocator really did hand out, so from Memcheck's point of view nothing improper happened.
It hit the wrong **field**, not the wrong **block**, and Memcheck does not know that fields exist.

The same reasoning explains AddressSanitizer, which also works by putting redzones *between* objects; see `FURTHER.md` for what each tool does and does not catch here.

This is worth generalising: **"Valgrind is clean" is necessary, not sufficient.**

### Finding it with a print

No crash, so nothing for GDB to stop at; no report, so nothing for Valgrind to point at.
What is left is the value the program computes, and the fastest way to see it is to print it where it is computed:

```C
static void record_grade(struct stats *st, int grade)
{
	int bucket = grade / 10;

	fprintf(stderr, "record_grade: grade=%d bucket=%d\n", grade, bucket);
```

```text
record_grade: grade=45 bucket=4
record_grade: grade=78 bucket=7
record_grade: grade=92 bucket=9
record_grade: grade=100 bucket=10
record_grade: grade=67 bucket=6
...
```

The fourth line is the bug.
An array of ten has indices `0..9`, and there is a `10` in the list; the print took one line to write and twelve lines to read.
On a longer input the print would be given a condition, `if (bucket >= NBUCKETS)`, so that it fires only on the interesting grade, which is the same thing a conditional breakpoint does with less typing.

That is the general technique here: when a value is wrong and the tools are silent, print the values it was computed from, next to the line that computes it, and compare them with what you expected.

### The lesson

**Validating the input is not the same as validating the index you derive from it.**

`main()` checks that every grade is in `0..100` and rejects the rest, which is what makes the code look airtight.
The check is correct.
The mapping from a validated grade to an array index is a second, separate computation, and nothing in the program checked that one.

## References

* `man 1 valgrind`, and the [Memcheck manual](https://valgrind.org/docs/manual/mc-manual.html)
* [AddressSanitizer](https://github.com/google/sanitizers/wiki/AddressSanitizer)
* [UndefinedBehaviorSanitizer](https://clang.llvm.org/docs/UndefinedBehaviorSanitizer.html)
