#!/bin/bash
# SPDX-License-Identifier: BSD-3-Clause

# Go to the src directory and build the executables (the Makefile is there)
echo -e "Building the project...\n"
cd ../src || { echo "Error: Unable to navigate to src directory."; exit 1; }

# 'make build' to compile the executables
if ! make build; then
	echo "Error: Build failed."
	exit 1
fi

# Paths to the executables
ATOMIC1_EXEC="../src/race_condition_atomic"
ATOMIC2_EXEC="../src/race_condition_atomic2"

# Checking if the executables exist
if [ ! -f "$ATOMIC1_EXEC" ]; then
	echo "Error: $ATOMIC1_EXEC does not exist."
	exit 1
fi

if [ ! -f "$ATOMIC2_EXEC" ]; then
	echo "Error: $ATOMIC2_EXEC does not exist."
	exit 1
fi

# Running the command to check if race_condition_atomic prints "var = 0"
echo "Checking if var == 0..."
if $ATOMIC1_EXEC | grep -q "var = 0"; then
	echo -e "\nTest 1 passed\n"
else
	echo -e "\nTest 1 failed\n"
fi

# Running and timing the race_condition_atomic executable, output won't be printed
echo "Running race_condition_atomic..."
atomic1_time=$( ( /usr/bin/time -f "%e" "$ATOMIC1_EXEC" > /dev/null ) 2>&1 )
echo -e "Atomic1 time: $atomic1_time seconds\n"

# Running and timing the race_condition_inner_mutex executable, output won't be printed
echo "Running race_condition_atomic2..."
atomic2_time=$( ( /usr/bin/time -f "%e" "$ATOMIC2_EXEC" > /dev/null ) 2>&1 )
echo -e "Atomic2 time: $atomic2_time seconds\n"

# Checking if race_condition_outer_mutex time is too small or zero to avoid divide-by-zero error
if (( $(echo "$atomic1_time == 0" | bc -l) )); then
	echo "Error: Outer mutex execution time is zero. Cannot compute ratio."
	exit 1
fi

# Computing the ratio as inner / outer
ratio=$(echo "$atomic2_time / $atomic1_time" | bc -l)

# Print the ratio (uncomment only if you want to see the ratio)
# echo "Time ratio (atomic2/atomic1): $ratio"

# Checks if the ratio is between 0 and 2
if (( $(echo "$ratio > 0 && $ratio < 2" | bc -l) )); then
    printf "\nTest 2 passed\n"
else
    printf "\nTest 2 failed\n"
fi
