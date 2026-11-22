CC     := gcc
CFLAGS := -Wall -Wextra -g

.PHONY: all clean

all: libpool.so

# The library: position-independent code, linked as a shared object.
# The executable, chall, is already built, and looks for the library in its
# own directory.
libpool.so: pool.c pool.h
	$(CC) $(CFLAGS) -fPIC -shared -pthread -o $@ $<

clean:
	$(RM) libpool.so
