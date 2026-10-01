# QEMU Guide (MacOS)

## Prerequisites

Make sure `qemu` is installed on your system:

```console
brew install qemu
```

## Running the VM

First, download the `VM-SO.qcow2` image from the [faculty's image repository](https://repository.grid.pub.ro/cs/so/).
This may take some time because the image is large, so please be patient.

Then, run the following command in the terminal, from the directory where you downloaded the image:

```console
sudo qemu-system-x86_64 -hda "./VM-SO.qcow2" \
-boot d -m 2G -usb -machine q35 -cpu max -smp cores=2,threads=1,sockets=1 \
-nic vmnet-bridged,ifname=en0 &
```

`qemu-system-x86_64` emulates a whole x86-64 PC, and each option describes a part of it:

| Argument | What it does |
| --- | --- |
| `-hda "./VM-SO.qcow2"` | Uses the image as the machine's hard disk. |
| `-boot d` | Sets the boot order; the machine falls back to the hard disk, since it has no CD-ROM. |
| `-m 2G` | Gives the machine 2 GB of RAM. |
| `-usb` | Adds a USB controller. |
| `-machine q35` | Emulates a modern PC chipset. |
| `-cpu max` | Exposes every CPU feature the emulator supports. |
| `-smp cores=2,threads=1,sockets=1` | Gives the machine one processor with 2 cores. |
| `-nic vmnet-bridged,ifname=en0` | Connects the machine to your network through the host interface `en0`. |

The trailing `&` runs QEMU in the background, so you get the terminal back while the VM window is open.

## Tweaking the VM

Three values depend on your machine, and are the ones you may need to change.

**The image path.**
If you run the command from another directory, replace `./VM-SO.qcow2` with the full path to the image, for example `~/Downloads/VM-SO.qcow2`.

**Memory and cores.**
Change the number in `-m` for the RAM, and the `cores=` value in `-smp` for the number of cores.
Use at least 2 GB and 2 cores.

**The network interface.**
`ifname=en0` must name the interface your Mac uses to reach the internet.
List the interfaces with:

```console
networksetup -listallhardwareports
```

Pick the `Device` of the port you are connected through: the Wi-Fi one if you are on Wi-Fi, the Ethernet one if you use a cable.
On a Mac connected to Wi-Fi, the output may look like this:

```text
Hardware Port: Ethernet Adapter (en6)
Device: en6
Ethernet Address: b6:e0:14:1e:65:8e

Hardware Port: Thunderbolt Bridge
Device: bridge0
Ethernet Address: 36:a1:9b:9f:e8:80

Hardware Port: Wi-Fi
Device: en0
Ethernet Address: bc:d0:74:ad:8a:b1
```

Here the Wi-Fi port is `en0`, so the option stays `ifname=en0`.
If you switch between Wi-Fi and a cable, change it to match before starting the VM.
