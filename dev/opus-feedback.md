# Educational Review of Lab Sessions 1-5

A critical review of the practical content in `session-01` .. `session-05`, from the point of view of teaching a 2nd-year, 1st-semester Operating Systems class, 100 minutes per lab (50 min demo + 50 min individual/team work).

The overall verdict first, because the rest of this document is mostly criticism and that would give a wrong impression: **the material is of unusually high quality.**
The measurement-driven pedagogy in session 1, the "run the tool, read what it says, then fix it" workflow in session 4, and the insistence that correct output is not the same as correct code, are all things that most OS courses do not do at all.
The problems below are almost entirely problems of *volume* and *packaging*, not of substance.

## 1. Content: difficulty, coverage, relevance

### What works

* **The measurement-first approach is the strongest asset here.**
  `demo-printf-vs-write` and `01-string-functions` both set up a question ("which is faster?"), invite a prediction, then demolish the prediction with numbers.
  This is exactly the right way to teach performance intuition, and it is far better than telling students that buffering is good.
* **Deliberate contradiction between sessions is excellent design.**
  In the `printf` demo the library beats hand-written code; in `01-string-functions` hand-written code beats the library.
  The material explicitly names this ("Neither 'use the library' nor 'write it yourself' is the lesson. Measuring is.").
  Keep this.
* **Session 4 is the pedagogical high point.**
  The three-bug ladder in `demo-in-memory-database` (crash → wrong value → silent leak) mapped onto (gdb → gdb → Valgrind) is a genuinely good curriculum design.
  So is `01-grade-histogram` explicitly showing a case where **Valgrind sees nothing** — teaching the limits of a tool at the same time as the tool itself is rare and valuable.
* **Continuity of artefacts.**
  The in-memory database is written in session 3, then debugged in session 4.
  Students meet their own code again with bugs in it.
  This is a strong motivational device; use it more.
* Difficulty ramp within each session (demo → exercise → bonus) is generally well judged.

### Where difficulty is mis-set

* **Session 1 is too hard for week 1.**
  `bonus-static-vs-dynamic` covers PIC, GOT, PLT, lazy binding, `LD_PRELOAD`, symbol interposition, `-fno-plt` and `LD_DEBUG`.
  That is a 3rd/4th-year linkers-and-loaders lecture compressed into a bonus.
  Students who have just come out of an intro OS course and a HW/SW interface course will read the PLT/GOT diagram and take away nothing.
  Recommendation: split it.
  Keep Part A + Part B (build a `.a`, build a `.so`, hit the `libmystring.so: cannot open shared object file` error and fix it three ways) as the bonus for session 1 — that is the genuinely useful, high-frequency skill.
  Move Parts C/D (PLT/GOT, benchmarking, the static-vs-dynamic trade-off table) to a later session or to the lecture.
* **Session 5 is a large difficulty discontinuity.**
  Sessions 1-4 are "write correct C and understand what it costs".
  Session 5 is CTF heap exploitation: 8 challenges, controlled overflow into an adjacent heap object, function-pointer hijack, use-after-free with tcache-style reallocation, and a PIE challenge requiring an infoleak + offset computation.
  For a 2nd-year 1st-semester student this is a very steep jump, especially `bonus-heap-mayhem` (leak → compute base → overflow → redirect), which is realistically a multi-hour task for someone who has never done binary exploitation.
  It also silently assumes a toolchain and a mindset (`pwntools`, `python3 -c "print(...)"` piping, endianness of payloads, `objdump -d` to find an uncalled function) that the previous four sessions never taught.
  Recommendation: add an explicit "payload construction" mini-primer at the top of session 5 (how to send non-printable bytes; little-endian packing; why `echo` is not enough), and consider demoting `bonus-heap-mayhem` to a take-home / optional-credit item rather than something anyone is expected to reach in the lab.
* **Session 5 challenges 01-04 are outsourced to an external platform** (`learn.cylabacademy.org`).
  This is a real dependency risk: accounts, availability, link rot, and content you do not control.
  The local `chall` + `chall.c` files mitigate it, but the READMEs still lead with the external link.
  Recommendation: make the local copy the primary path and the platform link the optional one.
