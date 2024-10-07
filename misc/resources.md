# Resources and Useful Links

## Need to Know

List of resources:

- [GitHub Repository](https://github.com/cs-pub-ro/operating-systems)
- [Moodle Class](https://curs.upb.ro/2024/course/view.php?id=2665) (used for homework submissions, quizzes, announcements, etc.)
- [Teams Class](https://teams.microsoft.com/l/team/19%3AOL84NjHQxdxL9n7RmphK8rKr0vUVcuea_r08OsoWKQQ1%40thread.tacv2/conversations?groupId=b37b5353-4791-449b-95e0-ab59c39326af&tenantId=2d8cc8ba-8dda-4334-9e5c-fac2092e9bac)
- [Rules and Grading](https://cs-pub-ro.github.io/operating-systems/rules-and-grading)
- [Books / Reading Materials](http://elf.cs.pub.ro/so/res/doc/) (you will need to log in using your `UPB` account)
- [OS Calendar](https://calendar.google.com/calendar/embed?src=9a0798c60c5a4a2dad36cde37ef6cbcfc001ccd2d4de2a74e6fa1861a679bbea%40group.calendar.google.com&ctz=Europe%2FBucharest)
- [OS Course Planning](https://docs.google.com/spreadsheets/d/e/2PACX-1vQ9eom_uRzu-a_lAZ6Yt2Slta5wpTm53b1ZaZlanEWBSBc69xGwKYK8wfImCS_LVhtWZ_4h3U9oVqpx/pubhtml?gid=0&single=true)

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

You can download the Linux virtual machine with **NO** GUI [here](https://repository.grid.pub.ro/cs/so/linux-2024-2025/so-vm-2024.ova) and **WITH** GUI [here](https://repository.grid.pub.ro/cs/so/linux-2024-2025/so-vm-gui-2024.ova). You will need to log in using your `UPB` account.

You can import the `.ova` file in [VirtualBox](https://www.virtualbox.org/) or [VMware](https://www.vmware.com/).
Follow the instructions on the official websites for installation.

### UTM (macOS >= 11 users)

If you are using an `M1` Apple system, you will not be able to run the virtual machine using VirtualBox or VMware.
You will need to use [`UTM`](https://mac.getutm.app/), along with a [`.qcow2`](https://repository.grid.pub.ro/cs/so/linux-2024/SO-Ubuntu-22-04-03-LTS.utm.zip) image.
You will need to log in using your `UPB` account.

After you install `UTM` and download and unzip the archive, you can import it using the `Open existing VM` option in `UTM`.

You can also follow the instructions for [running the VM using `qemu`](https://github.com/cs-pub-ro/operating-systems/blob/main/util/macos-vm/README.md).
