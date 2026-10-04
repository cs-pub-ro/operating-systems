CC     := gcc
CFLAGS := -Wall -Wextra

.PHONY: all clean

all: xor-static-lib xor-dyn

# ---- the static library ---------------------------------------------------

# A static library is an archive of object files, made with ar, not with the
# linker.
xor.o: xor.c xor.h
	$(CC) $(CFLAGS) -c -o $@ $<

libxorstatic.a: xor.o
	ar rcs $@ $^

# ---- the shared library ---------------------------------------------------

# A shared library is built from position-independent code (-fPIC), into a
# separate object file, and linked with -shared.
xor_pic.o: xor.c xor.h
	$(CC) $(CFLAGS) -fPIC -c -o $@ $<

libxordyn.so: xor_pic.o
	$(CC) -shared -o $@ $^

# ---- the executables ------------------------------------------------------

main.o: main.c xor.h
	$(CC) $(CFLAGS) -c -o $@ $<

# -L. tells the linker to look for libraries in the current directory.
# -l<name> comes last: the linker reads its arguments left to right, and only
# takes from a library what the object files before it need.
xor-static-lib: main.o libxorstatic.a
	$(CC) -o $@ main.o -L. -lxorstatic

# Built, but not runnable as it is: the loader does not look in the current
# directory. Run it with LD_LIBRARY_PATH=. ./xor-dyn ...
xor-dyn: main.o libxordyn.so
	$(CC) -o $@ main.o -L. -lxordyn

clean:
	$(RM) xor-static-lib xor-dyn libxorstatic.a libxordyn.so *.o
