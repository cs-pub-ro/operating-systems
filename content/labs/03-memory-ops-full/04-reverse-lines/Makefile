CC     := gcc
CFLAGS := -Wall -Wextra -g

.PHONY: all clean

all: reverse_lines

reverse_lines: reverse_lines.c
	$(CC) $(CFLAGS) -o $@ $<

clean:
	$(RM) reverse_lines
