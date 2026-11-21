CC     := gcc
CFLAGS := -Wall -Wextra -g

.PHONY: all clean

all: libh2o.so

# The library: position-independent code, linked as a shared object.
# The executable, chall, is already built, and looks for the library in its
# own directory.
libh2o.so: h2o.c h2o.h
	$(CC) $(CFLAGS) -fPIC -shared -pthread -o $@ $<

clean:
	$(RM) libh2o.so
