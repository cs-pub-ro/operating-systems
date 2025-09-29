# Resources and Useful Links

## Need to Know

List of resources:

- [GitHub Repository](https://github.com/cs-pub-ro/operating-systems)
- [Moodle Class](https://curs.upb.ro/) (used for homework submissions, quizzes, announcements, etc.)
- [Teams Class](TBA)
- [Rules and Grading](https://cs-pub-ro.github.io/operating-systems/rules-and-grading)
- [Books / Reading Materials](http://elf.cs.pub.ro/so/res/doc/) (you will need to log in using your `UPB` account)
- [OS Calendar](https://calendar.google.com/calendar/embed?src=9a0798c60c5a4a2dad36cde37ef6cbcfc001ccd2d4de2a74e6fa1861a679bbea%40group.calendar.google.com&ctz=Europe%2FBucharest)
- [OS Course Planning](https://docs.google.com/spreadsheets/d/e/2PACX-1vS33f7xCIyb61aR1MRjsgquc0Agg8wdaLUw6MrJua6PbX9ZM-MGavP0MkqiNveaAMeWhIWAuDBCEDeQ/pubhtml?gid=0&single=true)

## Documentation and Reading Materials

You can find the documentation for the operating systems course at [this address](http://elf.cs.pub.ro/so/res/doc/).
You will need to log in using the `UPB` institutional account.

## Calendar

You can find the full calendar in multiple formats below:

- Calendar ID: `9a0798c60c5a4a2dad36cde37ef6cbcfc001ccd2d4de2a74e6fa1861a679bbea@group.calendar.google.com`
- [XML](http://www.google.com/calendar/feeds/9a0798c60c5a4a2dad36cde37ef6cbcfc001ccd2d4de2a74e6fa1861a679bbea%40group.calendar.google.com/public/basic)
- [ICAL](https://calendar.google.com/calendar/ical/9a0798c60c5a4a2dad36cde37ef6cbcfc001ccd2d4de2a74e6fa1861a679bbea%40group.calendar.google.com/public/basic.ics)
- [HTML](https://calendar.google.com/calendar/embed?src=9a0798c60c5a4a2dad36cde37ef6cbcfc001ccd2d4de2a74e6fa1861a679bbea%40group.calendar.google.com&ctz=Europe%2FBucharest)

You can also find the course planning [here](https://docs.google.com/spreadsheets/d/e/2PACX-1vQ9eom_uRzu-a_lAZ6Yt2Slta5wpTm53b1ZaZlanEWBSBc69xGwKYK8wfImCS_LVhtWZ_4h3U9oVqpx/pubhtml?gid=0&single=true).

## Virtual Machine

You can use any Linux environment (native install, `WSL`, virtual machine, docker environment, etc.) for the OS class.
We provide Linux virtual machines with all the setup ready.

### VirtualBox / VMware

You can download the Linux virtual machine [here](https://repository.grid.pub.ro/cs/so/linux-2025-2026/VM-SO.ova). You will need to log in using your `UPB` account.

You can import the `.ova` file in [VirtualBox](https://www.virtualbox.org/) or [VMware](https://www.vmware.com/).
Follow the instructions on the official websites for installation.

### UTM (macOS >= 11 users)

If you are using an `M1` Apple system, you will not be able to run the virtual machine using VirtualBox or VMware.
You will need to use [`UTM`](https://mac.getutm.app/), along with a [`.qcow2`](https://repository.grid.pub.ro/cs/so/linux-2025-2026/VM-SO.qcow2) image.
You will need to log in using your `UPB` account.

After you install `UTM` and download the `.qcow2` image, you should use it via emulation. Please, follow the instructions provided [here](https://ocw.cs.pub.ro/courses/pclp2/utile).

You can also follow the instructions for [running the VM using `qemu`](https://github.com/cs-pub-ro/operating-systems/blob/main/util/macos-vm/README.md).
