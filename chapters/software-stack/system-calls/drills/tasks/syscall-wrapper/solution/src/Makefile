NASM = nasm
CC = gcc
CFLAGS = -fno-PIC -fno-stack-protector
LDFLAGS = -no-pie

.PHONY: all clean

all: main

main: main.o syscall.o

main.o: main.c syscall.h

syscall.o: syscall.asm
	$(NASM) -f elf64 -o $@ $<

clean:
	-rm -f main
	-rm -f main.o syscall.o
	-rm -f *~