* **`mmap` in session 3 is arguably in the wrong place.**
  `demo-copy-file/mmap` requires the student to reason about page faults, `MAP_SHARED` vs `MAP_PRIVATE`, dirty pages and `msync` — i.e. virtual memory — before virtual memory has been taught properly, and inside a demo whose other two variants are about `malloc` and static buffers.
  It is a great demo; it belongs either later in the "Data" chapter or in the I/O chapter as the counterpoint to `read`/`write`.

### Coverage gaps

Given the stated chapter list, the following are conspicuously absent from what is here:

* **No exercise on the stack / automatic storage** as a first-class topic.
  Sessions 3-5 are almost entirely about the heap.
  Students will finish session 5 with a strong heap model and a vague stack model — yet the classic buffer overflow they will meet everywhere else is a stack overflow.
  `bonus-binary-issue` (session 4) is the only stack-smash content, and it is a bonus behind a disassembly task.
* **No memory-layout orientation exercise.**
  Nothing asks the student to print the addresses of a global, a `static`, a local, a `malloc`'d block and a string literal, and read `/proc/self/maps` to see which region each falls in.
  This is a 15-minute exercise that would anchor everything in sessions 3-5 and remove a lot of the hand-waving.
  Strongly recommended as the first demo of session 3.
* **Address sanitizer is mentioned once in passing** (`session-03/demo-copy-file/malloc`) and never used.
  Session 4 teaches gdb and Valgrind but not `-fsanitize=address,undefined`, which in 2026 is the tool students will actually have available in CI and which catches session 4's exercise 1 bug (the intra-struct overflow that Valgrind misses) — a wonderful punchline that is currently left on the table.
* **`errno` / error handling discipline** is used in the code but never taught as a topic, despite being fundamental to the syscall interface introduced in session 2.
* Session 2 covers `getpid`, `nanosleep`, `clock_gettime` — all *trivial* syscalls (no side effects, no error paths).
  The session teaches the mechanism well but never shows a syscall that can fail interestingly, or the vDSO (which is directly relevant: `clock_gettime` is normally *not* a syscall at all, and a student running `strace` may well see nothing — this will confuse people and is not addressed).

## 2. Duration versus plan

This is the single biggest problem with the material as it stands.
**Sessions 1, 3, 4 and 5 all substantially exceed 100 minutes.**

| Session | Demo(s) | Exercises | Realistic demo time | Realistic exercise time |
| --- | --- | --- | ---: | ---: |
| 1 | `copy-string`, `printf-vs-write` | `01-string-functions`, `02-stream-ciphers` | 70-85 min | 80-110 min |
| 2 | `demo-puts-write` | `01-getpid`, `02-nanosleep` | 25-35 min | 30-40 min |
| 3 | `copy-file` x3 variants | `01-in-memory-db` | 60-75 min | 35-45 min |
| 4 | `in-memory-database` (3 bugs) | `01-histogram`, `02-longest-word`, `03-symbol-hash-table` | 60-80 min | 90-120 min |
| 5 | `heap-0`, `heap-1` | 4 CTF challenges | 40-60 min | 120+ min |

Specific observations:

* **Session 1 demo slot is ~1.6x over.**
  `demo-printf-vs-write` alone is a 296-line document with three build-and-time cycles, two `strace` sessions, an `N` change and a discussion.
  Delivered properly with a class that types the programs itself (as the README asks), it is 45-60 minutes on its own.
  Adding `demo-copy-string` on top does not fit.
* **Session 1 exercise slot is ~2x over.**
  `01-string-functions` asks students to implement four functions, *write their own test file*, compile it two different ways, run a provided 25-test suite, then run and interpret a benchmark table.
  That is the whole 50 minutes, comfortably.
  `02-stream-ciphers` then adds four different build/link configurations.
  One of the two has to move.
* **Session 3's demo has three full variants**, each with its own multi-TODO README.
  Global buffer + `malloc` is a coherent 45-minute pair.
  Adding `mmap` (with `ftruncate`, `MAP_SHARED`, `msync`) makes it 70+.
