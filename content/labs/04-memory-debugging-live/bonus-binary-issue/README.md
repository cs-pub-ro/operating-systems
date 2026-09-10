# Bonus: Patch the Bug, No Source Code Allowed

**Tools:** GDB, objdump, nm, readelf, Python

## Goal

Diagnose a bug in a compiled binary with no source available, and fix it by patching the machine code in place.

## Background

You have one file: `vuln`, a compiled x86-64 ELF executable.
There is no source code, and none is provided.
Your job is to:

1. Figure out what the program does and where the bug is, using only the binary and the tools from this session (manual inspection, gdb, objdump, Valgrind).
1. **Patch the binary itself** — a handful of bytes, in place — so the bug is fixed.
   You are not allowed to "cheat" by writing your own replacement program from scratch; the fix has to be a patch to the machine code that is already there.

```console
chmod +x vuln
./vuln
```

Try it with a short line of input first.
Then try something much longer.

### What you are allowed to assume

* It is a normal, dynamically linked x86-64 ELF executable — `file vuln` will tell you as much.
* It was **not** stripped: `nm vuln` and `objdump -t vuln` still show you every function and global variable name.
  It was, however, built without `-g`, so gdb and objdump cannot show you source lines or the original `vuln.c` — only addresses, symbol names, and disassembly.
* It reads from standard input and writes to standard output — nothing network-related, nothing that needs a special environment.

## Your Task

### Step 1 — observe the failure

Run it with a short input, then with a long one (a few hundred characters).
Note exactly what differs.
A crash that only happens above some input length, and not below it, is a strong hint about *what kind* of bug you are dealing with — think about what changes as the input grows that does not change for a short input.

```console
python3 -c "print('A' * 200)" | ./vuln
echo $?
```

### Step 2 — find out where, with gdb

```console
gdb ./vuln
(gdb) run
```

(type a long line of `A`s when it asks for input, then press enter)

When it crashes, `backtrace` and `info registers rip`.
Look closely at the addresses in the stack frames above the crash site.
Do any of them look suspiciously like they might correspond to bytes of your own input, printed as a 64-bit hex number?
If a *return address* on the stack has been overwritten with bytes that came from something you typed, that tells you exactly which category of bug this is, and roughly which function is responsible — the one that was about to `return` when things went wrong.

`nm vuln` (or `info functions` inside gdb) will show you the small number of functions defined in this binary.
Only one of them reads user input.

### Step 3 — read the disassembly of that function

```console
objdump -d --disassemble=<function_name> -M intel vuln
```

Look for a call to a well-known libc function that reads text into a buffer — it takes a destination pointer, a maximum size, and (for some variants) a stream.
Two questions to answer from the disassembly alone:

* Where is the destination buffer, and how big is it?
  (Look at how its address is computed relative to the frame pointer — the size of a stack-allocated array is often visible in that computation, or in how much stack space the function reserves on entry.)
* What size value is being passed as the "maximum bytes to read" argument, and which register carries it?
  (Remember the x86-64 calling convention: arguments go in `rdi`, `rsi`, `rdx`, `rcx`, `r8`, `r9`, in order — or their 32-bit sub-registers, `edi`, `esi`, etc., when the argument is a plain `int`.)

Compare the two numbers.
They should describe the same buffer.
Do they?

### Step 4 — patch it

Once you know which single instruction sets up the wrong size, you need to change the **immediate value** it loads — not the opcode, not any other byte.
A few ways to do the actual patch, in increasing order of convenience:

* **By hand with a hex editor / `xxd` + `printf`**: find the file offset of the instruction (`objdump -d` shows you the virtual address of every instruction on the left; for this non-PIE binary the file offset equals the virtual address minus a fixed base you can read off with `readelf -S vuln`, from the `.text` section's `Addr` and `Off` columns), then overwrite just the bytes of the immediate operand.
* **With a short Python script**: open the file in `"r+b"` mode, `seek()` to the offset you found, and `write()` the corrected bytes.
  This is the recommended approach — it is reproducible and you can print out exactly what you changed and why.
* **With gdb**, you can experiment on a *running* process with `set` to confirm your understanding of which byte controls what, but gdb's `set` only modifies the process's memory, not the file on disk — you still need to edit the file itself for the fix to survive after the process exits.

Whatever value you land on for the corrected size, it should match the real size of the destination buffer exactly (not more, not less — less would just be a different, more conservative bug: truncating valid input that should have fit).

## Check Your Work

```console
chmod +x vuln
echo "hello" | ./vuln            # should still work exactly as before
python3 -c "print('A' * 200)" | ./vuln
echo $?                           # should now be 0, not 139
```

Run the long-input case under Valgrind too, for good measure — Valgrind will not catch every stack-based overflow, but it is worth the habit:

```console
python3 -c "print('A' * 200)" | valgrind ./vuln
```

You should see the program complete normally, printing your (truncated) input back, with no "Invalid write" and no crash.
