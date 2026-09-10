CC     := gcc
CFLAGS := -O2 -Wall -Wextra -std=c11

.PHONY: all test clean

all: xor_encrypt

xor_encrypt: xor_encrypt.c
	$(CC) $(CFLAGS) -o $@ $<

clean:
	$(RM) xor_encrypt input.enc roundtrip.txt
