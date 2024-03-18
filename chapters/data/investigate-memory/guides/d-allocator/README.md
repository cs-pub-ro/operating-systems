# Investigation: Allocator in the D Programming Language

[Phobos](https://github.com/dlang/phobos) is the standard library that comes with the D programming language compiler.

Let's clone the source code:

```console
student@os:~/.../d-allocator$ git clone https://github.com/dlang/phobos
[...]

student@os:~/.../d-allocator$ cd phobos/

student@os:~/.../d-allocator/phobos$ ls
azure-pipelines.yml  changelog  CODEOWNERS  CONTRIBUTING.md  dub.sdl  etc  index.dd  LICENSE_1_0.txt  posix.mak  project.ddoc  README.md  std  test  unittest.d  win32.mak  win64.mak
```

And enter `std/experimental/allocator/` to browse information about the allocator:

```console
student@os:~/.../d-allocator/phobos$ cd std/experimental/allocator/

student@os:~/.../std/experimental/allocator$ ls
building_blocks  common.d  gc_allocator.d  mallocator.d  mmap_allocator.d  package.d  showcase.d  typed.d
```

We then do a search of the `allocate(` string to find instances of allocation calls:

```console
student@os:~/.../std/experimental/allocator$ grep -r 'allocate('
[...]
```

We see that there are definitions of the function (as expected) as part of `...allocator` files: `mallocator.d`, `gc_allocator.d`, `mmap_allocator.d`.
Browse the functions and look for implementations of the `allocate()` function.

## Practice

Do a similar search and then source code browsing for the `deallocate()` function.
