# Memory Layout of Statically-Linked and Dynamically-Linked Executables

1. Let's investigate another static executable / process.

   If not already installed, install the `busybox-static` package on your system.
   On Debian/Ubuntu systems, use:

   ```console
   student@os:~$ sudo apt install busybox-static
   ```

   Start a process using:

   ```console
   student@os:~$ busybox sleep 1000
   ```

   Investigate the process using `pmap` and the executable using `size`.

If you're having difficulties solving this exercise, go through [this](../../../reading/process-memory.md) reading material.
