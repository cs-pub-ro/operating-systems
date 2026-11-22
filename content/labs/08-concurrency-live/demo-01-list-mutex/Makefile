CC       := gcc
CPPFLAGS := -Iutils
CFLAGS   := -Wall -Wextra -Wno-unused-parameter -g

.PHONY: all clean

all: thread-list-app

thread-list-app: thread-list-app.c list.c list.h utils/utils.h
	$(CC) $(CPPFLAGS) $(CFLAGS) -pthread -o $@ thread-list-app.c list.c

clean:
	$(RM) thread-list-app
