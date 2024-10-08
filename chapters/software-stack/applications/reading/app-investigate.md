# App Investigation

Let's spend some time investigating actual applications residing on the local system.
For now, we know that applications are developed using high-level languages and then compiled or interpreted to use the lower-layer interfaces of the software stack, such as the system call API.

Let's enter the `chapters/software-stack/applications/drills/tasks/app-investigation/support/` folder and run the `get_app_types.sh` script:

```console
student@os:~/.../app-investigation/support/$ ./get_app_types.sh
binary apps: 2223
Perl apps: 256
Shell apps: 454
Python apps: 123
Other apps: 27
```

The script prints the types of the application executables in the system.
The output will differ between systems, given each has particular types of applications installed.

We list them by running the command inside the `get_app_types.sh` script:

```console
student@os:~/.../app-investigation/support/$ find /usr/bin /bin /usr/sbin /sbin -type f -exec file {} \;
[...]
/usr/bin/qpdldecode: ELF 64-bit LSB shared object, x86-64 [...]
/usr/bin/mimeopen: Perl script text executable
[...]
```

As above, the output will differ between systems.

So, depending on the developers' choice, applications may be:

- compiled into executables, from compiled languages such as C, C++, Go, Rust, D
- developed as scripts, from interpreted languages such as Python, Perl, JavaScript
