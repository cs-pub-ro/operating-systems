CC     := gcc
CFLAGS := -Wall -Wextra -g

.PHONY: all test bench clean

all: count_chars

count_chars: count_chars.c
	$(CC) $(CFLAGS) -pthread -o $@ $<

test: all
	./test.sh

bench: all
	./bench.sh

clean:
	$(RM) count_chars
