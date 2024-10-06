# Containers vs VMs

Containers are a lightweight virtualization technology that allows multiple isolated user-space instances to run on a single host operating system.
They are often compared to [`chroot`](https://linux.die.net/man/1/chroot) because they both provide isolated environments for running applications.

Cgroups limit, account for, and isolate the resource usage (CPU, memory, disk I/O, network, etc.) of a collection of processes.
They can be used to enforce resource limits, prioritization, accounting, and control.
Namespaces isolate processes from each other by creating independent views of system resources.
There are different types of namespaces, such as user, PID, network, mount, IPC, and UTS.
You can read more about them [here](https://www.nginx.com/blog/what-are-namespaces-cgroups-how-do-they-work/), [here](https://www.baeldung.com/linux/cgroups-and-namespaces) and a particularly good read about namespaces can be found [here](https://blog.quarkslab.com/digging-into-linux-namespaces-part-1.html)

[Quiz](../drills/questions/cgroups-vs-namespaces.md)

However, containers take this isolation a step further by using kernel features such as namespaces and cgroups to provide a more complete and secure isolation of resources.

Virtual machines, on the other hand, are a heavier form of virtualization that involves running a complete guest operating system on top of a host operating system using a hypervisor.
This allows multiple guest operating systems to run on a single physical machine, each with its own set of virtualized hardware resources.

![VMs vs Containers](../media/containers-vs-vms.svg)

One key difference between containers and VMs is the level of abstraction.
Containers virtualize the operating system, allowing multiple containers to share the same kernel while providing the illusion of running on separate machines.
VMs virtualize the hardware, allowing multiple guest operating systems to run on the same physical machine while providing the illusion of running on separate physical hardware.

Another difference is the resource overhead.
Containers are generally more lightweight than VMs because they share the host kernel and do not require a separate guest operating system to be installed.
This means that containers can start up faster and use less memory than VMs.

[Quiz](../drills/questions/container-vs-vm.md)

## Containers

Our app will make use of `docker` containers.
A container is an OS-level virtualization method in which a group of userspace processes are isolated from the rest of the system.

Take for example a database server.
Instead of running it directly on the host system, we'll run it in its own container.
This way, the server process will be isolated from other processes on the system.
It will also have its own filesystem.

Besides isolation, containers are also useful for portability.
Since a container comes with its own filesystem image, we can pack it together will all the dependencies, so that the app will run correctly no matter what packages are installed on the host system.

Finally, since our application will consist of more than 1 container, we'll also use `docker-compose`, which is a tool that helps us with running multi-container applications.
