CC     := gcc
CFLAGS := -Wall -Wextra -g

.PHONY: all test clean

all: messages

messages: messages.c
	$(CC) $(CFLAGS) -pthread -o $@ $<

test: all
	./test.sh

clean:
	$(RM) messages messages.txt
