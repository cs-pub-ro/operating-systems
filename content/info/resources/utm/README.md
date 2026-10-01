# UTM Guide (MacOS)

VirtualBox and VMware cannot emulate an x86 machine on an Apple Silicon (M-series) Mac.
[UTM](https://mac.getutm.app/) can: it is a graphical front end for QEMU, and runs the x86 virtual machine in emulation.

Emulation translates every x86 instruction for the ARM processor, so the virtual machine is noticeably slower than it would be on an x86 host.

## Prerequisites

Install UTM, either by downloading `UTM.dmg` from the [UTM website](https://mac.getutm.app/), opening it and dragging the app into the `Applications` folder.

UTM cannot import `.ova` files, so download the virtual machine as a disk image instead: [`VM-SO.qcow2`](https://repository.grid.pub.ro/cs/so/VM-SO.qcow2).
You will need to log in using your `UPB` account.
The image is large, so the download may take a while.

## Creating the VM

UTM has no "import a disk image" button, so you first create an empty virtual machine and then attach the image to it as its disk.

1. Open UTM and click **Create a New Virtual Machine**.
1. Select **Emulate**, not **Virtualize**: virtualization only runs ARM systems.
1. Select **Other** as the operating system.
1. Check **None** for the boot device: there is no installer to boot, since the image already holds an installed system.
1. On the hardware page, check that **Architecture** is `x86_64`, and give the machine at least 2 GB of RAM (4 GB is recommended) and at least 2 CPU cores.
1. Set the storage size to at least 20 GB.
   This creates an empty disk; the image is attached as a second one below.
1. Skip the shared directory page.
1. Give the virtual machine a name, such as `VM-SO`, and save it.

The virtual machine exists now, but it has nothing to boot from.
Edit it to attach the image:

1. Right-click the virtual machine in the sidebar and select **Edit**.
1. Go to **QEMU** and uncheck **UEFI Boot**.
   The image boots the traditional BIOS way, and does not start with UEFI enabled.
1. Go to **Drives**, select **New...**, click **Import** and choose the `VM-SO.qcow2` file you downloaded.
1. Right-click the newly added drive and select **Move Up**, until it is the first drive in the list.
   The machine boots from the first drive, and the empty disk from the wizard would otherwise come first.
1. Click **Save**.

## Running the VM

Select the virtual machine in the sidebar and press the play button.
The first boot is slow, and may take a couple of minutes before you see a login prompt.

## Tweaking the Settings

Everything set in the wizard can be changed later, from **Edit**, while the virtual machine is stopped.

**Memory and cores.**
Change them under **System**.
Use at least 2 GB and 2 cores, and leave at least as much for macOS itself.
More cores help less than you might expect: emulation is slow mostly because of the instruction translation, not for lack of cores.

**The empty disk.**
The disk created by the wizard is never used.
Once the virtual machine boots from the image, you can delete it under **Drives** to get its space back.

**It does not boot.**
If the virtual machine shows a UEFI shell or reports that there is no bootable device, check the two settings that matter: **UEFI Boot** is unchecked under **QEMU**, and the imported `VM-SO.qcow2` drive is the first one under **Drives**.
