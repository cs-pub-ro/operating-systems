CC = gcc
CFLAGS = -Wall -Wextra -g

.PHONY: all test clean

all: reverse_lines

reverse_lines: reverse_lines.c
	$(CC) $(CFLAGS) -o $@ $<

# tac(1) is the reference: same lines, last to first.
test: reverse_lines
	@tac input.txt > expected.tmp; \
	./reverse_lines input.txt | cmp -s - expected.tmp \
		&& echo "OK: same output as tac" \
		|| echo "FAIL: output differs from tac"; \
	rm -f expected.tmp

clean:
	rm -f reverse_lines
