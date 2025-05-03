NASM = nasm
CC = gcc
CFLAGS = -fno-PIC -fno-stack-protector
LDFLAGS = -no-pie
LDFLAGS_STRING = -nostdlib -no-pie -Wl,--entry=main -Wl,--build-id=none

.PHONY: all clean

all: main_printf os_string.o main_string

main_printf: main_printf.o printf.o os_string.o syscall.o

main_printf.o: main_printf.c printf.h syscall.h os_string.h

main_string: main_string.o os_string.o syscall.o
	$(CC) $(LDFLAGS_STRING) $^ -o $@

main_string.o: main_string.c os_string.c os_string.h

printf.o: printf.c printf.h

os_string.o: os_string.c os_string.h

syscall.o: syscall.s
	$(NASM) -f elf64 -o $@ $<

clean:
	-rm -f main_string main_printf *.o
	-rm -f *~
