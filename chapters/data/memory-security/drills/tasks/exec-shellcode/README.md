## Shellcode Executor

Navigate to the `exec-shellcode` directory in the lab archive (or `chapters/data/memory-security/drills/tasks/exec-shellcode` if you are working directly in the repository) and run `make skels` to generate the `support/` folder.
Then navigate to `support/src`.

Your goal is to update the `exec-shellcode.s` source code file to be able to read and execute shellcodes from a given binary files.
The program thus acts as a shellcode tester.

A [shellcode](https://cocomelonc.github.io/tutorial/2021/10/09/linux-shellcoding-1.html) is a small program that is commonly used in memory-related security exploits as a form of arbitrary code execution.
It's a binary string consisting of instructions / code to be directly interpreted by the CPU during the execution of the targeted vulnerable program.

Shellcodes end up in an `exit()` system call to ensure a graceful exit of the program after running the shellcode.
Use `mmap()` to reserve a virtual page.
Use anonymous mapping (i.e. the `MAP_ANONYMOUS`) flag.
Use the proper permissions required to enable the shellcode to be read from the file into memory and then executed.

To test the implementation, enter the `tests/` directory and run:

```console
make check
```

As an extra item, add a shellcode for the `brk()` system call in the `tests/brk.asm` file.
It should be a simple shellcode that calls `brk(NULL)`, i.e. with the purpose of getting the current program break.

In case of a correct solution, you will get an output such as:

```text
./run_all_tests.sh
test_helloworld                  ........................ passed ...  25
test_getpid                      ........................ passed ...  25
test_openfile                    ........................ passed ...  25
test_brk                         ........................ passed ...  25

Total:                                                           100/100
```

If you're having difficulties solving this exercise, go through [this](../../../reading/memory-security.md) reading material.
