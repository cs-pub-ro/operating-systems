CC     := gcc
CFLAGS := -Wall -Wextra -g

.PHONY: all test clean

all: hash_files

hash_files: hash_files.c md5.c md5.h
	$(CC) $(CFLAGS) -pthread -o $@ hash_files.c md5.c

test: all
	./test.sh

clean:
	$(RM) hash_files
