#!/bin/bash
# SPDX-License-Identifier: BSD-3-Clause

# Verifies that each call matches the expected function signature
# based on number of clients

CLIENTS="$1"
if [[ -z "$CLIENTS" ]]; then
    echo "ERROR: client count not provided"
    exit 1
fi

if (( CLIENTS < 10 )); then
    EXPECTED="func()"
elif (( CLIENTS < 1000 )); then
    EXPECTED="func(arg1)"
elif (( CLIENTS < 5000 )); then
    EXPECTED="func(arg1, arg2)"
else
    echo "ERROR: unsupported client number for rule check"
    exit 1
fi

line_no=0
ERRORS=0

while IFS= read -r line; do
    ((line_no++))
    if [[ "$line" != "Hello from $EXPECTED" ]]; then
        echo "ERROR: invalid call format at line $line_no: '$line'"
        ((ERRORS++))
    fi
done

if (( ERRORS == 0 )); then
    echo "OK: all calls match expected format ($EXPECTED)"
else
    echo "FAIL: $ERRORS invalid call(s) detected"
    exit 1
fi
