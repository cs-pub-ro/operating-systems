CC     := gcc
CFLAGS := -Wall -Wextra -g

.PHONY: all test clean

all: libkitchen.so chall

# The library: position-independent code, linked as a shared object.
libkitchen.so: kitchen.c kitchen.h
	$(CC) $(CFLAGS) -fPIC -shared -pthread -o $@ $<

# The executable: linked against the library, which it looks for at run time
# in its own directory ($ORIGIN).  -rdynamic lets the library call back the
# functions the executable defines.
chall: chall.c flag.h kitchen.h libkitchen.so
	$(CC) $(CFLAGS) -ffile-prefix-map=$(CURDIR)=. -pthread -rdynamic -o $@ $< -L. -lkitchen -Wl,-rpath,'$$ORIGIN'

test: all
	./test.sh

clean:
	$(RM) libkitchen.so chall
