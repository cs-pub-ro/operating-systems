CC     := gcc
CFLAGS := -Wall -Wextra -g

.PHONY: all test clean

all: libtree.so chall

# The library: position-independent code, linked as a shared object.
libtree.so: tree.c tree.h
	$(CC) $(CFLAGS) -fPIC -shared -pthread -o $@ $<

# The executable: linked against the library, which it looks for at run time
# in its own directory ($ORIGIN).
chall: chall.c flag.h tree.h libtree.so
	$(CC) $(CFLAGS) -pthread -o $@ $< -L. -ltree -Wl,-rpath,'$$ORIGIN'

test: all
	./test.sh

clean:
	$(RM) libtree.so chall