* **Session 4 is the worst offender.**
  The demo README is 471 lines and walks through three separate bug hunts with full gdb transcripts.
  Then there are *three* exercises, one of which (`03-symbol-hash-table`) is itself a three-bug hunt in a hash table with chaining.
  Realistically session 4 is two labs' worth of material.
* **Session 2 is the only session that is on plan — and it may be slightly under.**
  Two near-identical syscall wrappers (`getpid`, `nanosleep`) after the demo has already shown the pattern is genuinely 30-40 minutes for most students.
  There is room here to absorb material displaced from session 1.

### Recommendations on time

1. **Mark every item with an explicit time budget in its README** (e.g. `**Estimated time:** 20 min`).
   The `bonus-static-vs-dynamic` README already has metadata-style items elsewhere in the repo (`**Duration**`, `**Platform**`, `**Difficulty**` are mentioned in `content-rules.md`) — apply that convention everywhere, consistently.
   This helps the TA pace the room and helps students self-triage.
2. **Declare a "core path" per session.**
   State explicitly which one demo and which one exercise every student must finish, and mark the rest as "if there is time".
   Right now everything reads as mandatory, which will make weaker students feel permanently behind — a significant motivation problem in this age group.
3. **Rebalance across sessions**: move `02-stream-ciphers` out of session 1 (it fits session 2 or as bonus), move `mmap` out of session 3, split session 4 into two, and cut session 5 from 4 exercises to 2 + bonuses.
4. **Take the long analytical write-ups out of the lab document.**
   See section 5.

## 3. Wording and presentation, and fit for ~20-year-olds

### Strengths

* The **voice is excellent**: direct, second person, confident, with genuine narrative tension ("Write down your guess", "Case closed?", "That is the trap", "It is still wrong").
  This is far better than the flat imperative style of most lab handouts, and it is well matched to the audience.
* **Predict-then-measure prompts** are used repeatedly and are exactly the right technique for this age group: they create a small ego stake in the answer.
* The "**Things to try**" and "**Check yourself**" sections at the end of session-1 documents are very good — self-assessment questions that are not just recall.
  These should exist in *every* task, not just some.
* Honest hedging about numbers ("Yours will be different... The ratios are the point, not the digits") pre-empts the "my number does not match the handout, therefore I am wrong" panic.

### Problems

* **The best documents are far too long to be read during a lab.**
  A 20-year-old under time pressure in a 100-minute lab will not read 296 lines of prose before typing.
  They will scan for the code blocks and the commands, skip the analysis, and the analysis is where the entire value is.
  This is the central presentation problem in the repo: *the pedagogy is in the parts that will be skipped.*
  See section 5 for the fix.
* **The documents frequently give the answer before asking the question.**
  `demo-copy-string` and both session-3 demo variants hand over the exact code to type into each TODO.
  This reduces the exercise to transcription.
  For a demo done with the TA this is defensible, but even then the code should be revealed on the TA's cue, not sitting on the student's screen.
  Contrast with session 4, which never gives the fix away — that is the right calibration.
* **Tone is inconsistent across sessions.**
  Sessions 1, 3 and 4 are warm, narrative, second person.
  Session 5 is terse to the point of being unwelcoming: three lines, a link, and hints.
  Session 5's tasks read as if written by a different person with a different intent.
  Given that session 5 is also the hardest, the least scaffolded documentation is on the material that most needs scaffolding.
* **Unexplained jargon appears with no warning.**
  "Schlemiel the Painter's algorithm" (funny and memorable, keep it), "PIE", "tcache", "infoleak", "PLT", "GOT", "vDSO" — several of these appear without definition.
  A per-session glossary, or at minimum a first-use bold-and-define convention, would help.
* **No statement of prerequisites or environment** anywhere.
  Nothing says: Linux x86-64, `gcc`, `make`, `gdb`, `valgrind`, `strace`, `python3`, and possibly `pwntools`.
  Nothing says what to do on macOS/ARM or WSL, which a non-trivial fraction of a 2026 cohort will be using.
  Session 1's `-Wl,-Bstatic` and session 2's raw x86-64 syscall numbers are hard-hardware-dependent and will silently fail elsewhere.
  This will cost TA time in every single lab.
