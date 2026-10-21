CC := gcc
CFLAGS := -Wall -Wextra -g

.PHONY: all clean

all: shout

shout: main.c
	$(CC) $(CFLAGS) -o $@ $<

clean:
	$(RM) shout
