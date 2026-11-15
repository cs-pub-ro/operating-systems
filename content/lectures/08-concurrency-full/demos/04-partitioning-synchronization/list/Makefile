CC = gcc
CPPFLAGS = -I../../utils
CFLAGS = -Wall -Wextra -Wno-unused-parameter -g
LDLIBS = -lpthread

.PHONY: all clean

all: thread-list-app thread-list-app-mutex

thread-list-app: thread-list-app.o list.o

thread-list-app.o: thread-list-app.c list.h ../../utils/utils.h

thread-list-app-mutex: thread-list-app-mutex.o list.o

thread-list-app-mutex.o: thread-list-app.c list.h ../../utils/utils.h
	$(CC) $(CPPFLAGS) -DUSE_MUTEX $(CFLAGS) -c -o $@ $<

list.o: list.c list.h ../../utils/utils.h

clean:
	-rm -f *~
	-rm -f thread-list-app.o thread-list-app-mutex.o list.o
	-rm -f thread-list-app thread-list-app-mutex
