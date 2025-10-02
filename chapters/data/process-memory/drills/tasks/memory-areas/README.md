# Memory Regions

Enter the `memory-areas/support/` directory in the lab archive (or `chapters/data/process-memory/drills/tasks/memory-areas/support` if you are working directly in the repository).
We investigate other programs.

1. The `hello.c` program prints out a message and then sleeps.
   Build it:

   ```console
   student@os:~/.../drills/tasks/memory-areas/support$ make
   ```

   then run it (it will block):

   ```console
   student@os:~/.../drills/tasks/memory-areas/support$ ./hello
   Hello, world!
   ```

   In another terminal, use the command below to show the memory areas of the process:

   ```console
   student@os:~/.../drills/tasks/memory-areas/support$ pmap $(pidof hello)
   8220:   ./hello
   000055c0bef4b000      8K r-x-- hello
   000055c0bf14c000      4K r---- hello
   000055c0bf14d000      4K rw--- hello
   000055c0bf454000    132K rw---   [ anon ]
   00007f2a9e4a5000   1948K r-x-- libc-2.27.so
   00007f2a9e68c000   2048K ----- libc-2.27.so
   00007f2a9e88c000     16K r---- libc-2.27.so
   00007f2a9e890000      8K rw--- libc-2.27.so
   00007f2a9e892000     16K rw---   [ anon ]
   00007f2a9e896000    164K r-x-- ld-2.27.so
   00007f2a9ea8c000      8K rw---   [ anon ]
   00007f2a9eabf000      4K r---- ld-2.27.so
   00007f2a9eac0000      4K rw--- ld-2.27.so
   00007f2a9eac1000      4K rw---   [ anon ]
   00007ffee6471000    132K rw---   [ stack ]
   00007ffee6596000     12K r----   [ anon ]
   00007ffee6599000      4K r-x--   [ anon ]
   ffffffffff600000      4K --x--   [ anon ]
    total             4520K
   ```

   The output is similar, but with fewer dynamic libraries than `bash`, since they are not used by the program.

1. Make a program in another language of your choice that prints `Hello, world!` and sleeps and investigate it with `pmap`.
   Note that in the case of interpreted languages (Python, Lua, Perl, Ruby, PHP, JavaScript etc.) you have to investigate the interpreter process.

If you're having difficulties solving this exercise, go through [this](../../../reading/process-memory.md) reading material.
