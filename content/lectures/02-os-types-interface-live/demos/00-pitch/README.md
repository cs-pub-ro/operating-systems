# Demo: The Kernel Does the Heavy Lifting

Four programs print `Hello, World!`, from a freestanding assembly stub to an ordinary C program.
Count the instructions the machine actually runs for each.

## Run

```console
cd ../../../02-os-types-interface-full/demos/00-pitch
make
sudo perf stat -e instructions ./hello_nostd
sudo perf stat -e instructions ./hello
sudo perf stat -e instructions ./hello_static
sudo perf stat -e instructions ./hello_syscall
```

Every version prints the same line.
The freestanding one runs around a hundred thousand instructions; the C one, around a million.

## Ask

* The program is a dozen instructions. Where do the other hundred thousand come from?
* `hello_nostd` never touches libc and still costs six figures. What is that work?
* Removing the `write` and keeping only `exit` barely changes the count. What does that tell you the cost really is?
