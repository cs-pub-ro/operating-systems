#!/bin/sh

cd /home/ctf/heap0 || exit 1
exec ./ld-linux-x86-64.so.2 --library-path . ./chall
