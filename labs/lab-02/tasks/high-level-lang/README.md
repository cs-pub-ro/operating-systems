---
parent: Lab 2 - Library Perspective
nav_order: 3
---

# Task: High-Level Languages

Enter the `labs/lab-02/tasks/high-level-lang/` folder, then enter `spport/`
Then go through the practice items below.

1. Use `make` to create the `hello` executable from the `hello.go` file (a Go "Hello, World!"-printing program).
   Use `ltrace` and `strace` to compute the number of library calls and system calls.
   Use `perf` to measure the running time.

   Compare the values with those from the "Hello, World!"-printing programs in C and Python.

1. Create a "Hello, World!"-printing program in a programming language of your choice (other than C, Python and Go).
   Find the values above (library calls, system calls and running time).

   [Quiz](../../../quizzes/python-tools.md)

1. Create programs in C, Python and Go that compute the N-th Fibonacci number.
   `N` is passed as a command-line argument.
   Run the checker (`make check` in the `high-level-lang/solution/tests/` folder) to check your results.

   Use `ltrace` and `strace` to compute the number of library calls and system calls.
   Use `perf` to measure the running time.

   Compare the values of the three programs.

1. Create programs in C, Python and Go that copy a source file into a destination file.
   Both files are passed as the two command-line arguments for the program.
   Run the checker (`make check` in the `high-level-lang/support/tests/` folder) to check your results.

   Sample run:

   ```console
   student@so:~/.../solution/tests/$ make check
   make -C ../src
   make[1]: Entering directory '/media/teo/1TB/Poli/Asistent/SO/operating-systems/labs/lab-02/tasks/high-level-lang/solution/src'
   go build -ldflags '-linkmode external -extldflags "-dynamic"' hello.go
   cc   -z lazy  fibo.c   -o fibo
   go build -o fibo_go -ldflags '-linkmode external -extldflags "-dynamic"' fibo.go
   cc   -z lazy  copy.c   -o copy
   go build -o copy_go -ldflags '-linkmode external -extldflags "-dynamic"' copy.go
   make[1]: Leaving directory '/media/teo/1TB/Poli/Asistent/SO/operating-systems/labs/lab-02/tasks/high-level-lang/solution/src'
   Fibonacci [C]       --  fibo(10) ==   55  --  PASSED
   Fibonacci [C]       --  fibo( 5) ==    5  --  PASSED
   Fibonacci [C]       --  fibo(20) == 6765  --  PASSED
   Fibonacci [Python]  --  fibo(10) ==   55  --  PASSED
   Fibonacci [Python]  --  fibo( 5) ==    5  --  PASSED
   Fibonacci [Python]  --  fibo(20) == 6765  --  PASSED
   Fibonacci [Go]      --  fibo(10) ==   55  --  PASSED
   Fibonacci [Go]      --  fibo( 5) ==    5  --  PASSED
   Fibonacci [Go]      --  fibo(20) == 6765  --  PASSED
   Copy [C]            --  PASSED
   Copy [Python]       --  PASSED
   Copy [Go]           --  PASSED
   ```

   Use `ltrace` and `strace` to compute the number of library calls and system calls.
   Use `perf` to measure the running time.
   Use source files of different sizes.
   Compare the outputs of these commands on the three programs.

If you're having difficulties solving this exercise, go through [this](../../reading/high-level-lang.md) reading material.
