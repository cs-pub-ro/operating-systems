CC := gcc
CFLAGS := -Wall -Wextra -g

.PHONY: all clean

all: longest

longest: main.c
	$(CC) $(CFLAGS) -o $@ $<

clean:
	$(RM) longest
