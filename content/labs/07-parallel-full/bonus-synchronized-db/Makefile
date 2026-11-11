CC     := gcc
CFLAGS := -Wall -Wextra -g

.PHONY: all test clean

all: db

db: db.c
	$(CC) $(CFLAGS) -pthread -o $@ $<

test: all
	./test.sh

clean:
	$(RM) db
