# Bonus - SO Fair

## Objectives

* Learn how to find your way around a real-world open source code base
* Connect operating systems concepts from the class (system calls, memory, processes, threads, I/O, IPC) to code used in production
* Gain experience with the contribution workflow of an open source project: issues, forks, patches, code review

## Statement

This is a **bonus** assignment meant to allow you to do something different, explore new projects, be curious, and do open-source contributions.

You can either pick one of the projects listed in the [Projects](#projects) section and contribute to one of their issue or you can come up with another open source project that you are keen to contribute to.

Before getting to work, post your proposal on the [Moodle Forum dedicated to SO-Fair](https://curs.upb.ro/2026/mod/forum/view.php?id=57679) and get the approval of the assistants. The contribution has to be complex enough and it has to be related to the operating systems concepts covered in the class.

## Workflow

1. Pick an issue from the [proposed projects below](#projects) or propose another open-source project,
1. Create a thread on the [Moodle Forum - SO Fair](https://curs.upb.ro/2026/mod/forum/view.php?id=57679) until **15 November**.
1. Wait for approval from one of the assistants from the team. The team will get back to you up to **27 November**.
1. Get to work - you should fork the project, start to work on the contribution, create commits, create PRs.
1. Post the progress of your work in the Moodle thread you created. Ideally, this post would be a small description with commits and/or PRs attached. The assistants should be able to track and review your work incrementally, week by week.
1. Ideally, your contribution should be merged upstream, but we understand that sometimes this can take some time on the maintainers side. Have a working contribution by **16 January**.
1. Be ready to show and brag about your work on **16 January**. We will gather with the other students and the SO-Fair team to show your work and share thoughts on the experience together. This is also when you'll get graded.


!!! tip "Being stuck"
    Being stuck can happen and it's part of the process.
    Reach out to the SO-Fair team and tell us your issue.
    We will help to get unstuck and continue your work.


## Rules

* The contribution you work on has to be quite complex. Get the approval of the assistants before getting to work.
* To get the points for this assignment, the assistants should be able to track your progress during the semester, hence post periodic updates on your work on the Moodle thread.
* Ideally, your PR should be merged upstream, that can take some time on certain projects. A **working** contribution or demo will do.
* Follow the contribution guidelines of the project you chose (coding style, commit message format, tests). Show us that you tested all of these and your code is in pristine form.
* Do not submit AI-generated code that you do not understand. We will know. You have to be able to explain every line of the code.
* Each student should work on a different issue/contribution. We don't accept duplicated proposals.

## Projects

Below is a list of projects, each with a few open issues that you can choose to start working on.

These projects are only some suggestions we found. If you find a different project you want to work on, you are welcome to propose it.
It should be open-source and operating-systems related.

| Project | Language | Description | Repository |
| --- | --- | --- | --- |
| AQUA | C, Java | High performance communication cross-platform middleware | <https://github.com/ionut-mihalache/aqua> |
| GOLD | Python | Framework for managing common code patterns | <https://github.com/ionut-mihalache/gold>
| Unikraft (GSoC) | C | Unikernel | <https://github.com/unikraft/unikraft> |
| gVisor | Go | Application kernel in user space | <https://github.com/google/gvisor> |
| Asterinas | Rust | Linux-compatible kernel | <https://github.com/asterinas/asterinas> |
| strace | C | Syscall tracer | <https://github.com/strace/strace> |
| htop | C | Process viewer | <https://github.com/htop-dev/htop> |
| uutils/coreutils | Rust | Coreutils rewrite | <https://github.com/uutils/coreutils> |
| youki | Rust | Container runtime | <https://github.com/youki-dev/youki> |
| nushell | Rust | Structured-data shell | <https://github.com/nushell/nushell> |
| NetBSD (GSoC) | C | BSD operating system | <https://github.com/NetBSD/src> |
| CRIU (GSoC) | C, Go | Process checkpoint/restore | <https://github.com/checkpoint-restore/criu> |
| EROFS (GSoC) | C, Rust | Read-only file system | <https://github.com/erofs/erofs-utils> |
| KolibriOS (GSoC) | C, Rust | Small hobby OS | <https://git.kolibrios.org/KolibriOS/kolibrios> |
| QEMU (GSoC) | C, Rust | Emulator and virtualizer | <https://gitlab.com/qemu-project/qemu> |
| FreeBSD (GSoC) | C | BSD operating system | <https://github.com/freebsd/freebsd-src> |

## Moodle Forum

!!! note
    The Moodle Forum for [SO-Fair is available here](https://curs.upb.ro/2026/mod/forum/view.php?id=57679).

Use the Moodle Forum for the following:
* Propose the issues/contribution you want to work on
* Get your contribution approved
* Get help, ask questions if you are stuck
* Post periodical updates on your work.

Below is an example of a weekly update:

```
Week 1 update: fixing `kill()` with signal 0 in the project's POSIX layer.

This week I reproduced the bug and wrote a first patch.
Calling `kill(pid, 0)` crashes the kernel instead of only checking whether the process exists.
I reduced it to a 5-line test program and confirmed it also fails on a clean build of the latest `main`.
The cause is that the signal number is used as an index into the handler table before it is validated.

I also looked at a second, related issue (#456): `kill()` on a process that is already a zombie.
The fix touches the generic process-lookup code, not just the signal path, so I did not push it.

Status:

* Opened: pull request #123 with the fix and a regression test

Next week: start on the zombie case.
```

## Submission

!!! note
    The Moodle Assignment URL will be here soon.

Before the final due date you should submit a write-up on Moodle.
Provide the following information in it:
* What problem you solved?
* Attach links to PRs and/or commits
* Write a small description of the changes you made
* Which operating systems concepts were involved?
* What have you learned?
* What did you found difficult?

## Resources

!!! note
    The list of resources will be updated regularly to provide tutorials on various things you might need.

* [How to Contribute to Open Source](https://opensource.guide/how-to-contribute/)
* [GitHub: About pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)
