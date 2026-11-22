CC     := gcc
CFLAGS := -Wall -Wextra -g

.PHONY: all test clean

all: libdb.so chall readers

# The library: position-independent code, linked as a shared object.
libdb.so: db.c db.h
	$(CC) $(CFLAGS) -fPIC -shared -pthread -o $@ $<

# The executable: linked against the library, which it looks for at run time
# in its own directory ($ORIGIN).  The path of this directory is kept out of the
# debugging information, since the executable is handed to students.
chall: chall.c flag.h db.h libdb.so
	$(CC) $(CFLAGS) -ffile-prefix-map=$(CURDIR)=. -pthread -o $@ $< -L. -ldb -Wl,-rpath,'$$ORIGIN'

# Lookups only, to compare the read-write lock with a mutex; see FURTHER.md.
readers: readers.c db.c db.h
	$(CC) $(CFLAGS) -pthread -o $@ readers.c db.c

test: all
	./test.sh

clean:
	$(RM) libdb.so chall readers
