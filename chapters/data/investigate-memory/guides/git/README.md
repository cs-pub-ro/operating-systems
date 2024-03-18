# App Investigation: Git

[Git](https://git-scm.com/) is among the most used source code management system, powering development infrastructures such as [GitHub](https://github.com/), [GitLab](https://about.gitlab.com/) and [Bitbucket](https://bitbucket.org/).

Navigate to the `chapters/data/investigate-memory/guides/git` directory.

Let's clone [the repository](https://github.com/git/git).
Note that it is about 200MB large:

```console
student@os:~/.../git$ git clone https://github.com/git/git
[...]

student@os:~/.../git$ cd git/
```

We look of uses of `malloc()`:

```console
student@os:~/.../git/git$ grep -r 'malloc(' .
```

We see there are multiple calls to the `xmalloc()` function, which is likely a wrapper for `malloc()`.
We search for the definition of `xmalloc()`:

```console
student@os:~/.../git/git$ grep -rn 'xmalloc(' . | grep -v ';'
./commit.c:188:                 graft = xmalloc(st_add(sizeof(*graft),
./add-interactive.c:157:        list->sorted.items = xmalloc(st_mult(sizeof(*list->sorted.items),
./Documentation/RelNotes/2.24.0.txt:91: * xmalloc() used to have a mechanism to ditch memory and address
./Documentation/RelNotes/2.24.0.txt:210:   xmalloc() wrapper, as the rest of the system, for consistency.
./Documentation/RelNotes/2.34.0.txt:230: * mmap() imitation used to call xmalloc() that dies upon malloc()
./Documentation/RelNotes/2.33.1.txt:44: * mmap() imitation used to call xmalloc() that dies upon malloc()
./diffcore-delta.c:56:  new_spanhash = xmalloc(st_add(sizeof(*orig),
./diffcore-delta.c:135: hash = xmalloc(st_add(sizeof(*hash),
./kwset.c:41:/* adapter for `xmalloc()`, which takes `size_t`, not `long` */
./builtin/fast-import.c:461:    b = xmalloc(sizeof(struct object_entry_pool)
./hashmap.h:311: * your structure was allocated with xmalloc(), you can just free(3) it,
./xdiff/xdiff.h:122:#define xdl_malloc(x) xmalloc(x)
./wrapper.c:45:static void *do_xmalloc(size_t size, int gentle)
./wrapper.c:70:void *xmalloc(size_t size)
./contrib/credential/wincred/git-credential-wincred.c:26:static void *xmalloc(size_t size)
Binary file ./.git/objects/pack/pack-c587b9f11a82bc4d49848d74132e60ea4dbeb177.pack matches
./git-compat-util.h:1046:# define xalloca(size)      (xmalloc(size))
./git-compat-util.h:1086:#define ALLOC_ARRAY(x, alloc) (x) = xmalloc(st_mult(sizeof(*(x)), (alloc)))
./read-cache.c:3768:    ieot = xmalloc(sizeof(struct index_entry_offset_table)
```

Line `./wrapper.c:70` is the one with the definition of the `xmalloc()` function.
It makes a call of the [`do_xmalloc()` function](https://github.com/git/git/blob/master/wrapper.c#L45), that makes extra checks.
Also, if the `XMALLOC_POISON` macro is defined, all the allocated data is overwritten with a "poison" value (`0xA5`).
This is useful for early detection of memory-related issues, although, evidently, it adds overhead.

We can look for parts of the source code with the largest number of uses of `xmalloc()`:

```console
student@os:~/.../git/git$ grep -rc 'xmalloc(' . | grep -v ':0' | sort -n -t ':' -k 20
[...]
./compat/mingw.c:6
./submodule-config.c:6
./merge-recursive.c:7
```

We can look into the [`merge-recursive.c` file](https://github.com/git/git/blob/master/merge-recursive.c) for uses of the `xmalloc()` function.

## Practice

Do the same actions as above for the `mmap()` and `xmmap()` function calls.

Note that these are not memory allocation calls, since a valid `fd` file argument is passed.
These are file mapping calls, that we will talk more as part of the I/O chapter.
