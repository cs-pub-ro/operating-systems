#!/bin/sh

num_files=10

for i in $(seq -f "%02g" 1 "$num_files"); do
    ./work/hello-"$i" &
done
