#!/bin/bash
# SPDX-License-Identifier: BSD-3-Clause
set -euo pipefail

# -------------------------------
# Directories
# -------------------------------
PIPES_DIR=".pipes"
DISPATCHER_PIPES_DIR=".dispatcher"
INPUT_DIR=".input"
OUTPUT_DIR="./output"

mkdir -p "$OUTPUT_DIR" "$PIPES_DIR" "$DISPATCHER_PIPES_DIR"

# Clean pipes ONCE
rm -f "$PIPES_DIR"/* "$DISPATCHER_PIPES_DIR"/*

# -------------------------------
# Executables
# -------------------------------
DISPATCHER_BIN="../src/dispatcher"
SERVICE_BIN="../tests/service"
CLIENT_MANAGER_BIN="../tests/client-manager"

POINTS_PER_TEST=20
TOTAL_POINTS=0

# -------------------------------
# Build executables if missing
# -------------------------------
[ ! -f "$DISPATCHER_BIN" ] && (cd ../src && make)
(cd ../tests && make clean)
[ ! -f "$CLIENT_MANAGER_BIN" ] && (cd ../tests && make client-manager)
[ ! -f "$SERVICE_BIN" ] && (cd ../tests && make service)

# -------------------------------
# Generate input files
# -------------------------------
mkdir -p "$INPUT_DIR"

echo "Generating input files..."

generate_test() {
    local file="$1"
    local lines="$2"
    local pattern="$3"

    : > "$file"  # clear file
    for ((i=0;i<lines;i++)); do
        case "$pattern" in
            func0)
                echo "Hello from func()" >> "$file"
                ;;
            func1)
                echo "Hello from func(arg1)" >> "$file"
                ;;
            func2)
                echo "Hello from func(arg1, arg2)" >> "$file"
                ;;
            mixed)
                rem=$((i % 3))
                if [ "$rem" -eq 0 ]; then
                    echo "Hello from func()" >> "$file"
                elif [ "$rem" -eq 1 ]; then
                    echo "Hello from func(arg1)" >> "$file"
                else
                    echo "Hello from func(arg1, arg2)" >> "$file"
                fi
                ;;
            noise)
                rem=$((i % 5))
                if [ "$rem" -lt 3 ]; then
                    echo "Hello from func()" >> "$file"
                else
                    echo "NOISE MESSAGE $i" >> "$file"
                fi
                ;;
        esac
    done
}

generate_test "$INPUT_DIR/test1_func0_5.txt" 5 func0
generate_test "$INPUT_DIR/test2_func1_10.txt" 10 func1
generate_test "$INPUT_DIR/test3_func2_100.txt" 100 func2
generate_test "$INPUT_DIR/test4_mixed_300.txt" 300 mixed
generate_test "$INPUT_DIR/test5_mixed_noise_300.txt" 300 noise

# -------------------------------
# Start dispatcher
# -------------------------------
echo "Starting dispatcher..."
"$DISPATCHER_BIN" > "$OUTPUT_DIR/dispatcher.log" 2>&1 &
DISPATCHER_PID=$!
sleep 1

# -------------------------------
# Start service
# -------------------------------
echo "Starting service..."
"$SERVICE_BIN" > "$OUTPUT_DIR/service.log" 2>&1 &
SERVICE_PID=$!
sleep 1

# -------------------------------
# Open dummy readers
# -------------------------------
DUMMY_FDS=()
open_dummy() {
    local pipe="$1"
    if [ -p "$pipe" ]; then
        exec {fd}<>"$pipe"
        DUMMY_FDS+=("$fd")
    fi
}

# Fixed dispatcher/service pipes
for pipe in "$DISPATCHER_PIPES_DIR"/install_req_pipe "$DISPATCHER_PIPES_DIR"/connection_req_pipe; do
    [ -p "$pipe" ] && open_dummy "$pipe"
done

# -------------------------------
# Mapping input files -> expected clients
# -------------------------------
declare -A EXPECTED_CLIENTS
EXPECTED_CLIENTS["test1_func0_5.txt"]=5
EXPECTED_CLIENTS["test2_func1_10.txt"]=10
EXPECTED_CLIENTS["test3_func2_100.txt"]=100
EXPECTED_CLIENTS["test4_mixed_300.txt"]=300
EXPECTED_CLIENTS["test5_mixed_noise_300.txt"]=300  # only valid messages counted

# -------------------------------
# Run a single test
# -------------------------------
run_test() {
    local testfile="$1"
    local testname
    testname=$(basename "$testfile")
    local outputfile="$OUTPUT_DIR/$testname"
    local expected=${EXPECTED_CLIENTS[$testname]:-0}

    echo "-------------------------------"
    echo "Running test $testname (expected clients: $expected)"

    "$CLIENT_MANAGER_BIN" "$expected" > "$outputfile" 2>&1

    if ./count_calls.sh "$expected" < "$outputfile"; then
        echo "Test $testname PASSED (+$POINTS_PER_TEST points)"
        TOTAL_POINTS=$((TOTAL_POINTS + POINTS_PER_TEST))
    else
        echo "Test $testname FAILED (invalid messages)"
        echo "Check output: $outputfile"
    fi
}

# -------------------------------
# Run all tests
# -------------------------------
for testfile in "$INPUT_DIR"/*.txt; do
    run_test "$testfile"
done

# -------------------------------
# Cleanup
# -------------------------------
kill "$SERVICE_PID" 2>/dev/null || true
kill "$DISPATCHER_PID" 2>/dev/null || true
wait "$SERVICE_PID" 2>/dev/null || true
wait "$DISPATCHER_PID" 2>/dev/null || true

# Close dummy readers
for fd in "${DUMMY_FDS[@]}"; do
    eval "exec $fd>&-"
done

# -------------------------------
# Total points
# -------------------------------
NUM_TESTS=$(find "$INPUT_DIR" -maxdepth 1 -type f -name "*.txt" | wc -l)
echo "-------------------------------"
echo "TOTAL POINTS: $TOTAL_POINTS / $(( NUM_TESTS * POINTS_PER_TEST ))"
echo "All tests completed."
