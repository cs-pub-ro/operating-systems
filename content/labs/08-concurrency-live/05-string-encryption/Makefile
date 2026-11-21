CC     := gcc
CFLAGS := -Wall -Wextra -g

.PHONY: all clean

all: libxorcipher.so

# The library: position-independent code, linked as a shared object.
# The executable, chall, is already built, and looks for the library in its
# own directory.
libxorcipher.so: xorcipher.c xorcipher.h
	$(CC) $(CFLAGS) -fPIC -shared -pthread -o $@ $<

clean:
	$(RM) libxorcipher.so
