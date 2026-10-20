# USS, PSS and RSS for Multiple Processes

We want to see how the USS, PSS and RSS values vary for different ways of building a helloworld program.
We will run 4 different scenarios:

1. Run 10 processes from the same static executable.
1. Run 10 processes from the same dynamic executable.
1. Run 10 processes from 10 different static executables.
1. Run 10 processes from 10 different dynamic executables.

First, generate and build the executable binaries:

```console
./clean.sh
./generate.sh
./build.sh
```

Run each scenario and see the values of USS, PSS and RSS using [`smem`](https://man7.org/linux/man-pages/man8/smem.8.html).

1. Run 10 processes from the same static executable:

   ```console
   $ ./instantiate-one-static-multiple-times.sh
   Hello, World! (01)!
   Hello, World! (01)!
   Hello, World! (01)!
   Hello, World! (01)!
   Hello, World! (01)!
   Hello, World! (01)!
   Hello, World! (01)!
   Hello, World! (01)!
   Hello, World! (01)!
   ```

   Now show values with `smem`:

   ```console
   $ smem -P hello-
     PID User     Command                         Swap      USS      PSS      RSS
   85702 razvan   ./work/hello-static-01             0       48      111      704
   85703 razvan   ./work/hello-static-01             0       48      111      704
   85704 razvan   ./work/hello-static-01             0       48      111      704
   85707 razvan   ./work/hello-static-01             0       48      111      704
   85708 razvan   ./work/hello-static-01             0       48      111      704
   85709 razvan   ./work/hello-static-01             0       48      111      704
   85710 razvan   ./work/hello-static-01             0       48      111      704
   85711 razvan   ./work/hello-static-01             0       48      111      704
   85705 razvan   ./work/hello-static-01             0       52      115      708
   85706 razvan   ./work/hello-static-01             0       52      115      708
   ```

   Notice that most of the memory is shared: there is a large difference between USS (unique) and PSS (unique + percentage of shared memory).
   This sharing is because all 10 processes are started from the same binary executable.

   Kill processes to get to the next scenario:

   ```console
   $ ./kill.sh
   ```

1. Run 10 processes from the same dynamic executable:

   ```console
   $ ./instantiate-one-dynamic-multiple-times.sh
   Hello, World! (01)!
   Hello, World! (01)!
   Hello, World! (01)!
   Hello, World! (01)!
   Hello, World! (01)!
   Hello, World! (01)!
   Hello, World! (01)!
   Hello, World! (01)!
   Hello, World! (01)!
   ```

   Now show values with `smem`:

   ```console
   $ smem -P hello-
     PID User     Command                         Swap      USS      PSS      RSS
   85879 razvan   ./work/hello-01                    0       96      106     1688
   85881 razvan   ./work/hello-01                    0       96      106     1692
   85882 razvan   ./work/hello-01                    0       96      106     1692
   85876 razvan   ./work/hello-01                    0      100      109     1628
   85877 razvan   ./work/hello-01                    0      100      110     1652
   85878 razvan   ./work/hello-01                    0      100      110     1696
   85880 razvan   ./work/hello-01                    0      100      110     1696
   85883 razvan   ./work/hello-01                    0      100      110     1696
   85884 razvan   ./work/hello-01                    0      100      110     1696
   85885 razvan   ./work/hello-01                    0      100      110     1696
   ```

   There are two main differences from the previous scenario:

   a. Not so much memory is shared.
      This is because the dynamic executable is much smaller than a static executable.
      It is shared, but it occupies less space.
   b. The value of RSS is much larger.
      This is because the dynamic executable uses shared libraries that occupy more space.
      But, of course, shared libraries are shared, so the RSS metric here doesn't mean more space is being used.
      It means that the current process is mapped to the (shared) physical pages corresponding to the shared library.

   Kill processes to get to the next scenario:

   ```console
   $ ./kill.sh
   ```

1. Run 10 processes from 10 different static executables:

   ```console
   $ ./instantiate-multiple-static.sh
   Hello, World! (01)!
   Hello, World! (03)!
   Hello, World! (02)!
   Hello, World! (06)!
   Hello, World! (07)!
   Hello, World! (08)!
   Hello, World! (09)!
   Hello, World! (04)!
   Hello, World! (05)!
   Hello, World! (10)!
   ```

   Now show values with `smem`:

   ```console
   $ smem -P hello-
     PID User     Command                         Swap      USS      PSS      RSS
   86213 razvan   ./work/hello-static-01             0      700      700      704
   86214 razvan   ./work/hello-static-02             0      700      700      704
   86216 razvan   ./work/hello-static-04             0      700      700      704
   86219 razvan   ./work/hello-static-07             0      700      700      704
   86220 razvan   ./work/hello-static-08             0      700      700      704
   86221 razvan   ./work/hello-static-09             0      700      700      704
   86215 razvan   ./work/hello-static-03             0      704      704      708
   86217 razvan   ./work/hello-static-05             0      704      704      708
   86218 razvan   ./work/hello-static-06             0      704      704      708
   86222 razvan   ./work/hello-static-10             0      704      704      708
   ```

   You can now see that almost all memory is unique to each process.
   They are processes born from different executables, there are no commonalities, so almost nothing is shared.

   Kill processes to get to the next scenario:

   ```console
   $ ./kill.sh
   ```

1. Run 10 processes from 10 different dynamic executables:

   ```console
   $ ./instantiate-multiple-dynamic.sh
   Hello, World! (01)!
   Hello, World! (03)!
   Hello, World! (02)!
   Hello, World! (06)!
   Hello, World! (07)!
   Hello, World! (08)!
   Hello, World! (09)!
   Hello, World! (04)!
   Hello, World! (05)!
   Hello, World! (10)!
   ```

   Now show values with `smem`:

   ```console
   $ smem -P hello-
     PID User     Command                         Swap      USS      PSS      RSS
   86433 razvan   ./work/hello-07                    0      108      118     1692
   86436 razvan   ./work/hello-10                    0      108      118     1648
   86428 razvan   ./work/hello-02                    0      112      121     1500
   86429 razvan   ./work/hello-03                    0      112      121     1572
   86431 razvan   ./work/hello-05                    0      112      121     1608
   86432 razvan   ./work/hello-06                    0      112      121     1648
   86427 razvan   ./work/hello-01                    0      112      122     1696
   86430 razvan   ./work/hello-04                    0      112      122     1696
   86434 razvan   ./work/hello-08                    0      112      122     1696
   86435 razvan   ./work/hello-09                    0      112      122     1696
   ```

   Compared to the same dynamic executable run, there is an increase in the USS.
   Because now each process is born from a different executable.
   Still, the differences are minor because, once again, dynamic executables are smaller, and most of the data is stored in shared libraries.

   Kill processes to end the demo:

   ```console
   $ ./kill.sh
   ```
