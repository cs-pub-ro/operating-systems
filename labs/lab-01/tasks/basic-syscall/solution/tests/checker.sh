#!/bin/bash
# SPDX-License-Identifier: BSD-3-Clause

mkdir -p out
touch out/out1.out
touch out/out2.out
touch out/out3.out

ref1="ref/out.ref"
ref2="ref/out_arm.ref"
out1="out/out1.out"
out2="out/out2.out"
out3="out/out3.out"

make -C ../src
make -C ../src/arm

../src/hello-gas < in/in.in > out/out1.out
../src/hello-nasm < in/in.in > out/out2.out
qemu-aarch64 ../src/arm/hello > out/out3.out


if cmp -s "$ref1" "$out1"; then
    echo "hello-gas ...................... passed ... 10"
else
    echo "hello-gas ...................... failed ... 0"
fi

if cmp -s "$ref1" "$out2"; then
    echo "hello-nasm ...................... passed ... 10"
else
    echo "hello-nasm ...................... failed ... 0"
fi

if cmp -s "$ref2" "$out3"; then
    echo "arm_hello ...................... passed ... 10"
else
    echo "arm_hello ...................... failed ... 0"
fi
