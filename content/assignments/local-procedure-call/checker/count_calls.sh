#!/bin/bash
# SPDX-License-Identifier: BSD-3-Clause

# Counting checker
# Accepts only:
#   Hello from func()
#   Hello from func(arg1)
#   Hello from func(arg1, arg2)

EXPECTED_CLIENTS="$1"

func0=0
func1=0
func2=0
total=0
line_no=0

while IFS= read -r line; do
    ((line_no++))
    case "$line" in
        "Hello from func()")
            ((func0++))
            ((total++))
            ;;
        "Hello from func(arg1)")
            ((func1++))
            ((total++))
            ;;
        "Hello from func(arg1, arg2)")
            ((func2++))
            ((total++))
            ;;
        "")
            echo "ERROR: empty line at line $line_no"
            exit 1
            ;;
        *)
            echo "ERROR: invalid message at line $line_no:"
            echo "  '$line'"
            exit 1
            ;;
    esac
done

echo "=== Call Summary ==="
echo "func()            : $func0"
echo "func(arg1)        : $func1"
echo "func(arg1, arg2)  : $func2"
echo "Total calls       : $total"

if [[ -n "$EXPECTED_CLIENTS" && "$total" -ne "$EXPECTED_CLIENTS" ]]; then
    echo "ERROR: total calls ($total) do not match expected clients ($EXPECTED_CLIENTS)"
    exit 1
fi

echo "OK"
