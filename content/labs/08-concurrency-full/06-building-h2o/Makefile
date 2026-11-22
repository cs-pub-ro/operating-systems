CC     := gcc
CFLAGS := -Wall -Wextra -g

.PHONY: all test clean

all: libh2o.so chall

# The library: position-independent code, linked as a shared object.
libh2o.so: h2o.c h2o.h
	$(CC) $(CFLAGS) -fPIC -shared -pthread -o $@ $<

# The executable: linked against the library, which it looks for at run time
# in its own directory ($ORIGIN).  -rdynamic lets the library call back the
# functions the executable defines.
chall: chall.c flag.h h2o.h libh2o.so
	$(CC) $(CFLAGS) -ffile-prefix-map=$(CURDIR)=. -pthread -rdynamic -o $@ $< -L. -lh2o -Wl,-rpath,'$$ORIGIN'

test: all
	./test.sh

clean:
	$(RM) libh2o.so chall
