root_dir     := $(dir $(realpath $(lastword $(MAKEFILE_LIST))))
template     := ubuntu-26-04-vbox.pkr.hcl
headless     ?= true

# VirtualBox runs guests of its own host's architecture only: an arm64 image
# is built on an ARM machine (Apple Silicon, or arm64 Linux or Windows).
host_arch    := $(shell uname -m)
ifneq ($(filter $(host_arch),arm64 aarch64),)
default_arch := arm64
else
default_arch := amd64
endif

.PHONY: all init amd64 arm64 clean

all: $(default_arch)

# The arm64 build needs the ARMv8 chipset, added in version 1.1.4 of the
# VirtualBox plugin.
init:
	packer init -upgrade $(template)

amd64 arm64: init
	@if [ "$@" != "$(default_arch)" ]; then \
		echo "error: cannot build $@ on a $(host_arch) host with VirtualBox" >&2; \
		exit 1; \
	fi
	packer build -on-error=ask -var arch=$@ -var headless=$(headless) $(template)

clean:
	rm -rf $(root_dir)output-amd64 $(root_dir)output-arm64
