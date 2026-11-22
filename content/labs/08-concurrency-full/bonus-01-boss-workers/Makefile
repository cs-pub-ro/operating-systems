CC     := gcc
CFLAGS := -Wall -Wextra -g

.PHONY: all test clean

all: libboss.so chall

# The library: position-independent code, linked as a shared object.
libboss.so: boss.c boss.h
	$(CC) $(CFLAGS) -fPIC -shared -pthread -o $@ $<

# The executable: linked against the library, which it looks for at run time
# in its own directory ($ORIGIN).
chall: chall.c flag.h boss.h libboss.so
	$(CC) $(CFLAGS) -pthread -o $@ $< -L. -lboss -Wl,-rpath,'$$ORIGIN'

test: all
	./test.sh

clean:
	$(RM) libboss.so chall
