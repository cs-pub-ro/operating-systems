# Demo: Build Hello, World with Unikraft

A unikernel is an operating system compiled down to one application and nothing else -- the smallest an OS can be.
Build one that prints a single line, and measure it.

## Run

Install the [package requirements](https://github.com/unikraft/catalog-core?tab=readme-ov-file#requirements) first.
This takes minutes, so build it before the lecture.

```console
cd ../../../../02-os-types-interface-full/demos/01-make-os/unikraft
./do-all-unikraft-helloworld.sh
```

Then look at the image:

```console
cd catalog-core/c-hello
ls -lh workdir/build/c-hello_qemu-x86_64
nm workdir/build/c-hello_qemu-x86_64.dbg | wc -l
```

## Ask

* The application is one `printf`. Why is the image 240 KB with 800 symbols?
* This OS supports exactly one program. What did a general kernel like Linux carry that this one dropped?
* If there is only one application and it is trusted, what is the user/kernel boundary still for?
