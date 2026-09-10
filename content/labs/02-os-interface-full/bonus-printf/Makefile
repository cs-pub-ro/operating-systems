CC      = gcc
CFLAGS  = -Wall -Wextra -g

# The vendored mpaland/printf library is kept in a single place, in the work
# directory, rather than duplicated here.
PRINTF_DIR = ../../02-os-interface-work/bonus-printf/utils/printf

.PHONY: all clean

all: printfdemo

printfdemo: main.c _putchar.c $(PRINTF_DIR)/printf.c $(PRINTF_DIR)/printf.h
	$(CC) $(CFLAGS) -I$(PRINTF_DIR) -o $@ main.c _putchar.c $(PRINTF_DIR)/printf.c

clean:
	rm -f printfdemo
