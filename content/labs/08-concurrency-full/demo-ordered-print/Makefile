CC     := gcc
CFLAGS := -Wall -Wextra -g

.PHONY: all test clean

all: ordered

ordered: ordered.c
	$(CC) $(CFLAGS) -pthread -o $@ $<

test: all
	./test.sh

clean:
	$(RM) ordered
