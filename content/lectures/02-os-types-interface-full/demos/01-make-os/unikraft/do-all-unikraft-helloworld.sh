#!/bin/sh

rm -fr catalog-core
git clone https://github.com/unikraft/catalog-core
git clone https://github.com/unikraft/unikraft catalog-core/repos/unikraft
cd catalog-core/c-hello/
./setup.sh
git checkout -b scripts origin/scripts
./scripts/build/qemu.x86_64
./scripts/run/qemu.x86_64
