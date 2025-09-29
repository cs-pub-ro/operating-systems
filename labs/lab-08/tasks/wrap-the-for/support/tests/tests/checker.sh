#!/bin/bash
# SPDX-License-Identifier: BSD-3-Clause

# Go to the src directory and build the executables (the Makefile is there)
echo "Building the project..."
cd ../src || { echo "Error: Unable to navigate to src directory."; exit 1; }

# 'make build' to compile the executables
if ! make build; then
    echo "Error: Build failed."
    exit 1
fi

# Paths to the executables
OUTER_EXEC="../src/race_condition_outer_mutex"
INNER_EXEC="../src/race_condition_inner_mutex"

# Checking if the executables exist
if [ ! -f "$OUTER_EXEC" ]; then
    echo "Error: $OUTER_EXEC does not exist."
    exit 1
fi

if [ ! -f "$INNER_EXEC" ]; then
    echo "Error: $INNER_EXEC does not exist."
    exit 1
fi

# Running and timing the race_condition_outer_mutex executable, output won't be printed
echo "Running race_condition_outer_mutex..."
outer_time=$( ( /usr/bin/time -f "%e" "$OUTER_EXEC" > /dev/null ) 2>&1 )
echo -e "Outer mutex time: $outer_time seconds\n"

# Running and timing the race_condition_inner_mutex executable, output won't be printed
echo "Running race_condition_inner_mutex..."
inner_time=$( ( /usr/bin/time -f "%e" "$INNER_EXEC" > /dev/null ) 2>&1 )
echo -e "Inner mutex time: $inner_time seconds\n"

# Checking if race_condition_outer_mutex time is too small or zero to avoid divide-by-zero error
if (( $(echo "$outer_time == 0" | bc -l) )); then
    echo "Error: Outer mutex execution time is zero. Cannot compute ratio."
    exit 1
fi

# Computing the ratio as inner / outer
ratio=$(echo "$inner_time / $outer_time" | bc -l)

# Print the ratio (uncomment only if you want to see the ratio)
# echo "Time ratio (inner/outer): $ratio"

# Checks if the ratio is greater than 10
if (( $(echo "$ratio > 10" | bc -l) )); then
    echo "Test passed"
else
    echo "Test failed"
fi
