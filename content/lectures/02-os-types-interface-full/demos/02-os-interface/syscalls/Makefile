LDFLAGS = -no-pie

.PHONY: all clean

%.o: %.asm
	nasm -f elf64 -o $@ $<

all: read_write_syscall

read_write_syscall: read_write_syscall.o

read_write_syscall.o: read_write_syscall.asm

clean:
	-rm -f read_write_syscall.o read_write_syscall
	-rm -f *~
