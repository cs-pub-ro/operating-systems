CC      = gcc
CFLAGS  = -Wall -Wextra -g

PRINTF_DIR = utils/printf

.PHONY: all clean

all: printfdemo

printfdemo: main.c _putchar.c $(PRINTF_DIR)/printf.c $(PRINTF_DIR)/printf.h
	$(CC) $(CFLAGS) -I$(PRINTF_DIR) -o $@ main.c _putchar.c $(PRINTF_DIR)/printf.c

clean:
	rm -f printfdemo
