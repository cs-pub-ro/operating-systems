CFLAGS = -Wall

.PHONY: all clean

all: char-ptr-init char-array-init

char-ptr-init: char-ptr-init.o

char-ptr-init.o: char-ptr-init.c

char-array-init: char-array-init.o

char-array-init.o: char-array-init.c

clean:
	-rm -f *~
	-rm -f char-ptr-init.o char-ptr-init
	-rm -f char-array-init.o char-array-init
