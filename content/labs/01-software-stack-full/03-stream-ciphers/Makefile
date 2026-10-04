CC     := gcc
CFLAGS := -Wall -Wextra

.PHONY: all clean

all: libcipherstatic.a libcipherdyn.so \
     cipher cipher-static cipher-dyn cipher-static-lib

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

# TODO 1: All sources compiled and linked together; libc is linked dynamically.
cipher: main.c caesar.c vigenere.c caesar.h vigenere.h
	$(CC) $(CFLAGS) -o $@ main.c caesar.c vigenere.c

# TODO 2: The same, with libc copied into the executable too.
cipher-static: main.c caesar.c vigenere.c caesar.h vigenere.h
	$(CC) $(CFLAGS) -static -o $@ main.c caesar.c vigenere.c

# TODO 3: The cipher code stays in libcipherdyn.so, loaded at run time.
# -L. is for the linker only: run with LD_LIBRARY_PATH=. ./cipher-dyn ...
cipher-dyn: main.o libcipherdyn.so
	$(CC) -o $@ main.o -L. -lcipherdyn

# TODO 4: The cipher code is copied out of libcipherstatic.a at link time.
# -l comes after main.o, which is what needs the symbols.
cipher-static-lib: main.o libcipherstatic.a
	$(CC) -o $@ main.o -L. -lcipherstatic

clean:
	$(RM) cipher cipher-static cipher-dyn cipher-static-lib
	$(RM) libcipherstatic.a libcipherdyn.so *.o
