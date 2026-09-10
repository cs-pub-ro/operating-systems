# -g  : keep debug symbols, so gdb and Valgrind can show source lines
# -O0 : no optimisations, so the code you step through is the code you wrote
CC = gcc
CFLAGS = -Wall -Wextra -g -O0

longest: main.c
	$(CC) $(CFLAGS) -o longest main.c

clean:
	rm -f longest

.PHONY: clean
