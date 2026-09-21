CFLAGS = -Wall

.PHONY: all clean

all: fwrite_buffered fwrite_unbuffered

fwrite_buffered: fwrite_buffered.o

fwrite_buffered.o: fwrite_buffered.c

fwrite_unbuffered: fwrite_unbuffered.o

fwrite_unbuffered.o: fwrite_unbuffered.c

clean:
	-rm -f *~
	-rm -f fwrite_buffered.o fwrite_buffered
	-rm -f fwrite_unbuffered.o fwrite_unbuffered
