CC     := gcc
CFLAGS := -Wall -Wextra -g

.PHONY: all clean

all: xor_encrypt

xor_encrypt: xor_encrypt.c
	$(CC) $(CFLAGS) -o $@ $<

clean:
	$(RM) xor_encrypt input.enc roundtrip.txt
