CC = gcc
CPPFLAGS = -I../../utils
CFLAGS = -Wall -Wextra -Wno-unused -Wno-unused-parameter -g
LDLIBS = -lpthread

.PHONY: all clean

all: tls

tls: tls.o
	$(CC) $(LDFLAGS) -o $@ $^ $(LDLIBS)

tls.o: tls.c ../../utils/utils.h
	$(CC) $(CPPFLAGS) $(CFLAGS) -c -o $@ $<

clean:
	-rm -f *~
	-rm -f tls.o tls
