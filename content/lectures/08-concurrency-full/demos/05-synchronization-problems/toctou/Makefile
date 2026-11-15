CC = gcc
CPPFLAGS = -I../../utils
CFLAGS = -Wall -Wextra -Wno-unused-parameter -g
LDLIBS = -lpthread

.PHONY: all clean

all: toctou check-and-act

toctou: toctou.o

toctou.o: toctou.c ../../utils/utils.h

check-and-act: check-and-act.o

check-and-act.o: toctou.c ../../utils/utils.h
	$(CC) $(CPPFLAGS) -DCHECK_AND_ACT $(CFLAGS) -c -o $@ $<

clean:
	-rm -f *~
	-rm -f toctou.o check-and-act.o toctou check-and-act
