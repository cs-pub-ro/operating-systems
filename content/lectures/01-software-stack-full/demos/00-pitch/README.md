# Pitch: Four Small Surprises

Four programs that any second-year student can read line by line, and whose behaviour none of those lines explains.

| Demo | The surprise |
| --- | --- |
| [`01-copy-string/`](01-copy-string) | Two programs build the identical string; one takes thirty times longer. |
| [`02-const-char-init/`](02-const-char-init) | Two ways of writing what looks like the same declaration; one program crashes. |
| [`03-find-buffer-cache/`](03-find-buffer-cache) | The same command, run three times in a row, gets fifteen times faster. |
| [`04-python-string-edit/`](04-python-string-edit) | Appending one character at a time is linear or quadratic depending on an assignment that does nothing. |

## Why they open the lecture

None of the four is a puzzle about C or about Python.
Each of them is a question about the layer *below* the one the program is written in: the standard C library, the linker and the loader, the kernel's page cache, the interpreter's memory management.
The source code is a perfectly accurate description of what the program asks for, and a perfectly useless description of what it costs.

That gap is what the rest of the lecture is about.
A software stack is a pile of layers, each hiding the one under it; hiding a layer is what makes the layer above it usable, and forgetting the hidden layer is what makes its cost impossible to predict.

You do not need to know everything that is under you.
You need to know *that* something is under you, roughly what it does, and where to look when the numbers stop making sense.
</content>
