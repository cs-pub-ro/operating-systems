CFLAGS= -g -static-pie -o

all: elf-loader

elf-loader: elf-loader.c
	gcc $(CFLAGS) $@ $<

clean:
	-rm -f *.o elf-loader
