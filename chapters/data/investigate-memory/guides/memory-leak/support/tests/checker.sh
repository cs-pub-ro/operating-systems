#!/bin/bash
# SPDX-License-Identifier: BSD-3-Clause */

# Function to check memory leaks using valgrind
check_leaks() {
    executable=$1
    language=$2

    if [ ! -f "$executable" ]; then
        echo "$executable not found!"
        exit 1
    fi

    echo "Checking memory leaks for $language executable: $executable"

    # Run valgrind to check for memory leaks
    valgrind_output=$(valgrind --leak-check=full --error-exitcode=1 ./"$executable" 2>&1)

    # Check if valgrind found any memory leaks

    if echo "$valgrind_output" | grep -q "definitely lost:"; then
        echo "Memory leaks detected in $language executable!"
        echo "$valgrind_output" | grep "definitely lost:"
    elif echo "$valgrind_output" | grep -q "All heap blocks were freed -- no leaks are possible"; then
        echo "$language executable is leak-free!"
    else
        echo "No valid memory leak information found."
    fi

    echo "-------------------------------------------------"
}

# Hardcoded paths for the executables
c_executable="../src/memory_leak"
cpp_executable="../src/memory_leak_malloc"

# Check memory leaks for C executable
check_leaks "$c_executable" "C"

# Check memory leaks for C++ executable
check_leaks "$cpp_executable" "C++"
