CFLAGS = -g -fno-stack-protector -no-pie

.PHONY: all clean

all: chall
	cp /lib/x86_64-linux-gnu/libc.so.6 .
	cp /lib64/ld-linux-x86-64.so.2 .

chall: chall.c
	$(CC) $(CFLAGS) -o chall chall.c

clean:
	-rm -f *~ chall libc.so.6 ld-linux-x86-64.so.2
