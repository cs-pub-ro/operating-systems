#!/bin/sh
# Reads two names from the client, then execs the challenge with them as
# argv[1]/argv[2] -- argv cannot be supplied directly over a bare TCP
# socket, so the wrapper does it on the client's behalf.
cd /home/ctf/heap-havoc || exit 1
IFS= read -r name1
IFS= read -r name2
exec ./ld-linux.so.2 --library-path . ./chall "$name1" "$name2"
