#ifndef CAESAR_H
#define CAESAR_H

/*
 * caesar - encrypt or decrypt a string using the Caesar cipher.
 *
 * @plaintext:  null-terminated input string (modified in place)
 * @shift:      number of positions to shift (positive = encrypt,
 *              negative = decrypt); only letters are affected
 */
void caesar(char *plaintext, int shift);

#endif /* CAESAR_H */
