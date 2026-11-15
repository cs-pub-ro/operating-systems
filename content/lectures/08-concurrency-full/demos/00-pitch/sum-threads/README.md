# Synchronized Access

To get consistent results, access to shared variables must be synchronized.

This demo showcases how synchronization provides consistent results, and how it's implemented.

First, build all files:

```console
make
```

There are multiple executables, each with their own specific (32 vs 64 bits, using `long` vs `long long`).
Those named `..._atomic` result in consistent results because they are synchronized:

```console
$ ./sum_threads
sum is: 671076

$ ./sum_threads_32
sum is: 715160

$ ./sum_threads_32_longlong
sum is: 649601

$ ./sum_threads_atomic
sum is: 4500000

$ ./sum_threads_atomic_32
sum is: 4500000

$ ./sum_threads_atomic_32_longlong
sum is: 4500000
```

To see what's happening we disassemble the code:

```console
$ objdump -d -M intel sum_threads_atomic
  401214:       48 8b 45 f8             mov    rax,QWORD PTR [rbp-0x8]
  401218:       f0 48 01 05 50 2e 00    lock add QWORD PTR [rip+0x2e50],rax        # 404070 <sum>
  40121f:       00

$ objdump -d -M intel sum_threads_atomic_32
 80491db:       8b 45 fc                mov    eax,DWORD PTR [ebp-0x4]
 80491de:       f0 01 05 30 c0 04 08    lock add DWORD PTR ds:0x804c030,eax

$ objdump -d -M intel sum_threads_atomic_32_longlong
[...]
 80491f1:       89 c1                   mov    ecx,eax
 80491f3:       89 d3                   mov    ebx,edx
 80491f5:       01 f1                   add    ecx,esi
 80491f7:       11 fb                   adc    ebx,edi
 80491f9:       89 4d d8                mov    DWORD PTR [ebp-0x28],ecx
 80491fc:       89 5d dc                mov    DWORD PTR [ebp-0x24],ebx
 80491ff:       8b 5d d8                mov    ebx,DWORD PTR [ebp-0x28]
 8049202:       8b 4d dc                mov    ecx,DWORD PTR [ebp-0x24]
 8049205:       f0 0f c7 0d 30 c0 04    lock cmpxchg8b QWORD PTR ds:0x804c030
 804920c:       08
 804920d:       0f 94 c1                sete   cl
 8049210:       84 c9                   test   cl,cl
 8049212:       74 dd                   je     80491f1 <thread_func+0x2b>
[...]
```

We notice that:

1. For data that fits into a CPU register (`long`), synchronization is done via the use of the `lock` prefix, that ensures only that instruction has access to the memory bus.
1. For data that doesn't fit into a CPU register (`long long`), there need to be two memory accesses (for the two parts) and the `lock` prefix can no longer be used.
   In that case, a form of busy waiting is done, trying to see if the variable has been modified in the meanwhile.
   If it has, the operation is retried.
