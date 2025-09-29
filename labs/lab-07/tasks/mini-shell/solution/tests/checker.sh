#!/bin/bash
# SPDX-License-Identifier: BSD-3-Clause

SRC_DIR="$(dirname "$0")/../src"
MINI_SHELL_EXE="$SRC_DIR/mini_shell"

make -C "$SRC_DIR"

declare -A commands

commands["echo hello"]=25
commands["realpath"]=25
commands["ls"]=50

commands_string=$(printf "%s\n" "${!commands[@]}")
# Run the mini shell with the commands
result=$(echo "$commands_string" | $MINI_SHELL_EXE)

score=0
total=100

# Check the output
for command in "${!commands[@]}"; do
    output=$(eval "$command")
    if grep -q "$output" <<< "$result"; then
        echo "mini_shell: $command ................ passed ... ${commands[$command]}"
        score=$((score+${commands[$command]}))
    else
        echo "mini_shell: $command ................ failed ... 0"
    fi
done

echo "Total: $score / $total"
