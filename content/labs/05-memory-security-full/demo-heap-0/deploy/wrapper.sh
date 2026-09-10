#!/bin/sh

cd /home/ctf/demo-heap-0 || exit 1
exec ./ld-linux-x86-64.so.2 --library-path . ./chall
