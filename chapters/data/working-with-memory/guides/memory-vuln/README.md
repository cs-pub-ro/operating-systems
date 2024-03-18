# Memory Vulnerabilities

The purpose of this exercise is to provide examples on how memory corruption may occur and what are the safety guards implemented by different programming languages.

Navigate to the `guides/memory-vuln/support/` directory.
It features 3 files, each showcasing what happens in case of actions that may lead to memory corruption.

## C

The C implementation showcases some of the design flaws of the language can lead to memory corruption.

The first example demonstrates how a pointer to an expired stack frame may be leaked to an outer scope.
The C language does not implement any guards against such behavior, although data flow analysis could be used to detect such cases.

The second example highlights the fact that C does not check any bounds when performing array operations.
This leads to all sorts of undefined behavior.
In this scenario, some random memory is overwritten with `5`.
The third example exhibits a manifestation of the previous design flaw, where the return address of the `main` function is overwritten with `0`, thus leading to a segmentation fault.

Although today it seems obvious that such behavior should not be accepted, we should take into account that the context in which the C language was created was entirely different from today.
At that time the resource constraints - DRAM memory was around a few KB, operating systems were in their infancy, branch predictors did not exist etc. - were overwhelming.
Moreover, security was not a concern because the internet basically did not exist.
As a consequence, the language was not developed with memory safety in mind.

## Python

Technically, it is not possible to do any memory corruption in Python (that is, if you avoid calling C functions from it).
Pointers do not formally exist, and any kind of array access is checked to be within its bounds.
The example simply showcases what happens when an out-of-bounds access is performed - an `IndexError` is thrown and execution halts.

## D

The D implementation uses almost the same code as the C implementation, but suffers from minor syntax modifications.
In essence, the two implement the same logic.
When compiling this code, it can be observed that the D compiler notices at compile time that an out-of-bounds access is performed.
This makes sense, since a static array cannot modify its length and therefore the compiler has all the information to spot the mistake.
The only way to make the code compile is to comment the faulting lines or to replace the out-of-bounds index with a correct one.
After doing so, the program compiles and we can see that memory corruption occurs.
However, D also has safety checks, however, these are not performed by default.
To enable such checks, the user must annotate a function with the `@safe` keyword:

```d
int* bad() @safe
```

By doing so, the mechanical checks are enabled and a new set of criteria needs to be followed for the code to be accepted.
Taking the address of a local, doing pointer arithmetic, reinterpret casts, calling non-`@safe` functions etc. are not allowed in `@safe` code.
If any of these unsafe features are manually proven to be safe, the `@trusted` keyword may be used to disable the checks but still consider the code `@safe`.
This is to allow writing system code, which by its nature is unsafe.
