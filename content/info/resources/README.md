# Resources

## Quick Links

List of resources:

- [GitHub Repository](https://github.com/cs-pub-ro/operating-systems)
- [Moodle Class](https://curs.upb.ro/2026/course/view.php?id=1898) (used for homework submissions, quizzes, announcements, etc.)
- [Rules and Grading](../rules-and-grading/)
- [Books / Reading Materials](https://elf.cs.pub.ro/so/res/doc/)
- [OS Calendar](https://calendar.google.com/calendar/embed?src=6c59106f86b728ac4991ab289247cf890a1352ea5f1b37b96e04b8385bd80be8%40group.calendar.google.com&ctz=Europe%2FBucharest)
- [OS Lab Schedule](https://docs.google.com/spreadsheets/d/e/2PACX-1vSSb0C7S-d57hEpCVEYF4dPvI_4JzP8VAPne7AM-7gvFy4MbrPTLZoBMFTs_FHPgePb0WGrseqOYnwJ/pubhtml?gid=2068102211&single=true)
- [OS Course Planning](https://docs.google.com/spreadsheets/d/12htCk2jMCnC2o19hEv_Cm00N4uu19_ASkQFCx9f-eA0/edit)

## Reading Materials

You can find the documentation for the operating systems course at [this address](https://elf.cs.pub.ro/so/res/doc/).
You will need to log in using the `UPB` institutional account.

## Virtual Machine

You can use any Linux environment (native install, `WSL`, virtual machine, docker environment, etc.) for the OS class.

We provide Linux virtual machines with all the setup ready:

* [`VM-SO.ova`](https://repository.grid.pub.ro/cs/so/VM-SO.ova), for x86 machines, to import in VirtualBox or VMware
* [`VM-SO-ARM.ova`](https://repository.grid.pub.ro/cs/so/VM-SO-ARM.ova), for ARM machines, to import in VirtualBox or VMware
* [`VM-SO.qcow2`](https://repository.grid.pub.ro/cs/so/VM-SO.qcow2), the x86 machine as a disk image, to run emulated on ARM machines (Apple Silicon Macs) with UTM or QEMU. This is needed for assignments or labs that require x86 system calls, since ARM machines cannot run x86 binaries natively.

All three downloads need your `UPB` account.

## VirtualBox / VMware (Linux, Windows, MacOS)

You can download the Linux virtual machine for either the [x86 architecture](https://repository.grid.pub.ro/cs/so/VM-SO.ova) or the [for ARM architecture](https://repository.grid.pub.ro/cs/so/VM-SO-ARM.ova). You will need to log in using your `UPB` account.

You can import the `.ova` file in [VirtualBox](https://www.virtualbox.org/) or [VMware](https://www.vmware.com/).
Follow the instructions on the official websites for installation.

## UTM (MacOS)

On an Apple Silicon Mac, run the x86 virtual machine with [UTM](https://mac.getutm.app/) and the [`VM-SO.qcow2`](https://repository.grid.pub.ro/cs/so/VM-SO.qcow2) image.
UTM runs it in emulation, translating every x86 instruction for the ARM processor, so expect it to be noticeably slower than a native virtual machine.
The [UTM guide](utm/README.md) walks you through creating the virtual machine and starting it.

## QEMU (MacOS)

If you prefer the command line, you can run the same image with QEMU instead, by following the [QEMU guide](qemu/README.md).
