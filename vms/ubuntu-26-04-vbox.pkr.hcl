variable "vm_name" {
  type    = string
  default = "so"
}

variable "cpus" {
  type    = number
  default = 2
}

variable "memsize" {
  type    = number
  default = 4096
}

variable "disk_size" {
  type    = number
  default = 50000
}

variable "disk_format" {
  type    = string
  default = "ova"
}

variable "username" {
  type    = string
  default = "student"
}

variable "password" {
  type    = string
  default = "student"
}

variable "headless" {
  type    = bool
  default = false
}

variable "img_name" {
  type    = string
  default = "SO"
}

variable "arch" {
  type    = string
  default = "amd64"

  validation {
    condition     = contains(["amd64", "arm64"], var.arch)
    error_message = "The arch must be amd64 or arm64."
  }
}

variable "checksum_directory" {
  type    = string
  default = "checksums"
}

# What differs between the two architectures. An arm64 VM only exists on the
# virtual ARMv8 chipset, which boots through EFI and has no IDE controller, so
# the disk and the DVD sit on VirtIO.
locals {
  platform = {
    amd64 = {
      iso_url              = "https://releases.ubuntu.com/resolute/ubuntu-26.04.1-desktop-amd64.iso"
      iso_checksum         = "sha256:601e30fbf5d97759367c632e2c33630665039b7e2158fd068403da3ccf1bda1f"
      guest_os_type        = "Ubuntu_64"
      chipset              = "piix3"
      firmware             = "bios"
      hard_drive_interface = "ide"
      iso_interface        = "ide"
      nic_type             = "82540EM"
    }
    arm64 = {
      iso_url              = "https://cdimage.ubuntu.com/ubuntu/releases/resolute/release/ubuntu-26.04.1-desktop-arm64.iso"
      iso_checksum         = "sha256:c54d196489d3c867975fb3bbb72ca52ec2e137456e305481f81096304e4d2517"
      guest_os_type        = "Ubuntu_arm64"
      chipset              = "armv8virtual"
      firmware             = "efi"
      hard_drive_interface = "virtio"
      iso_interface        = "virtio"
      nic_type             = "virtio"
    }
  }
  p = local.platform[var.arch]
}

packer {
  required_plugins {
    virtualbox = {
      version = ">= 1.1.4"
      source  = "github.com/hashicorp/virtualbox"
    }
    ansible = {
      version = "~> 1"
      source = "github.com/hashicorp/ansible"
    }
  }
}

source "virtualbox-iso" "ubuntu-26-04" {
  guest_os_type        = local.p.guest_os_type
  iso_url              = local.p.iso_url
  iso_checksum         = local.p.iso_checksum
  chipset              = local.p.chipset
  firmware             = local.p.firmware
  hard_drive_interface = local.p.hard_drive_interface
  iso_interface        = local.p.iso_interface
  ssh_username  = var.username
  ssh_password  = var.password
  ssh_timeout   = "180m"
   http_content = {
     "/user-data" = templatefile("scripts/autoinst/ubuntu-autoinstall.yml", {
       user = {
         username = var.username
         password = bcrypt(var.password)
       }
       hostname = var.vm_name
     }),
     "/meta-data" = ""
   }
  shutdown_command     = "rm -rf ~/.ansible && echo '${var.password}' | sudo -S poweroff"
  disk_size            = var.disk_size
  vm_name              = "${var.img_name}-${var.arch}"
  format               = var.disk_format
  cpus                 = var.cpus
  memory               = var.memsize
  headless             = var.headless
  output_directory     = "output-${var.arch}"

  vboxmanage = [
    ["modifyvm", "{{ .Name }}", "--boot1", "disk"],
    ["modifyvm", "{{ .Name }}", "--usb", "off"],
    ["modifyvm", "{{ .Name }}", "--vram", "128"],
    ["modifyvm", "{{ .Name }}", "--nic1", "nat"],
    ["modifyvm", "{{ .Name }}", "--nictype1", local.p.nic_type],
  ]

  boot_command = [
    "c<wait>",
    "linux /casper/vmlinuz autoinstall ds=nocloud-net\\;s=http://{{ .HTTPIP }}:{{ .HTTPPort }}/ net.ifnames=0 ---<enter><wait>",
    "initrd /casper/initrd<enter><wait>",
    "boot<enter>"
  ]
  boot_wait = "10s"
}

build {
  sources = ["sources.virtualbox-iso.ubuntu-26-04"]

  provisioner "ansible" {
    playbook_file    = "scripts/ansible/ubuntu.yml"
    user             = var.username
    use_proxy        = false
    # Ubuntu's default sudo is sudo-rs, whose password prompt Ansible does not
    # recognise; become through the original sudo, installed as sudo.ws.
    extra_arguments  = [
      "--extra-vars", "ansible_password='${var.password}' ansible_become_pass='${var.password}' ansible_become_exe=sudo.ws",
    ]
  }

  post-processor "shell-local" {
    inline = ["rm -f ${var.checksum_directory}/${var.img_name}-${var.arch}.*"]
  }

  post-processor "checksum" {
    checksum_types = ["sha256", "sha512"]
    output = "${var.checksum_directory}/${var.img_name}-${var.arch}.{{.ChecksumType}}"
  }
}
