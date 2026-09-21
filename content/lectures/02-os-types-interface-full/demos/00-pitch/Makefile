CFLAGS = -Wall -g

.PHONY: all clean

%.o: %.asm
	nasm -f elf64 -o $@ $<

all: hello hello_static hello_syscall hello_nostd

hello: hello.o

hello_static: hello.o
	$(CC) -static -o $@ $^

hello.o: hello.c

hello_syscall: hello_syscall.o
	$(CC) -no-pie -o $@ $^

hello_syscall.o: hello_syscall.asm

hello_nostd: hello_nostd.o
	$(CC) -nostdinc -nostdlib -static -Wl,-emain -o $@ $^

hello_nostd.o: hello_nostd.asm

clean:
	-rm -f hello hello_static hello_syscall hello_nostd
	-rm -f hello.o hello_syscall.o hello_nostd.o
	-rm -f *~
