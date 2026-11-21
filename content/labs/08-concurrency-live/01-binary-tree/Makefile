CC     := gcc
CFLAGS := -Wall -Wextra -g

.PHONY: all clean

all: libtree.so

# The library: position-independent code, linked as a shared object.
# The executable, chall, is already built, and looks for the library in its
# own directory.
libtree.so: tree.c tree.h
	$(CC) $(CFLAGS) -fPIC -shared -pthread -o $@ $<

clean:
	$(RM) libtree.so
