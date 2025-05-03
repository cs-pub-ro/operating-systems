#!/bin/bash
# SPDX-License-Identifier: BSD-3-Clause

FILENAME="test.txt"

check_file() {
    PWD=$(pwd)
    CONTENT="Now you see me, now you don't\n"

    # Check if the file exists and that it contains the expected content
    if [ -f "$PWD/$FILENAME" ] && [ "$(cat "$PWD/$FILENAME")" == "$CONTENT" ]; then
        return 1
    else
        return 0
    fi
}

SRC_DIR="$(dirname "$0")/../src"
WAIT_FOR_ME="$SRC_DIR/wait_for_me_processes.py"

score=0
total=100

if python3 "$WAIT_FOR_ME" "$FILENAME" > /dev/null 2>&1 && check_file ; then
    echo "wait_for_me_processes ...................... passed ... 100"
    score=$((score+100))
else
    echo "wait_for_me_processes ...................... failed ... 0"
fi

echo "Total: $score / $total"

rm test.txt
