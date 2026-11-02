CC = gcc
CPPFLAGS = -I../../utils
CFLAGS = -Wall -Wextra -fno-PIC -g
LDFLAGS = -no-pie

.PHONY: all clean

all: ip_sp

ip_sp: ip_sp.o

ip_sp.o: ip_sp.c ../../utils/utils.h

clean:
	-rm -f *~
	-rm -f ip_sp.o ip_sp
