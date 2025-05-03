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
LOCK_EXEC="../src/race_condition_lock_checker"

# Checking if the executables exist
if [ ! -f "$LOCK_EXEC" ]; then
	echo "Error: $LOCK_EXEC does not exist."
	exit 1
fi

# Running the command to check if race_condition_atomic prints "var = 0"
echo "Checking if var == 0..."
if $LOCK_EXEC | grep -q "var = 0"; then
	echo -e "\nTest passed\n"
else
	echo -e "\nTest failed\n"
fi
