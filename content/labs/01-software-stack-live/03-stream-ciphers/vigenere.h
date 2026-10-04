#ifndef VIGENERE_H
#define VIGENERE_H

/*
 * vigenere - encrypt or decrypt a string using the Vigenere cipher.
 *
 * @plaintext:  null-terminated input string (modified in place)
 * @key:        null-terminated key string (letters only, case-insensitive)
 *
 * Positive key shifts encrypt; to decrypt, pass a key whose shifts are the
 * additive inverses (i.e. re-run with the same key on the ciphertext).
 */
void vigenere(char *plaintext, const char *key);

#endif /* VIGENERE_H */
