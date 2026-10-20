#!/bin/sh

num_files=10

for i in $(seq -f "%02g" 1 "$num_files"); do
    rm -f work/hello-"$i".c
    rm -f work/hello-"$i"
    rm -f work/hello-"$i"-static
done
