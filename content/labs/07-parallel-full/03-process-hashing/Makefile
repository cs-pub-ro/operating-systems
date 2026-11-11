CC     := gcc
CFLAGS := -Wall -Wextra -g

.PHONY: all test clean

all: hash_files

hash_files: hash_files.c
	$(CC) $(CFLAGS) -o $@ $<

test: all
	./test.sh

clean:
	$(RM) hash_files
