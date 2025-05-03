#!/bin/bash
# SPDX-License-Identifier: BSD-3-Clause

mkdir -p out

make -C ../src

../src/main < in/in.in > out/out.out

out="out/out.out"
ref="ref/out.ref"

head -n 3 "$out" > /tmp/out.txt

if cmp -s "$ref" /tmp/out.txt; then
    echo "main ...................... passed ... 10"
else
    echo "main ...................... failed ... 0"
fi

rm /tmp/out.txt
