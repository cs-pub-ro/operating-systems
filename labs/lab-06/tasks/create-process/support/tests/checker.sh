#!/bin/bash
# SPDX-License-Identifier: BSD-3-Clause

SRC_DIR="$(dirname "$0")/../src"
FORK_EXE="$SRC_DIR/fork"

make -C "$SRC_DIR"

output="$(strace -f -e execve "$FORK_EXE" 2>&1)"

attached_pids="$(echo "$output" | grep "attached" | awk '{print $3}')"
first_child_pid="$(echo "$attached_pids" | head -n 1)"
second_child_pid="$(echo "$attached_pids" | tail -n 1)"

first_child_exit_message="$first_child_pid\] +++ exited with 22 +++"
second_child_error_message="$first_child_pid\] --- SIG\
CHLD {si_signo=SIGCHLD, si_code=CLD_EXITED, si_pid=$second_child_pid"

score=0
total=100

if grep -q "$first_child_exit_message" <<< "$output"; then
    echo "exit_code22 ...................... passed ... 50"
    score=$((score+50))
else
    echo "exit_code22 ...................... failed ... 0"
fi

if grep -q "$second_child_error_message" <<< "$output"; then
    echo "second_fork ...................... passed ... 50"
    score=$((score+50))
else
    echo "second_fork ...................... failed ... 0"
fi

echo "Total: $score / $total"
