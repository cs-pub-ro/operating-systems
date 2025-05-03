#!/bin/bash
# SPDX-License-Identifier: BSD-3-Clause

# shellcheck disable=SC2266
./test | tee results.txt

total=$(grep '\( passed \| failed \)' results.txt | rev | cut -d ' ' -f 1 | rev | paste -s -d'+' | bc)
echo ""
echo -n "Total:                           "
echo -n "                                "
LC_ALL=C printf "%3d/100\n" "$total"

rm results.txt
