# Demo: One Core, Many Cores

Eight threads add 1 to a shared counter, 50 million times each.
`count_one_insn` and `count_locked_insn` are built only on x86_64.

## Run

```console
make
./count
taskset -c 0 ./count
taskset -c 0 ./count_one_insn
./count_one_insn
./count_locked_insn
```

`taskset -c 0` confines all the threads to CPU 0.

The instructions behind the addition:

```console
objdump -d -M intel count | grep -A 6 '<add_one>:'
objdump -d -M intel count_one_insn | grep -A 4 '<add_one>:'
```

## Ask

* On one core nothing runs in parallel, and `count` still loses updates. Who interrupted whom, and where?
* About a hundred involuntary switches lose millions of additions. Why so many per switch?
* `count_one_insn` is exact on one core and loses most updates on many. What can get inside one instruction?
* What does the `lock` prefix change?
