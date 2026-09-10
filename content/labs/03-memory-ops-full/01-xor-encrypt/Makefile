CC     := gcc
CFLAGS := -O2 -Wall -Wextra -std=c11

.PHONY: all test clean

all: xor_encrypt

xor_encrypt: xor_encrypt.c
	$(CC) $(CFLAGS) -o $@ $<

# XOR is symmetric: encrypting the ciphertext with the same key reproduces the
# plaintext. Encrypt input.txt, encrypt the result again, and the second output
# must be byte-for-byte identical to the original.
test: xor_encrypt
	@./xor_encrypt input.txt input.enc
	@./xor_encrypt input.enc roundtrip.txt
	@cmp -s input.txt roundtrip.txt \
		&& echo "OK: round-trip reproduced the original" \
		|| echo "FAIL: round-trip differs from the original"

clean:
	$(RM) xor_encrypt input.enc roundtrip.txt
