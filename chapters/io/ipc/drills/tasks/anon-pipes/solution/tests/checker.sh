#!/bin/bash
# SPDX-License-Identifier: GPL-2.0

SOURCE_DIR="../src/"
INPUT_FILE="input.txt"

# Make cmd
cd ../src || exit
make
cd ../tests || exit
echo

# Create input file if it doesn't exist
if [ ! -f "$SOURCE_DIR/$INPUT_FILE" ]; then
    touch "$SOURCE_DIR/$INPUT_FILE"
fi

test_string1() {
    STRING1="Hello, World!"
    echo -e "\n$STRING1\n" > "$SOURCE_DIR/$INPUT_FILE"
    ./$SOURCE_DIR/anonymous_pipe < "$SOURCE_DIR/$INPUT_FILE" > "$SOURCE_DIR/output.txt" 2>/dev/null

    if grep -q "$STRING1" "$SOURCE_DIR/output.txt"; then
        echo "Test for short string ........... PASSED"
    else
        echo "Test for short string ........... FAILED"
    fi
}

test_string2() {
    STRING2=$(head -c 10240 /dev/urandom | tr -dc 'a-zA-Z0-9')
    echo -e "\n$STRING2\n" > "$SOURCE_DIR/$INPUT_FILE"
    ./$SOURCE_DIR/anonymous_pipe < "$SOURCE_DIR/$INPUT_FILE" > "$SOURCE_DIR/output.txt" 2>/dev/null

    if grep -q "$STRING2" "$SOURCE_DIR/output.txt"; then
        echo "Test for long string  ........... PASSED"
    else
        echo "Test for long string  ........... FAILED"
    fi
}

test_string1
test_string2

# Clean up
rm -f "$SOURCE_DIR/output.txt" "$SOURCE_DIR/$INPUT_FILE"
