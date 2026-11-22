CC     := gcc
CFLAGS := -Wall -Wextra -g

.PHONY: all test clean

all: libxorcipher.so chall

# The library: position-independent code, linked as a shared object.
libxorcipher.so: xorcipher.c xorcipher.h
	$(CC) $(CFLAGS) -fPIC -shared -pthread -o $@ $<

# The executable: linked against the library, which it looks for at run time
# in its own directory ($ORIGIN).  The path of this directory is kept out of the
# debugging information, since the executable is handed to students.
chall: chall.c flag.h xorcipher.h libxorcipher.so
	$(CC) $(CFLAGS) -ffile-prefix-map=$(CURDIR)=. -pthread -o $@ $< -L. -lxorcipher -Wl,-rpath,'$$ORIGIN'

test: all
	./test.sh

clean:
	$(RM) libxorcipher.so chall
