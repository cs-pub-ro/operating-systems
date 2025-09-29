#!/bin/bash
# SPDX-License-Identifier: BSD-3-Clause

source graded_test.inc.sh

binary=../src/bo_write_practice

if test -z "$SRC_PATH"; then
    SRC_PATH=./../src
fi

test_stackprotector()
{
    if nm "$binary" | grep -q "U __stack_chk_fail"; then
        exit 0
    else
        exit 1
    fi
}

run_test test_stackprotector 100
