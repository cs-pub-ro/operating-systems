#!/bin/bash
# SPDX-License-Identifier: BSD-3-Clause

source graded_test.inc.sh

binary=../src/aslr

if test -z "$SRC_PATH"; then
    SRC_PATH=./../src
fi

test_aslr()
{
    start_address=$(nm "$binary" | awk '/_start/ {print $1}' | head -n 1)
    start_address_decimal=$((0x$start_address))
    if ((start_address_decimal < 0x400000)); then
        exit 1
    fi
    exit 0
}

run_test test_aslr 100
