#!/bin/bash
# SPDX-License-Identifier: BSD-3-Clause

source graded_test.inc.sh

binary=../src/stack_protector

if test -z "$SRC_PATH"; then
    SRC_PATH=./../src
fi

test_bypassing-stackprotector()
{
    if "$binary" | grep "https://www.youtube.com/watch?v=JGWOCALy1LI&ab_channel=lou2u" > result; then
        rm result
        exit 0
    fi

    rm result
    exit 1
}

run_test test_bypassing-stackprotector 100
