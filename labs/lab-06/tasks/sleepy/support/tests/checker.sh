#!/bin/bash
# SPDX-License-Identifier: BSD-3-Clause

SRC_DIR="$(dirname "$0")/../src"
SLEEPY_CREATOR="$SRC_DIR/sleepy_creator.py"
SLEEPY_CREATOR_WAIT="$SRC_DIR/sleepy_creator_wait.py"
SLEEPY_CREATOR_EXE="$SRC_DIR/sleepy_creator"

make -C "$SRC_DIR"

python3 "$SLEEPY_CREATOR" > /dev/null 2>&1

count=$(ps -e -H -o pid,ppid,cmd | (grep "sleep 1000") | wc -l)

score=0
total=100

if [ "$count" -gt 10 ]; then
    echo "sleepy_creator ...................... passed ... 30"
    score=$((score + 30))
else
    echo "sleepy_creator ...................... failed ... 0"
fi

killall sleep > /dev/null 2>&1

python3 "$SLEEPY_CREATOR_WAIT" > /dev/null 2>&1 &

sleep 0.2

count=$(ps -e -H -o pid,ppid,cmd | (grep "sleep 1000") | wc -l)
script_count=$(ps -e -H -o pid,ppid,cmd | (grep "sleepy_creator_wait.py") | wc -l)

if [ "$count" -gt 10 ] && [ "$script_count" -gt 1 ]; then
    echo "sleepy_creator_wait ................. passed ... 30"
    score=$((score + 30))
else
    echo "sleepy_creator_wait ................. failed ... 0"
fi

killall sleep > /dev/null 2>&1

$SLEEPY_CREATOR_EXE > /dev/null 2>&1 &
sleep 0.2

count=$(ps -e -H -o pid,ppid,cmd | (grep "sleep 1000") | wc -l)

if [ "$count" -gt 1 ]; then
    echo "sleepy_creator_c .................... passed ... 40"
    score=$((score + 40))
else
    echo "sleepy_creator_c .................... failed ... 0"
fi

killall sleep > /dev/null 2>&1

echo "Total: $score / $total"
