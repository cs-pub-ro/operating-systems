CC     := gcc
CFLAGS := -Wall -Wextra -g

.PHONY: all test clean

all: encrypt

encrypt: encrypt.c
	$(CC) $(CFLAGS) -pthread -o $@ $<

test: all
	./test.sh

clean:
	$(RM) encrypt
