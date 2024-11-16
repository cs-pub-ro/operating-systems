# Create a New Disk by Hand

Let's replicate the above-mentioned steps and create a new disk ourselves.

First, we have to call the 2 scripts from the `create_disk_from_template` function:

```console
student@os:~/.../support$ ./disk-templates/ubuntu_22.04/create_disk_from_template.sh ./disk-templates/ubuntu_22.04/ubuntu_22.04.qcow2 my-disk.qcow2 10737418240
Image resized.

student@os:~/.../support$ ls -lh my-disk.qcow2
-rw-r--r-- 1 student student 619M Nov 20 15:41 my-disk.qcow2

student@os:~/.../support$ sudo ./disk-templates/ubuntu_22.04/setup_root_password.sh my-disk.qcow2 123456
```

Now we can start a qemu instance using this disk:

```console
student@os:~/.../support$ qemu-system-x86_64 -enable-kvm -m 2G -hda my-disk.qcow2 -nographic
...
Ubuntu 22.04 LTS ubuntu ttyS0

ubuntu login: root
Password:
...
root@ubuntu:~#
```

Here we can further run customization commands, like the ones in the `ubuntu_22_04_vm_prepare` function, or any other things that we want.

When we're done, we run the `halt` command:

```console
root@ubuntu:~# halt
root@ubuntu:~#          Stopping Session 1 of User root...
[  OK  ] Removed slice Slice /system/modprobe.
[  OK  ] Stopped target Graphical Interface.
...
         Starting System Halt...
[   86.431398] reboot: System halted
```

When the `System halted` message is printed, press `CTRL+A X` to exit qemu (that is, press `CTRL+A`, release `CTRL` and `A`, press `X`).

# Implement `vm_stop`

The `vm_stop` command will stop a particular virtual machine, meaning it will stop the qemu process for that vm.
The implementation starts in `api_vm_stop` in `app.py`, which is the function that handles the `http` request for the stop operation.
Here you need to do the following:

- extract the virtual machine `id` from the request

- use the `vm.vm_get` function to convert this ID into a `VM` structure

- call `vm.vm_stop` and pass the `VM` object to it

In `vm.vm_stop`:

- call `stop_qemu_for_vm`

- change the vm pid in the database to `-1`

- change the vm state in the database to `VM_STATE_STOPPED`

After modifying the code, you should run `docker-compose up --build` again.
Also, if your database became inconsistent, you can clean it up by re-running the `setup_db.sh` script.
Then delete all vm disks with `sudo rm -rf vm-disks/*`.

With `vm_stop` implemented, the system should work like this:

```console
student@os:~/.../support$ curl -s localhost:5000/vm_list | jq .
[
  {
    "id": 1,
    "name": "my_vm"
  }
]
student@os:~/.../support$ curl -H "Content-Type: application/json" -d '{ "id": 1}' localhost:5000/vm_scurl -s -H "Content-Type: application/json" -d '{ "id": 1 }' localhost:5000/vm_info | jq .
{
  "disk_size": 10737418240,
  "id": 1,
  "ip": "192.168.0.2",
  "mem_size": 2147483648,
  "name": "my_vm",
  "network": "default",
  "os": "ubuntu_22.04",
  "state": "RUNNING"
}
```

The vm is in the `RUNNING` state.
Now let's stop it:

```console
student@os:~/.../support$ curl -H "Content-Type: application/json" -d '{ "id": 1}' localhost:5000/vm_stop
{"status":"ok"}
student@os:~/.../support$ curl -s -H "Content-Type: application/json" -d '{ "id": 1 }' localhost:5000/vm_info | jq .
{
  "disk_size": 10737418240,
  "id": 1,
  "ip": "192.168.0.2",
  "mem_size": 2147483648,
  "name": "my_vm",
  "network": "default",
  "os": "ubuntu_22.04",
  "state": "STOPPED"
}
```

Now the state is `STOPPED`.
Inside the container, the qemu process should be gone as well:

```console
student@os:~/.../support$ docker-compose exec os-cloud bash
root@b0600eff8903:/app# ps -ef
UID          PID    PPID  C STIME TTY          TIME CMD
root           1       0  0 10:00 ?        00:00:00 /sbin/docker-init -- python3 -u app.py
root           7       1  0 10:00 ?        00:00:00 python3 -u app.py
root          33       0  0 10:00 pts/3    00:00:00 bash
root          41      33  0 10:00 pts/3    00:00:00 ps -ef
```

Finally, the vm can be started again using `vm_start`:

```console
student@os:~/.../support$ curl -H "Content-Type: application/json" -d '{ "id": 1}' localhost:5000/vm_start
{"status":"ok"}
```
