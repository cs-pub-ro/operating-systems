#!/bin/bash
# SPDX-License-Identifier: BSD-3-Clause

SRC_DIR="$(dirname "$0")/../src"
SHMEM_EXE="$SRC_DIR/shared_memory"

make -C "$SRC_DIR"

if [ ! -e "$SHMEM_EXE" ]; then
    echo "Executable does not exist."
    exit 1
fi

strace_output=$(strace -f -e trace=mmap,futex "$SHMEM_EXE" 2>&1)

mmap_shared=$(echo "$strace_output" | grep "MAP_SHARED")
mmap_address=$(echo "$mmap_shared" | awk '{print $NF}')

futex=$(echo "$strace_output" | grep "futex")

sem_wait=$(echo "$futex" | grep "FUTEX_WAIT_BITSET")
sem_post=$(echo "$futex" | grep "FUTEX_WAKE")

child_output=$(echo "$strace_output" | grep "\[child\]")
child_address=$(echo "$child_output" | awk '{print $7}')
child_value=$(echo "$child_output" | awk '{print $4}')

parent_output=$(echo "$strace_output" | grep "\[parent\]")
contains_address=$(echo "$parent_output" | grep "$child_address")
contains_value=$(echo "$parent_output" | grep "$child_value")

score=0
total=100

if [ -n "$mmap_shared" ]; then
	echo "mmap ............................ passed ... 25"
	score=$((score+25))
else
	echo "mmap ............................ failed ... 0"
fi

if [ -n "$sem_wait" ]; then
	echo "sem_wait ........................ passed ... 25"
	score=$((score+25))
else
	echo "sem_wait ........................ failed ... 0"
fi

if [ -n "$sem_post" ]; then
	echo "sem_post ........................ passed ... 25"
	score=$((score+25))
else
	echo "sem_post ........................ failed ... 0"
fi

if [[ "$child_address" == "$mmap_address" && \
	-n "$contains_address" && \
	-n "$contains_value" ]]; then
	echo "match value ..................... passed ... 25"
	score=$((score+25))
else
	echo "match value ..................... failed ... 0"
fi

echo "Total: $score / $total"
