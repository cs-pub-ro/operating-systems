#!/bin/sh

cd /home/ctf/heap-mayhem || exit 1
exec ./ld-linux-x86-64.so.2 --library-path . ./chall
