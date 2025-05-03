CFLAGS = -Wall
LDFLAGS = -static

.PHONY: all clean

all: hello main_printf main_string memory vendetta

hello: hello.o

main_printf: main_printf.o

main_string: main_string.o

memory: memory.o

vendetta: vendetta.o

clean:
	-rm -f hello main_printf main_string memory vendetta *.o
