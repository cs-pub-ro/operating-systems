CC     := gcc
CFLAGS := -Wall -Wextra -g

.PHONY: all test clean

all: libpool.so chall

# The library: position-independent code, linked as a shared object.
libpool.so: pool.c pool.h
	$(CC) $(CFLAGS) -fPIC -shared -pthread -o $@ $<

# The executable: linked against the library, which it looks for at run time
# in its own directory ($ORIGIN).
chall: chall.c flag.h pool.h libpool.so
	$(CC) $(CFLAGS) -pthread -o $@ $< -L. -lpool -Wl,-rpath,'$$ORIGIN'

test: all
	./test.sh

clean:
	$(RM) libpool.so chall
