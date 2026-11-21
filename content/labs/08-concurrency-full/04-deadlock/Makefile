CC     := gcc
CFLAGS := -Wall -Wextra -g

.PHONY: all test clean

all: libbank.so chall

# The library: position-independent code, linked as a shared object.
libbank.so: bank.c bank.h
	$(CC) $(CFLAGS) -fPIC -shared -pthread -o $@ $<

# The executable: linked against the library, which it looks for at run time
# in its own directory ($ORIGIN).
chall: chall.c flag.h bank.h libbank.so
	$(CC) $(CFLAGS) -pthread -o $@ $< -L. -lbank -Wl,-rpath,'$$ORIGIN'

test: all
	./test.sh

clean:
	$(RM) libbank.so chall
