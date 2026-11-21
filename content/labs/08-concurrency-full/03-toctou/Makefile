CC     := gcc
CFLAGS := -Wall -Wextra -g

.PHONY: all test clean

all: libregistry.so chall

# The library: position-independent code, linked as a shared object.
libregistry.so: registry.c registry.h
	$(CC) $(CFLAGS) -fPIC -shared -pthread -o $@ $<

# The executable: linked against the library, which it looks for at run time
# in its own directory ($ORIGIN).
chall: chall.c flag.h registry.h libregistry.so
	$(CC) $(CFLAGS) -pthread -o $@ $< -L. -lregistry -Wl,-rpath,'$$ORIGIN'

test: all
	./test.sh

clean:
	$(RM) libregistry.so chall
