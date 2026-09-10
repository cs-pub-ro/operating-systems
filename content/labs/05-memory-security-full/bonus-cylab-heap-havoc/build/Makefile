CFLAGS = -g -fno-stack-protector -m32 -no-pie

.PHONY: all clean

all: chall
	cp /usr/lib32/libc.so.6 .
	cp /usr/lib32/ld-linux.so.2 .

chall: chall.c
	$(CC) $(CFLAGS) -o chall chall.c

clean:
	-rm -f *~ chall libc.so.6 ld-linux.so.2
