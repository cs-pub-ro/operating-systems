CC     := gcc
CFLAGS := -Wall -Wextra -g

.PHONY: all clean

all: encrypt

encrypt: encrypt.c
	$(CC) $(CFLAGS) -pthread -o $@ $<

clean:
	$(RM) encrypt
