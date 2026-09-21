CFLAGS = -Wall

.PHONY: all clean

all: make_syscalls make_libcalls

make_syscalls: make_syscalls.o

make_syscalls.o: make_syscalls.c

make_libcalls: make_libcalls.o

make_libcalls.o: make_libcalls.c

clean:
	-rm -f *~
	-rm -f make_syscalls.o make_syscalls
	-rm -f make_libcalls.o make_libcalls
