#!/bin/bash
# SPDX-License-Identifier: BSD-3-Clause

if [ -z "$1" ]; then
    echo "Usage: $0 <PORT>"
    exit 1
fi

NUM_CLIENTS=8

for _ in $(seq 1 $NUM_CLIENTS); do
    ./client.py localhost "$1" 30 &
done
wait
