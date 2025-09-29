#!/bin/bash
# SPDX-License-Identifier: BSD-3-Clause

make -C ../src
../src/mem_prot 2>&1
result=$?

if [ "$result" -eq 139 ]; then
    echo "mem_prot ...................... passed ... 10"
else
    echo "mem_prot ...................... failed ... 0"
fi
