#!/usr/bin/env python3
"""
patch_vuln.py -- locate and fix the fgets() buffer-overflow bug in the
`vuln` binary by patching its machine code directly. No source code and no
recompilation involved.

The bug (see vuln.c, reader()):

    char buffer[64];
    ...
    fgets(buffer, 128, stdin);

fgets() is told the buffer is 128 bytes long, but it is only 64. Any line
of input of 64 bytes or more overflows buffer[] and clobbers whatever the
compiler placed after it on the stack -- on this binary (compiled with
-fno-stack-protector), that includes the saved frame pointer and return
address, so a long enough line can redirect execution.

At the assembly level (x86-64 SysV calling convention: 2nd integer/pointer
argument goes in ESI/RSI), the call site looks like this:

    401216:  mov    rdx, [stdin]
    40121d:  lea    rax, [rbp-0x40]
    401221:  mov    esi, 0x80          ; <-- the buggy size argument: 128
    401226:  mov    rdi, rax
    401229:  call   fgets@plt

"mov esi, 0x80" is encoded as the single opcode byte 0xBE followed by a
4-byte little-endian immediate (0x80 0x00 0x00 0x00). This script finds
that exact byte pattern, double-checks that it is immediately followed by
a CALL instruction (opcode 0xE8) within a short window -- so it does not
accidentally patch an unrelated "mov esi, 128" elsewhere in the binary --
and overwrites the immediate with 64 (0x40), matching the real size of
buffer[].
"""
import argparse
import struct
import sys

MOV_ESI_OPCODE = 0xBE
BUGGY_SIZE = 128
FIXED_SIZE = 64
SEARCH_WINDOW = 32	# bytes to look ahead for the accompanying CALL


def find_candidates(data: bytes):
	"""Yield offsets of `mov esi, imm32` instructions whose immediate
	equals BUGGY_SIZE."""
	target = struct.pack("<I", BUGGY_SIZE)
	needle = bytes([MOV_ESI_OPCODE]) + target
	start = 0
	while True:
		idx = data.find(needle, start)
		if idx == -1:
			return
		yield idx
		start = idx + 1


def looks_like_a_call_site(data: bytes, mov_offset: int) -> bool:
	"""Heuristic: a CALL (opcode 0xE8) should follow within SEARCH_WINDOW
	bytes, which is true for a size argument being set up right before a
	function call."""
	window = data[mov_offset:mov_offset + SEARCH_WINDOW]
	return 0xE8 in window


def main():
	ap = argparse.ArgumentParser(description=__doc__,
				      formatter_class=argparse.RawDescriptionHelpFormatter)
	ap.add_argument("binary", help="path to the vulnerable ELF binary")
	ap.add_argument("-o", "--output",
			 help="write the patched binary here "
			      "(default: patch the file in place)")
	args = ap.parse_args()

	with open(args.binary, "rb") as f:
		data = bytearray(f.read())

	if data[:4] != b"\x7fELF":
		print("error: not an ELF file", file=sys.stderr)
		sys.exit(1)

	candidates = [off for off in find_candidates(data)
		      if looks_like_a_call_site(data, off)]

	if not candidates:
		print('error: no "mov esi, 0x80" instruction (followed by a '
		      "call) found -- the binary may already be patched, or "
		      "is not the expected one.", file=sys.stderr)
		sys.exit(1)

	if len(candidates) > 1:
		print(f"error: found {len(candidates)} candidate instructions, "
		      "expected exactly one -- refusing to guess which one to "
		      "patch.", file=sys.stderr)
		sys.exit(1)

	mov_offset = candidates[0]
	imm_offset = mov_offset + 1	# skip the 0xBE opcode byte itself

	old_value = struct.unpack_from("<I", data, imm_offset)[0]
	struct.pack_into("<I", data, imm_offset, FIXED_SIZE)

	out_path = args.output or args.binary
	with open(out_path, "wb") as f:
		f.write(data)

	import os
	os.chmod(out_path, 0o755)

	print(f"found buggy instruction at file offset 0x{mov_offset:x}: "
	      f"mov esi, {old_value}")
	print(f"patched immediate at file offset 0x{imm_offset:x}: "
	      f"mov esi, {old_value} -> mov esi, {FIXED_SIZE}")
	print(f"wrote patched binary to {out_path}")


if __name__ == "__main__":
	main()
