#!/bin/bash
# SPDX-License-Identifier: GPL-2.0

# Test suite for checker.sh
POINTS=0
TOTAL=100

SOURCE_FILE="../src/my_cat"

# Make cmd
cd ../src || exit
make
cd ../tests || exit
echo

# Check if the source file exists
if [ ! -f "$SOURCE_FILE" ]; then
    echo "Source file ./$SOURCE_FILE not found!"
    exit 1
fi

# Test 1: Compare single file (30 points)
test_single_file() {
    echo -n "Test 1: Comparing single file output.........................."
    echo "Hello World" > test1.txt

    "$SOURCE_FILE" test1.txt > test_out_1.txt
    cat test1.txt > test_out_2.txt


    if diff test_out_1.txt test_out_2.txt > /dev/null; then
        POINTS=$((POINTS + 30))
        echo "PASSED (+30 points)"
    else
        echo "FAILED (+0 points)"
    fi
    rm test1.txt test_out_1.txt test_out_2.txt
}

# Test 2: Compare multiple files (30 points)
test_multiple_files() {
    echo -n "Test 2: Comparing multiple files output......................."
    echo -e "Probability of Precipitation 46% \nTemperature 0°C" > test1.txt
    echo -e "Symbols like ©, ®, and ™: \xA9 \xAE \x99. \n \u263A \u20AC \u1F600." > test2.txt
    echo -e "Characters: ☺, €, and 😀. \n\x0B\x0C\x0D\x0E\x18\x19\x1A\x1B\x1C\x1D\x1E\x1F." >> test2.txt

    "$SOURCE_FILE" test1.txt test2.txt > test_output.txt
    cat test1.txt test2.txt > test_out_2.txt

    if diff test_output.txt test_out_2.txt > /dev/null; then
        POINTS=$((POINTS + 30))
        echo "PASSED (+30 points)"
    else
        echo "FAILED (+0 points)"
    fi
    rm test1.txt test2.txt test_output.txt test_out_2.txt
}

# Test 3: Empty file
test_empty_file() {
    echo -n "Test 3: Testing empty file...................................."
    touch empty.txt

    "$SOURCE_FILE" empty.txt > test_output.txt 2> test_err.txt
    cat empty.txt > test_out_2.txt

    if diff test_output.txt test_out_2.txt > /dev/null && [ ! -s test_err.txt ]; then
        POINTS=$((POINTS + 30))
        echo "PASSED (+30 points)"
    else
        cat test_err.txt
        echo "FAILED (+0 points)"
    fi
    rm empty.txt test_output.txt test_out_2.txt test_err.txt
}

# Run all tests
test_single_file
test_multiple_files
test_empty_file

# Print final score
echo "----------------------------------------"
if [ $POINTS -eq 90 ]; then
    POINTS=$((POINTS + 10))
    echo "Final Score: $POINTS/$TOTAL points"
    echo "Good job!"
else
    echo "Final Score: $POINTS/$TOTAL points"
fi
echo "----------------------------------------"
