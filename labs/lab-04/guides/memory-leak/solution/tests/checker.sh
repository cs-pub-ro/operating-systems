#!/bin/bash
# SPDX-License-Identifier: BSD-3-Clause */

# Initialize points
points=0

# Function to check memory leaks using valgrind
check_leaks() {
    executable=$1
    language=$2
    local_points=0

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
        points=$((points + 50))  # Award 50 points for no leaks
        local_points=$((local_points + 50))
    else
        echo "No valid memory leak information found."
    fi

    echo ""
    echo "Points for $executable: $local_points/50"
    echo "-------------------------------------------------"
}

make -C ../src

# Hardcoded paths for the executables
c_executable="../src/memory_leak"
cpp_executable="../src/memory_leak_malloc"

echo "-------------------------------------------------"

# Check memory leaks for C executable
check_leaks "$c_executable" "C"

# Check memory leaks for C++ executable
check_leaks "$cpp_executable" "C++"

# Display total points
echo "Total Points: $points/100"
