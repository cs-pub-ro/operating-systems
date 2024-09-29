NASM = nasm
CC = gcc
CFLAGS = -fno-PIC -fno-stack-protector
LDFLAGS = -nostdlib -no-pie -Wl,--entry=main -Wl,--build-id=none

.PHONY: all clean

all: main_printf os_string.o

main_printf: main_printf.o printf.o string.o syscall.o

main_printf.o: main_printf.c printf.h syscall.h string.h

printf.o: printf.c printf.h

os_string.o: os_string.c os_string.h

syscall.o: syscall.s
	$(NASM) -f elf64 -o $@ $<

clean:
	-rm -f *.o
	-rm -f *~
