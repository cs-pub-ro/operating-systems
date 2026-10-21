CC := gcc
CFLAGS := -Wall -Wextra -g

.PHONY: all clean

all: config

config: main.c
	$(CC) $(CFLAGS) -o $@ $<

clean:
	$(RM) config
