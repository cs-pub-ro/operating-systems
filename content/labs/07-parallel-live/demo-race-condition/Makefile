CC     := gcc
CFLAGS := -Wall -Wextra -g

.PHONY: all clean

all: counter

counter: counter.c
	$(CC) $(CFLAGS) -pthread -o $@ $<

clean:
	$(RM) counter