* **The AI policy is stated in the course brief but nowhere in the material.**
  If AI use is discouraged, say so *in the lab documents*, and — more effectively — design around it.
  Session 4 and session 5 are naturally AI-resistant (the answer is in the runtime behaviour of a specific binary, not in the prose).
  Session 1 and session 3 are not: `my_strlen` is the single most-generated function in history.
  Consider adding a "show me your `strace`/Valgrind/gdb output" validation step to those, so the deliverable is evidence of running things, not source code.
* Second person plural drifts ("We will create two programs", "Your task is") — pick one and be consistent.

### Concrete wording/consistency bugs found

These are small but they cost credibility with students, who will assume the fault is theirs:

* `session-01/bonus-per-stream-cipher-exec/README.md` refers to "exercise `03-stream-cipher`" three times; the directory is `02-stream-ciphers`.
  The solutions directory is also `solutions/03-stream-ciphers`, i.e. the numbering is inconsistent with the exercise it solves.
* `session-01/02-stream-ciphers/README.md`: "The implementation is already there, in the `cipher.c` and `vigenere.c` source code files" — the file is `caesar.c`, not `cipher.c`.
* `session-01/bonus-per-stream-cipher-exec/README.md`: "The program will only receive two command line arguments: the shift and the key" — for `caesar_main.c` it is the shift and the text; for `vigenere_main.c` the key and the text.
  Stated as written it is wrong in both cases.
* `session-01/bonus-static-vs-dynamic/README.md` refers to "your `my_strlen`, `my_strcpy`, `my_strcat` and `my_memcpy`" (four functions) and then to "It calls your three functions in a tight loop".
* `session-01/bonus-static-vs-dynamic/README.md` benchmarks and discusses `main_fullstatic`, but the Setup section never tells the student how to build it.
* `session-03/demo-copy-file/global-buffer`: TODO 2 declares `char local[BUFFER_SIZE];` as a *local* array where `BUFFER_SIZE` is 1 MB.
  A 1 MB stack frame is within the default 8 MB limit but is a bad habit to teach silently, in a session whose whole point is where memory lives.
  Either shrink it, or make the stack-vs-static-vs-heap size limit an explicit teaching point (which would be much better).
* Session 5 task READMEs (except `bonus-heap-mayhem`) have **no level-1 heading**.
  Per `site/README.md`, the generated site falls back to the directory name, so the published pages will be titled `01-cylab-heap-0` rather than something meaningful.
* `session-05/03-cylab-heap-2` has no `solutions/` entry with the same completeness as the others — worth verifying the solution set is uniform.
* `content-rules.md` mandates `*` for unordered lists and one sentence per line; several documents (e.g. `session-04/01-grade-histogram`, `session-05/*`) use `--` for dashes and multi-sentence lines.
  Session 5 also uses `--` where the rest of the repo uses `—`.

## 4. Visual cues, diagrams and references

This is the weakest area of the material, and the cheapest to improve.

### What exists and works

The ASCII diagrams that are present are good and should be the model for more:

* the three-layer syscall diagram in session 2 (`helper --> wrapper --> my_syscall() --> kernel`);
* the PLT/GOT flow in `bonus-static-vs-dynamic`;
* the capacity-growth trace in `01-in-memory-db`;
* the "scan 0 bytes, append 16 / scan 16 bytes, append 16 / ..." trace in `01-string-functions`, which is the single clearest explanation of quadratic behaviour in the whole repo.

### What is missing

1. **A process memory-layout diagram.**
   Sessions 3, 4 and 5 are all about memory and there is *not one picture of an address space anywhere*.
   Students are asked to reason about `.text`/`.data`/`.rodata`/`.bss` (session 4, exercise 3), the heap growing upwards, and heap chunk adjacency (session 5) with nothing but prose.
   One diagram, reused across three sessions, would carry an enormous amount of load.
