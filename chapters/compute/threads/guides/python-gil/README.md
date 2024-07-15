# The GIL

Throughout this lab, you might have noticed that there were no thread exercises _in Python_.
If you did, you probably wondered why.
It's not because Python does not support threads, because it does, but because of a mechanism called the **Global Interpreter Lock**, or GIL.
As its name suggests, this is a lock implemented inside most commonly used Python interpreter (CPython), which only allows **one** thread to run at a given time.
As a consequence, multithreaded programs written in Python run **concurrently**, not in parallel.
For this reason, you will see no speedup even when you run an embarrassingly parallel code in parallel.

However, keep in mind that this drawback does not make threads useless in Python.
They are still useful and widely used when a process needs to perform many IO-bound tasks (i.e.: tasks that involve many file reads / writes or network requests).
Such tasks run many blocking syscalls that require the thread to switch from the RUNNING state to WAITING.
Doing so voluntarily makes threads viable because they rarely run for their entire time slice and spend most of the time waiting for data.
So it doesn't hurt them to run concurrently, instead of in parallel.

Do not make the confusion to believe threads in Python are [user-level threads](../../scheduling/reading/scheduling.md#user-level-vs-kernel-level-threads).
[`threading.Thread`](https://docs.python.org/3/library/threading.html#threading.Thread)s are kernel-level threads.
It's just that they are forced to run concurrently by the GIL.

## But Why?

Unlike Bigfoot, or the Loch Ness monster, we have proof that the GIL is real.
At first glance, this seems like a huge disadvantage.
Why force threads to run sequentially?
The answer has to do with memory management.
In the [Data chapter](../../../data), you learned that one way of managing memory is via _garbage collection_ (GC).
In Python, the GC uses reference counting, i.e. each object also stores the number of live pointers to it (variables that reference it).
You can see that this number needs to be modified atomically by the interpreter to avoid race conditions.
This involves adding locks to **all** Python data structures.
This large number of locks doesn't scale for a language as large and open as Python.
In addition, it also introduces the risk of _deadlocks_.
You can read more on this topic [in this article](https://realpython.com/python-gil/) and if you think eliminating the GIL looks like an easy task, which should have been done long ago, check the requirements [here](https://wiki.python.org/moin/GlobalInterpreterLock).
They're not trivial to meet.

Single-threaded-ness is a common trope for interpreted languages to use some sort of GIL.
[Ruby MRI, the reference Ruby interpreter](https://git.ruby-lang.org/ruby.git), uses a similar mechanism, called the [Global VM Lock](https://ivoanjo.me/blog/2022/07/17/tracing-ruby-global-vm-lock/).
JavaScript is even more straightforward: it is single-threaded by design, also for GC-related reasons.
It does, however, support asynchronous actions, but these are executed on the same thread as every other code.
This is implemented by placing each instruction on a [call stack](https://medium.com/swlh/what-does-it-mean-by-javascript-is-single-threaded-language-f4130645d8a9).
