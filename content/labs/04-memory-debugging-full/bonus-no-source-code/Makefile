# Makefile for the bonus binary-patching exercise.
#
# `vuln` is built EXACTLY the way the binary handed to students was built:
# no -g (no debug info shipped with it), stack protector disabled and
# position-independent-executable disabled so that addresses in gdb/objdump
# match this README and the patch script byte-for-byte.
#
# `vuln-debug` is the same source built WITH debug info, for the instructor
# (or a curious student) to explore with source-level gdb.

CC = gcc

# Flags for the binary as shipped to students: no -g, deterministic layout.
CFLAGS = -O0 -fno-stack-protector -no-pie

# Flags for an instructor build with full debug info.
DEBUG_CFLAGS = -O0 -g -fno-stack-protector -no-pie

.PHONY: all debug patch test clean

all: vuln

vuln: vuln.c
	$(CC) $(CFLAGS) -o vuln vuln.c

# `make debug` builds vuln-debug with -g, for exploring with source.
debug: vuln-debug

vuln-debug: vuln.c
	$(CC) $(DEBUG_CFLAGS) -o vuln-debug vuln.c

# `make patch` builds vuln (if needed) and produces vuln.patched by binary
# patching -- no recompilation, no source involved in the patch itself.
patch: vuln patch_vuln.py
	python3 patch_vuln.py vuln -o vuln.patched

# `make test` demonstrates the bug and the fix:
#   1. a short input works fine on the vulnerable binary;
#   2. a long input crashes the vulnerable binary (stack smashed);
#   3. the same long input is handled safely by the patched binary.
test: vuln patch
	@echo "== 1. vuln, short input (expected: prints back the string) =="
	@echo "hello" | ./vuln
	@echo
	@echo "== 2. vuln, long input (expected: segmentation fault) =="
	@python3 -c "print('A' * 200)" | ./vuln; \
	status=$$?; \
	echo "exit status: $$status"; \
	if [ $$status -eq 0 ]; then \
		echo "UNEXPECTED: vuln did not crash on long input"; exit 1; \
	fi
	@echo
	@echo "== 3. vuln.patched, long input (expected: no crash, truncated output) =="
	@python3 -c "print('A' * 200)" | ./vuln.patched; \
	status=$$?; \
	echo "exit status: $$status"; \
	if [ $$status -ne 0 ]; then \
		echo "UNEXPECTED: vuln.patched crashed on long input"; exit 1; \
	fi
	@echo
	@echo "all good: vuln crashes on long input, vuln.patched does not."

clean:
	rm -f vuln vuln-debug vuln.patched
