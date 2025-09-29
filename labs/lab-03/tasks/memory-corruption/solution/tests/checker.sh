#!/bin/bash
# SPDX-License-Identifier: BSD-3-Clause

mkdir -p out
make -C ../src

passed=true

../src/c_segfault < in/in.in > /dev/null 2>&1
exit_status=$?
if [ $exit_status -eq 139 ]; then
    passed=false
fi

../src/d_segfault < in/in.in > out/d_out.out 2>&1
if grep -qi "segfault" out/d_out.out; then
    passed=false
fi

if $passed; then
    echo "mem_corrupt ...................... passed ... 10"
else
    echo "mem_corrupt ...................... failed ... 0"
fi

rm -rf out
