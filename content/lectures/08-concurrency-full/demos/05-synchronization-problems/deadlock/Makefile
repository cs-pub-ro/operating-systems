CC = gcc
CPPFLAGS = -I../../utils
CFLAGS = -Wall -Wextra -Wno-unused-parameter -g
LDLIBS = -lpthread

.PHONY: all clean

all: deadlock ordered

deadlock: deadlock.o

deadlock.o: deadlock.c ../../utils/utils.h

ordered: ordered.o

ordered.o: deadlock.c ../../utils/utils.h
	$(CC) $(CPPFLAGS) -DORDERED_LOCKS $(CFLAGS) -c -o $@ $<

clean:
	-rm -f *~
	-rm -f deadlock.o ordered.o deadlock ordered