2. **A heap chunk diagram for session 5.**
   The entire session is "object A is `N` bytes before object B; overflow A to reach field `f` of B".
   Without a picture showing chunk header + user data + next chunk, and where the target field sits, students are guessing offsets by trial and error rather than by reasoning.
   This is the difference between the session teaching exploitation and the session teaching fuzzing.
3. **A struct-layout diagram for `session-04/01-grade-histogram`.**
   The bug *is* the adjacency of `counts[10]` and `total` in memory.
   A four-line box diagram showing `counts[0..9]` followed immediately by `total`, with an arrow at index 10, makes the whole exercise click instantly.
4. **Plots for the benchmark tables.**
   `01-string-functions` presents O(N²) vs O(N) as a six-row table and then explains in prose that the ratio quadruples.
   A single log-log plot would make it self-evident.
   Same for the static/dynamic benchmark.
   Even ASCII bar charts would do.
5. **Timeline diagram for the use-after-free bug** in `session-04/demo-in-memory-database` (bug 2): `first = &records[0]` → `realloc` moves the block → `first` dangles.
   Three boxes and two arrows.
6. **References are almost entirely absent.**
   There is no "further reading" anywhere.
   Suggested minimum, per session: the relevant man pages (already partly there), `ld.so(8)` and Levine's *Linkers and Loaders* for session 1, `syscall(2)` and the Linux syscall table for session 2, `malloc(3)` / `mmap(2)` and a glibc malloc internals write-up for session 3, the Valgrind and GDB manuals for session 4, and a heap-exploitation primer for session 5.
   Students at this level need to learn that primary documentation exists and is readable; right now the material *models* that (constant `man` references) but never names sources.
7. **Screenshots or asciinema recordings of a gdb session** would materially help session 4.
   The README has excellent transcripts, but seeing the TUI (`tui enable` is mentioned once, in a table, at the very end) is different from reading a transcript.

## 5. Structure, format and other improvements

### The big structural recommendation: separate the lab sheet from the essay

The material currently mixes two documents that have different audiences and different reading times:

* **the lab sheet** — what to do, in what order, what to type, what to check;
* **the analysis** — why the numbers look like that, what the trade-off is, what the lesson is.

The analysis in this repo is genuinely excellent (the `printf`/`write` two-lessons box, the "better constant factor vs better algorithm" conclusion, the static-vs-dynamic trade-off table).
It is also 70% of the word count and will be skipped under time pressure.

Recommendation: split each long task into `README.md` (short, imperative, checklist-shaped, ≤80 lines) and `DISCUSSION.md` (the essay, linked from the README and explicitly assigned as post-lab reading).
The site generator already walks directories, so a small change to also render a second file per task would suffice.
This costs nothing pedagogically and roughly doubles the chance the analysis is actually read.

### Per-session index pages

There is no `README.md` at the root of any `session-NN-*` directory.
Consequently there is no place that states, for a session:

* the learning objectives;
* the order of the tasks and which are core versus optional;
* the time budget;
* the prerequisites and required tools;
* the link back to the corresponding lecture.

Add one per session.
This is the highest value-per-effort change in this list.
The site generator already produces a session page — give it real content instead of a bare directory listing.

### Standardise the task README skeleton

Sessions 1-4 each use a different structure (`Overview / Implement / Build / Run` vs `Part A / B / C` vs `Aim / Background / Tasks / Build / Run` vs `Reproduce / Your task / Takeaway`).
Session 5 uses almost none.
Pick one and enforce it:

```text
# <Type>: <Title>

**Time:** 20 min  **Difficulty:** ●●○  **Tools:** gcc, gdb, valgrind

## Goal            (1-3 sentences: what you will be able to do afterwards)
## Background      (only what is needed; link out for more)
## Your task       (numbered, checkable)
## Build & run
## Check your work (the exact command and the exact expected output)
## Going further   (Things to try / Check yourself)
```

The predictability itself is a feature: students learn where to look, and the TA can say "go to Check your work" and be understood.

### Assessment and validation

