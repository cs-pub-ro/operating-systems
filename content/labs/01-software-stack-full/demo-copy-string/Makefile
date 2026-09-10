CFLAGS = -Wall

.PHONY: all clean

all: copy-string copy-string-improved

copy-string: copy-string.o

copy-string.o: copy-string.c

copy-string-improved: copy-string-improved.o

copy-string-improved.o: copy-string-improved.c

clean:
	-rm -f *~
	-rm -f copy-string.o copy-string
	-rm -f copy-string-improved.o copy-string-improved
