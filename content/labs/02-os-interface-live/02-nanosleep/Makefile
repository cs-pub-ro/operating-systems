CC      = gcc
CFLAGS  = -Wall -Wextra -g

.PHONY: all clean

all: sleepdemo

sleepdemo: main.c
	$(CC) $(CFLAGS) -o $@ $<

clean:
	rm -f sleepdemo
