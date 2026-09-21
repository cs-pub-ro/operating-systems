# Demo: What a System Call Costs

Ten million one-byte writes to `/dev/null`, once as a real system call and once as a plain function call.
Writing to `/dev/null` does no work, so what is left is the cost of the crossing itself.

## Run

```console
cd ../../../../02-os-types-interface-full/demos/02-os-interface/syscall-overhead
make
./make_syscalls
./make_libcalls
```

For where the time goes:

```console
sudo perf stat -e instructions ./make_syscalls
sudo perf stat -e instructions ./make_libcalls
```

The system-call version is roughly seventy times slower.

## Ask

* `/dev/null` throws the byte away. So what is the system-call version actually spending its time on?
* Look at the `sys` line in `perf`: half a second against zero. What happened ten million times?
* This is the price of the boundary from part 03. Is it worth paying for a one-byte write? For a one-megabyte one?
