CC      = gcc
CFLAGS  = -Wall -Wextra -g

.PHONY: all clean

all: demo

demo: main.c
	$(CC) $(CFLAGS) -o $@ $<

clean:
	rm -f demo
