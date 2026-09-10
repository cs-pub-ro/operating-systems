CC      = gcc
CFLAGS  = -Wall -Wextra -g

.PHONY: all clean

all: clock_gettime_demo

clock_gettime_demo: main.c my_time.c my_time.h
	$(CC) $(CFLAGS) -o $@ main.c my_time.c

clean:
	rm -f clock_gettime_demo
