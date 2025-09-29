#!/bin/bash
# SPDX-License-Identifier: BSD-3-Clause

SUPPORT_DIR="../src"
CURR_DIR=$(pwd)
READ_WRITE_EXE="$SUPPORT_DIR/read_write_copy"
MMAP_EXE="$SUPPORT_DIR/mmap_copy"

make -C "$SUPPORT_DIR"

check_copy_correctness() {
    src_file="$1"

    cp "$src_file" "$CURR_DIR/expected_out.dat"

    if [ ! -s "$src_file" ]; then
        sudo sh -c "sync; echo 3 > /proc/sys/vm/drop_caches"
        "$READ_WRITE_EXE" > /dev/null 2>&1
        if [ -s "out.dat" ]; then
            echo "read_write_copy ...................... failed ... 0"
        else
            echo "read_write_copy ...................... passed ... 10"
        fi

        sudo sh -c "sync; echo 3 > /proc/sys/vm/drop_caches"
        "$MMAP_EXE" > /dev/null 2>&1
        if [ -s "out.dat" ]; then
            echo "mmap_copy       ...................... failed ... 0"
        else
            echo "mmap_copy       ...................... passed ... 10"
        fi
    else
        sudo sh -c "sync; echo 3 > /proc/sys/vm/drop_caches"
        "$READ_WRITE_EXE" > /dev/null 2>&1
        if ! cmp -s "out.dat" "$CURR_DIR/expected_out.dat"; then
            echo "read_write_copy ...................... failed ... 0"
        else
            echo "read_write_copy ...................... passed ... 10"
        fi

        sudo sh -c "sync; echo 3 > /proc/sys/vm/drop_caches"
        "$MMAP_EXE" > /dev/null 2>&1
        if ! cmp -s "out.dat" "$CURR_DIR/expected_out.dat"; then
            echo "mmap_copy       ...................... failed ... 0"
        else
            echo "mmap_copy       ...................... passed ... 10"
        fi
    fi
}

# Empty file
truncate -s 0 "$CURR_DIR/in.dat"
echo "********************* EMPTY FILE *********************"
check_copy_correctness "$CURR_DIR/in.dat"

# File smaller than BUFSIZ (100 bytes)
dd if=/dev/urandom of="$CURR_DIR/in.dat" bs=100 count=1
echo "********************* SMALL FILE *********************"
check_copy_correctness "$CURR_DIR/in.dat"

# File 3 * BUFSIZ (usually BUFSIZ is 8192)
dd if=/dev/urandom of="$CURR_DIR/in.dat" bs=8192 count=3
echo "********************* LARGE FILE *********************"
check_copy_correctness "$CURR_DIR/in.dat"

# 1MB file
dd if=/dev/urandom of="$CURR_DIR/in.dat" bs=1M count=1
echo "********************* 1MB FILE *********************"
check_copy_correctness "$CURR_DIR/in.dat"

# 32MB file
dd if=/dev/urandom of="$CURR_DIR/in.dat" bs=1M count=32
echo "********************* 32MB FILE *********************"
check_copy_correctness "$CURR_DIR/in.dat"

rm -f "$CURR_DIR/in.dat" "$CURR_DIR/expected_out.dat" "$CURR_DIR/out.dat"
