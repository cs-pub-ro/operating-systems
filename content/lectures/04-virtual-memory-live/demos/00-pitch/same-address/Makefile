CC = gcc
CPPFLAGS = -I../../utils
CFLAGS = -Wall -Wextra -g
CFLAGS += -fno-pic
LDFLAGS = -no-pie

.PHONY: all clean

all: same_address

same_address: same_address.o

same_address.o: same_address.c ../../utils/utils.h

clean:
	-rm -f *~
	-rm -f same_address.o same_address
