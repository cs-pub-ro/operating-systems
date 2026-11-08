CC = gcc
CPPFLAGS = -I../../utils
CFLAGS = -Wall -Wextra -fno-PIC -g
LDFLAGS = -no-pie

.PHONY: all clean

all: change_state

change_state: change_state.o

change_state.o: change_state.c ../../utils/utils.h

clean:
	-rm -f *~
	-rm -f change_state.o change_state
