CC     := gcc
CFLAGS := -Wall -Wextra

.PHONY: all clean

# TODO 5: Once the rules for the four executables below are written, add the
# executables to this list, so that a plain `make` builds them too.
all: libcipherstatic.a libcipherdyn.so

# ---- the static library ---------------------------------------------------

caesar.o: caesar.c caesar.h
	$(CC) $(CFLAGS) -c -o $@ $<

vigenere.o: vigenere.c vigenere.h
	$(CC) $(CFLAGS) -c -o $@ $<

libcipherstatic.a: caesar.o vigenere.o
	ar rcs $@ $^

# ---- the shared library ---------------------------------------------------

# Position-independent code, in object files of their own, so they do not
# overwrite the ones the archive is built from.
caesar_pic.o: caesar.c caesar.h
	$(CC) $(CFLAGS) -fPIC -c -o $@ $<

vigenere_pic.o: vigenere.c vigenere.h
	$(CC) $(CFLAGS) -fPIC -c -o $@ $<

libcipherdyn.so: caesar_pic.o vigenere_pic.o
	$(CC) -shared -o $@ $^

# ---- the executables ------------------------------------------------------

main.o: main.c caesar.h vigenere.h
	$(CC) $(CFLAGS) -c -o $@ $<

# TODO 1: cipher, a dynamically-linked executable built from main.c, caesar.c
# and vigenere.c.

# TODO 2: cipher-static, a statically-linked executable built from main.c,
# caesar.c and vigenere.c.

# TODO 3: cipher-dyn, an executable built from main.o and linked against
# libcipherdyn.so.

# TODO 4: cipher-static-lib, an executable built from main.o and linked against
# libcipherstatic.a.

clean:
	$(RM) cipher cipher-static cipher-dyn cipher-static-lib
	$(RM) libcipherstatic.a libcipherdyn.so *.o
