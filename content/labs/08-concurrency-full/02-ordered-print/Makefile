CC     := gcc
CFLAGS := -Wall -Wextra -g

.PHONY: all test clean

all: libturns.so chall

# The library: position-independent code, linked as a shared object.
libturns.so: turns.c turns.h
	$(CC) $(CFLAGS) -fPIC -shared -pthread -o $@ $<

# The executable: linked against the library, which it looks for at run time
# in its own directory ($ORIGIN).  -rdynamic lets the library call back the
# functions the executable defines.
chall: chall.c flag.h turns.h libturns.so
	$(CC) $(CFLAGS) -pthread -rdynamic -o $@ $< -L. -lturns -Wl,-rpath,'$$ORIGIN'

test: all
	./test.sh

clean:
	$(RM) libturns.so chall
