# High-Level Languages

Using the standard C library (libc) frees the programmer from the cumbersome steps of invoking system calls and reimplementing common features.
Still, for improved development time and safety, other programming languages can be used, such as Rust, Python, JavaScript.
Most (if not all) of these high-level programming languages still make use of the standard C library.
Such that a call to a function in Python would end-up making a call to a function in the standard C library.

The `chapters/software-stack/high-level-languages/drills/tasks/high-level-lang/support/` folder stores the implementation of a simple "Hello, World!"-printing program in Python.
We simply invoke the `python` interpreter to run the program:

```console
student@os:~/.../high-level-lang/support$ python hello.py
Hello, world!
```

We count the number of functions called from the standard C library and the number of system calls:

```console
student@os:~/.../high-level-lang/support$ ltrace -l 'libc*' python hello.py 2> libc.out
Hello, world!

student@os:~/.../high-level-lang/support$ wc -l libc.out
50469 out

student@os:~/.../high-level-lang/support$ strace python hello.py 2> syscall.out
Hello, world!

student@os:~/.../high-level-lang/support$ wc -l syscall.out
948 syscall.out
```

The dynamic standard C library (`libc.so.6`) is a dependency of the Python interpreter (`/usr/bin/python3`):

```console
student@os:~/.../high-level-lang/support$ ldd /usr/bin/python3
[...]
        libc.so.6 => /lib/x86_64-linux-gnu/libc.so.6 (0x00007fa6fd6d0000)
[...]
```

We can see the complexity of invoking the Python interpreter, resulting in more the 50,000 of library calls being made.
This means added overhead versus a simple C function.
However, this also means faster development in the Python programming language.
Each new layer in the software stack simplifies development but adds overhead.

We can use `perf` to compare the running time between the Python and a C "Hello, World!"-printing programs:

```console
student@os:~/.../high-level-lang/support$ sudo perf stat ../static-dynamic/hello
Hello, World!

 Performance counter stats for '../static-dynamic/hello':

              0.46 msec task-clock                #    0.559 CPUs utilized
                 0      context-switches          #    0.000 K/sec
                 0      cpu-migrations            #    0.000 K/sec
                52      page-faults               #    0.114 M/sec
           859,341      cycles                    #    1.882 GHz
           713,395      instructions              #    0.83  insn per cycle
           141,710      branches                  #  310.393 M/sec
             6,208      branch-misses             #    4.38% of all branches

       0.000816974 seconds time elapsed

       0.000872000 seconds user
       0.000000000 seconds sys

student@os:~/.../high-level-lang/support$ sudo perf stat python hello.py
Hello, world!

 Performance counter stats for 'python hello.py':

             69.39 msec task-clock                #    0.992 CPUs utilized
                 2      context-switches          #    0.029 K/sec
                 0      cpu-migrations            #    0.000 K/sec
             1,115      page-faults               #    0.016 M/sec
        74,405,125      cycles                    #    1.072 GHz
        84,957,056      instructions              #    1.14  insn per cycle
        18,574,724      branches                  #  267.689 M/sec
           759,104      branch-misses             #    4.09% of all branches

       0.069981351 seconds time elapsed

       0.054376000 seconds user
       0.015536000 seconds sys
```

We can see that on all metrics, the running of the Python program is less efficient than the running of the C program.
The Python code takes `69` milliseconds, whereas the C code runs in less than `1` millisecond.

When deciding what programming language and what libraries and software components to use, you have to balance requirements for fast development and increased safety (inherent to higher-level programming languages) with requirements for speed or efficiency (common to lower-level programming languages such as C).
Newer modern programming languages such as Go, Rust, D aim to add the benefits of high-level programming languages and keep efficiency close to the C programming language.
Generally, additional software layers (libraries, language environments, interpreters) simplify development but decrease speed and efficiency.
