#!/bin/sh

num_files=10

for i in $(seq -f "%02g" 1 "$num_files"); do
    gcc -Wall -o work/hello-$i work/hello-$i.c
    gcc -Wall -static -o work/hello-static-$i work/hello-$i.c
done