* Only some tasks have an automated check (`make test` in `01-string-functions`, the 25-test suite).
  Most rely on the TA eyeballing output.
  With a full room and a 50-minute window that does not scale.
  Add a `make check` target to every exercise that exits non-zero on failure — including `valgrind --error-exitcode=1` where relevant.
  This is also how you make the "0 errors from 0 contexts" standard enforceable rather than aspirational.
* Consider adding a one-line self-report at the end of each task ("what surprised you?") — cheap, and it gives the TA a signal about where the room actually is.

### Repository hygiene

* **Compiled binaries are committed**: `session-05/*/chall` (8 of them), `session-04/bonus-binary-issue/vuln`, and `flag` files in `session-05/solutions/*`.
  For `vuln` and `chall` this is deliberate and correct (the exercise *is* the binary).
  For the `flag` files, committing them to a public repo means the answers to the CTF exercises are one `git grep` away.
  If the repo is or will be public, move flags out or generate them at build time.
* `session-01/demo-copy-string/` contains untracked build artefacts (`copy-string`, `copy-string.o`, `copy-string-improved`, ...) sitting next to the sources.
  44 `.gitignore` files exist across the repo but this directory's is evidently not covering them.
  A student cloning this will see prebuilt binaries and may never build anything.
* Not every task directory has a `Makefile` (40 Makefiles for a larger number of tasks).
  Several READMEs give a raw `gcc` line instead.
  That is defensible early on (students should see the compiler invocation at least once), but it should be a deliberate, stated choice rather than an accident: e.g. "sessions 1-2 build by hand, from session 3 on we use `make`".
* `session-02/printf/` is vendored third-party code (mpaland/printf) with its own 212-line README, CI badges and a C++ test suite pulled into a C course.
  Per `questions.md` the decision to leave large external files untouched is reasonable, but the vendored README will appear on the generated site as a task page, which is confusing.
  Add it to the generator's exclusion list, or put a short wrapper README in front of it.
* `prompt.txt` / `*-prompt.txt` files (the generation prompts) are interleaved with student-facing content and will be visible to students.
  Given the stated policy of discouraging AI use in the labs, students discovering the AI generation prompts next to their exercises is an awkward look.
  Move them under a non-published directory.

### Smaller suggestions

* Add a "**common errors**" section to the first two sessions: `undefined reference to`, `cannot open shared object file`, `Segmentation fault (core dumped)`, `implicit declaration of function`.
  Name each one, say what it means, say what causes it.
  Students lose enormous amounts of lab time to error messages they cannot parse, and the TA answers the same four questions twenty times.
* Sessions 1 and 4 both use timing tables from "Ubuntu 24.04, gcc 13.3".
  State the reference platform once, in the session index, rather than repeating it.
* The demo/exercise/bonus taxonomy from `questions.md` is well defined but is not visible in the documents themselves.
  Every task README should say, in its first line, which of the three it is.
  Session 5's demos do this ("solved together with the teaching assistant at the start of the session") — the rest do not.
* Consider a short "what you should be able to do now" checklist at the end of each session, phrased as capabilities ("explain why `strcat` in a loop is quadratic"; "read a Valgrind leak report and name the allocation site").
  This converts a pile of tasks into a course.

## Summary of priority actions

1. **Fix the time budget.** Sessions 1, 3, 4 and 5 do not fit in 100 minutes. Declare a core path per task; move `02-stream-ciphers` and `mmap`; split session 4.
2. **Add a session-level `README.md`** to each session with objectives, order, timings, prerequisites and tools.
3. **Split long documents** into a short imperative lab sheet and a separate discussion piece, so the analysis survives contact with a time-pressed student.
4. **Add the missing diagrams**: process address space (reused across sessions 3-5), heap chunk adjacency (session 5), `struct stats` layout (session 4).
5. **Scaffold session 5**, which is currently the hardest content with the thinnest documentation, and reduce its exercise count.
6. **Add a memory-layout orientation exercise** and **AddressSanitizer** to the session 3/4 toolkit.
7. **Fix the naming and cross-reference errors** listed in section 3, and normalise everything against `content-rules.md`.
8. **Add `make check` targets** so correctness validation does not depend entirely on the TA's attention.
