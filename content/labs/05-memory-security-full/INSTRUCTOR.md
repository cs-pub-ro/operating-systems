# Instructor Notes: Session 05 — Memory Security

Notes for preparing and running the session.
Per-task notes are in `INSTRUCTOR.md` inside each challenge directory.

## Read this first: do not ship the flags

This session is the one place in the repository where secret material lives inside a task tree: every `*/flag` and every `*/solve/exploit.py` sits under `05-memory-security-full-contents/`.

Two safeguards that protect the other sessions do **not** cover this directory:

* `scripts/gen_zip.py` skips directories literally named `solutions`. There is no such directory here any more — the reference material was lifted into `*-full-contents/`, which is not on the skip list.
* Both the archive builder and the website only look at directories matching `^session-\d+` (`SESSION_PATTERN` in `scripts/sessions.py`). Neither `05-memory-security-work/` nor `05-memory-security-full-contents/` matches, so as things stand the generators ignore session 05 entirely.

The moment `sessions.py` is updated to recognise the renamed layout (which every session now needs), it **must** in the same change:

* pack student archives from `*-work/` only, and
* exclude every `*-full-contents/` directory.

Until that is done, do not run `gen_zip.py` and hand the result to anyone: a naive fix that simply broadens `SESSION_PATTERN` would ship the flags. This is worth verifying with `unzip -l` before any archive leaves your machine.

## What the students get

For each challenge, players receive only the public files in `05-memory-security-work/<task>/`: the source `chall.c`, the compiled `chall`, and the task `README.md`.
The flag is never in the binary — `chall` does `fopen("flag.txt", ...)` at runtime — so shipping the binary is safe. The flag exists only on the deployed service and in this directory.

## Shape of the session

Two demos first, worked together; then four core challenges in order; two bonuses for whoever gets there, or as take-home.

The demos (`demo-heap-0`, `demo-heap-1`) are deliberately near-clones of the first two core challenges (`01-cylab-heap-0`, `02-cylab-heap-1`) — same bug, different names and flavour text.
Solve the demos together, slowly, showing the whole workflow: run it, use "Print Heap" to read the two addresses, subtract them to get the overflow distance, build the payload in pwntools, capture a local flag.
Then the first two core challenges are the same moves again and should be quick wins. That is the intended morale curve; do not skip the demos to save time.

Deliberately no fixed minute budget is published to students.
If you must cut, cut bonuses: `heap-havoc` and `heap-mayhem` are real exploit-development exercises and most groups will take them home.

## The through-line, and where each challenge adds one idea

Say the spine out loud; it is what makes six challenges feel like one:

1. `heap-0` — overflow corrupts an adjacent value; **any** change wins.
1. `heap-1` — same overflow, but the value must be **exact** (endianness / precise bytes enter here).
1. `heap-2` — the adjacent value is a **function pointer**; choosing it chooses the code that runs.
1. `heap-3` — **no overflow**: a use-after-free plus tcache reuse gives the write instead.
1. `heap-havoc` — the overflow reaches **across structs**, several fields deep, to an unguarded callback.
1. `heap-mayhem` — same, but **PIE**, so you must **leak** a code pointer before you can aim.

## Skills to establish in the demos, because every later task reuses them

* **Read the heap from the program itself.** "Print Heap" gives two addresses; their difference is the number of filler bytes to reach the neighbour. Nobody should be guessing 32.
* **Why 32 and not the requested 5.** glibc rounds a small request up to a minimum usable chunk (0x20 bytes of usable space on 64-bit), and adds chunk metadata; the measured delta already accounts for all of it. Show the delta, do not derive it.
* **pack, don't type.** Precise values go through `p64()`/`p32()`; this is where endianness is taught, once, on `heap-1`.
* **Local first, remote second.** Every `exploit.py` runs against a local `./chall` with no arguments, and against a deployment with `REMOTE HOST=... PORT=...`. Establish that split on the first demo.

## Deploying for the lab

Each challenge deploys independently over its own port; the internal `xinetd` port is always 31337, mapped to a distinct host port per challenge:

| Challenge | Host port | Challenge | Host port |
| --- | --- | --- | --- |
| `demo-heap-0` | 31000 | `04-cylab-heap-3` | 31013 |
| `demo-heap-1` | 31001 | `01-cylab-heap-0` | 31010 |
| `02-cylab-heap-1` | 31011 | `bonus-cylab-heap-havoc` | 31020 |
| `03-cylab-heap-2` | 31012 | `bonus-heap-mayhem` | 31021 |

Bring each up with its `build` → `publish` → `deploy` READMEs.
`heap-havoc` is **32-bit** (`-m32`), so its build image installs `gcc-multilib` and it ships the 32-bit `ld-linux.so.2`; it is also served through a wrapper that reads two lines and re-execs the binary with them as `argv[1]`/`argv[2]`, because the bug is in argument handling and a bare socket carries no argv.

## Things students get wrong

* **Guessing the overflow distance** instead of reading it from "Print Heap". Redirect them to the two printed addresses.
* **Endianness on `heap-1`/`heap-2`.** A hand-typed address is big-endian in their head and wrong on the wire; `p64()` fixes it.
* **`heap-3`: allocating the wrong size.** The reclaim only works if the new request lands in the same tcache bin as the freed object; `sizeof(struct object)` is the number to hit.
* **`heap-2`: forgetting `win()` needs no comparison.** `check_win()` *calls* `*x`; there is nothing to match, only an address to supply.
* **`heap-mayhem`: hardcoding an address.** It is a PIE; anything not derived from the leak is wrong on the next run.

## Practical notes

* All binaries are built weak on purpose: no stack protector; no PIE except `heap-mayhem`. Point this out so students do not conclude real targets are this easy.
* The heap-layout numbers depend on the glibc the binary is linked against, which is exactly why every challenge ships its own `libc.so.6` and loader. If a student's local numbers differ from a classmate's, they built against different libcs.
* Nothing here is timing-sensitive, but `recvall(timeout=5)` in the exploits means a wrong payload shows up as a five-second hang, not an instant error. Say so.
