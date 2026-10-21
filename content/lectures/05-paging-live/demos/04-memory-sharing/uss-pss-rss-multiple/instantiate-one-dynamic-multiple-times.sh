#!/bin/sh

num_times=10

for _ in $(seq 1 "$num_times"); do
    ./work/hello-01 &
done
