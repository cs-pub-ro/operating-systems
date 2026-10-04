#ifndef XOR_H
#define XOR_H

#include <stddef.h>

/*
 * xor_encrypt - encrypt or decrypt a buffer using a repeating XOR key.
 *
 * @buf:  bytes to process (modified in place)
 * @len:  number of bytes in buf
 * @key:  null-terminated key string; byte i of buf is XORed with
 *        key[i % strlen(key)]
 *
 * XOR is its own inverse: calling xor_encrypt() twice with the same key
 * gives back the original bytes, so the same function both encrypts and
 * decrypts.
 */
void xor_encrypt(unsigned char *buf, size_t len, const char *key);

#endif /* XOR_H */
