LDFLAGS = -no-pie

.PHONY: all clean

%.o: %.asm
	nasm -f elf64 -o $@ $<

all: cli cr3

cli: cli.o

cli.o: cli.asm

cr3: cr3.o

cr3.o: cr3.asm

clean:
	-rm -f cli.o cli
	-rm -f cr3.o cr3
	-rm -f *~
