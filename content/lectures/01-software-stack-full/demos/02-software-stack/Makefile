# The same message, built at four different levels of the software stack.
#
#   hello-nolibc   assembly, linked with ld: nothing below it but the kernel
#   hello-asm      assembly, linked with gcc: libc start-up runs first
#   hello-c        C, through puts(): libc decides how and when to write
#   hello-cpp      C++, through std::cout: the C++ runtime is below the program
#
# The Python versions need no build step at all.

CFLAGS = -Wall
CXXFLAGS = -Wall

.PHONY: all run strace clean

all: hello-nolibc hello-asm hello-c hello-cpp

hello-nolibc: hello-nolibc.o
	ld -o $@ $<

hello-asm: hello-asm.o
	$(CC) -no-pie -o $@ $<

hello-c: hello.c
	$(CC) $(CFLAGS) -o $@ $<

hello-cpp: hello.cpp
	$(CXX) $(CXXFLAGS) -o $@ $<

%.o: %.asm
	nasm -f elf64 -o $@ $<

hello-asm.o: hello.asm
	nasm -f elf64 -o $@ $<

run: all
	./hello-nolibc
	./hello-asm
	./hello-c
	./hello-cpp
	python3 hello.py

# How many system calls each version makes to print the same 14 bytes.
strace: all
	@for program in ./hello-nolibc ./hello-asm ./hello-c ./hello-cpp "python3 hello.py"; do \
		printf '%-22s %s system calls\n' "$$program" \
			"$$(strace -f -c $$program 2>&1 > /dev/null | tail -1 | awk '{ print $$4 }')"; \
	done

clean:
	-rm -f *~ *.o
	-rm -f hello-nolibc hello-asm hello-c hello-cpp
