CC     := gcc
CFLAGS := -Wall -Wextra -g

.PHONY: all clean

all: messages

messages: messages.c
	$(CC) $(CFLAGS) -pthread -o $@ $<

clean:
	$(RM) messages messages.txt
