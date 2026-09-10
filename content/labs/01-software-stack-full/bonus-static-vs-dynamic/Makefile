CC     := gcc
CFLAGS := -O2 -Wall -Wextra -std=c11 -fno-builtin
ITERS  ?= 20000000
RUNS   ?= 200

# Your mystring.c / mystring.h from exercise 2 must be copied in here first:
#     cp ../01-string-functions/mystring.c ../01-string-functions/mystring.h .
SRC := mystring.c mystring.h

.PHONY: all bench startup inspect run-dynamic clean check-src

all: check-src main_static main_dynamic main_fullstatic

check-src:
	@test -f mystring.c -a -f mystring.h || { \
		echo "ERROR: mystring.c / mystring.h not found in this directory."; \
		echo "Copy your solution from exercise 2 first:"; \
		echo "    cp ../01-string-functions/mystring.c ../01-string-functions/mystring.h ."; \
		exit 1; }

# ---- the two builds of the library -------------------------------------

# Static: a plain .o, then ar bundles it into an archive. An .a really is just
# a bag of .o files with an index -- nothing more.
mystring.o: mystring.c mystring.h
	$(CC) $(CFLAGS) -c -o $@ $<

libmystring.a: mystring.o
	ar rcs $@ $^

# Shared: needs -fPIC (position-independent code), because the .so can be
# mapped at a different address in every process that uses it.
mystring_pic.o: mystring.c mystring.h
	$(CC) $(CFLAGS) -fPIC -c -o $@ $<

libmystring.so: mystring_pic.o
	$(CC) -shared -o $@ $^

# ---- the two (three) executables ---------------------------------------

# -Wl,-Bstatic ... -Wl,-Bdynamic tells the linker "for the libraries named
# between these two flags, take the .a". Without it the linker prefers the .so
# whenever both are in -L. Remember to switch back to -Bdynamic, or it will try
# to link libc statically too and complain.
main_static: main.c libmystring.a
	$(CC) $(CFLAGS) -o $@ main.c -L. -Wl,-Bstatic -lmystring -Wl,-Bdynamic

# The .so is NOT found at run time on purpose -- see the README. Use `make
# run-dynamic`, which sets LD_LIBRARY_PATH.
main_dynamic: main.c libmystring.so
	$(CC) $(CFLAGS) -o $@ main.c -L. -lmystring

# No dynamic linking at all: libc is baked in too.
main_fullstatic: main.c libmystring.a
	$(CC) $(CFLAGS) -static -o $@ main.c -L. -lmystring

# ---- measuring ----------------------------------------------------------

run-dynamic: main_dynamic
	LD_LIBRARY_PATH=. ./main_dynamic $(ITERS)

# Steady-state call cost. Interleaved and repeated: run-to-run noise here is
# bigger than the effect we are chasing, so a single pair of runs proves
# nothing.
bench: all
	@echo "=== call cost, $(ITERS) iterations x 3 calls, 5 rounds ==="
	@for i in 1 2 3 4 5; do \
		./main_static $(ITERS); \
		LD_LIBRARY_PATH=. ./main_dynamic $(ITERS); \
		./main_fullstatic $(ITERS); \
	done

# Start-up cost: 0 iterations means the program does no work, so this times
# process creation + dynamic loading and nothing else.
startup: all
	@echo "=== start-up only (0 iterations), $(RUNS) runs each ==="
	@printf 'main_static      '
	@/usr/bin/time -f '%e s total' sh -c \
		'i=0; while [ $$i -lt $(RUNS) ]; do ./main_static 0; i=$$((i+1)); done'
	@printf 'main_dynamic     '
	@LD_LIBRARY_PATH=. /usr/bin/time -f '%e s total' sh -c \
		'i=0; while [ $$i -lt $(RUNS) ]; do ./main_dynamic 0; i=$$((i+1)); done'
	@printf 'main_fullstatic  '
	@/usr/bin/time -f '%e s total' sh -c \
		'i=0; while [ $$i -lt $(RUNS) ]; do ./main_fullstatic 0; i=$$((i+1)); done'

# Look at what the linker actually produced.
inspect: all
	@echo "=== size ==="
	@size main_static main_dynamic main_fullstatic | cat
	@echo
	@echo "=== ldd main_static ==="; ldd main_static || true
	@echo "=== ldd main_dynamic ==="; LD_LIBRARY_PATH=. ldd main_dynamic || true
	@echo "=== ldd main_fullstatic ==="; ldd main_fullstatic || true
	@echo
	@echo "=== is my_strlen an undefined symbol? ==="
	@printf 'main_static   : '; nm -u main_static  | grep my_strlen || echo '(no - it is inside the binary)'
	@printf 'main_dynamic  : '; nm -u main_dynamic | grep my_strlen || echo '(no)'
	@echo
	@echo "=== how main calls my_strlen ==="
	@printf 'main_static   : '; objdump -d main_static  | grep -m1 'call.*my_strlen' || true
	@printf 'main_dynamic  : '; objdump -d main_dynamic | grep -m1 'call.*my_strlen' || true

clean:
	$(RM) main_static main_dynamic main_fullstatic libmystring.a libmystring.so *.o
