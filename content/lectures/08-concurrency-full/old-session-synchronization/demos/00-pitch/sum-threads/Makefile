CC = gcc
CPPFLAGS = -I../../utils
CFLAGS = -Wall -Wextra -Wno-unused -Wno-unused-parameter -g
LDLIBS = -lpthread

.PHONY: all clean

all: sum_threads

sum_threads: sum_threads.o
	$(CC) $(LDFLAGS) -o $@ $^ $(LDLIBS)

sum_threads.o: sum_threads.c ../../utils/utils.h
	$(CC) $(CPPFLAGS) $(CFLAGS) -c -o $@ $<

clean:
	-rm -f *~
	-rm -f sum_threads.o sum_threads
