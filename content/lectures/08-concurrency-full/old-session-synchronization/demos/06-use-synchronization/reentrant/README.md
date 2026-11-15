# Reentrancy

Reentrancy is a property of a function that allows to be called irrespective of the context: single-threaded, multi-threaded, synchronous, asynchronous.
A non-reentrant function needs to be synchronized in order to behave correctly in a multi-threaded scenario.
A reentrant function behaves as expected.

This demo showcases reentrancy, by using the `ctime()` function and it's reentrant variant `ctime_r()`:

First build it:

```console
make
```

Then run the commands below:

```console
$ ./reentrant > bad

$ ./reentrant-ok > good

$ ls -lh bad good
-rw-rw-r-- 1 razvan razvan 4.7M Nov 18 11:42 bad
-rw-rw-r-- 1 razvan razvan 4.8M Nov 18 11:42 good
```

You can see the output of the non-reentrant variant (`bad`) is smaller in size than the correct variant.
This is because, without reentrancy, the shared libc buffer used by the `ctime` call was used simultaneously by multiple threads.
