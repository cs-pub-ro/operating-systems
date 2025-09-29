#!/bin/bash
# SPDX-License-Identifier: BSD-3-Clause

mkdir -p out
make -C ../src 2>&1 | tee out/out.out

out="out/out.out"
ref="ref/out.ref"
passed=true

while IFS= read -r line; do
    if ! grep -qF -- "$line" "$out"; then
        passed=false
    fi
done < "$ref"

if $passed; then
    echo "mem_access ...................... passed ... 10"
else
    echo "mem_access ...................... failed ... 0"
fi

rm -rf out
