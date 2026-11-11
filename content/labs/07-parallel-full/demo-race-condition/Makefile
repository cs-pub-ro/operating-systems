CC     := gcc
CFLAGS := -Wall -Wextra -g

.PHONY: all test clean

all: counter

counter: counter.c
	$(CC) $(CFLAGS) -pthread -o $@ $<

test: all
	./test.sh

clean:
	$(RM) counter
