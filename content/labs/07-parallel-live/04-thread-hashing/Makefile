CC     := gcc
CFLAGS := -Wall -Wextra -g

.PHONY: all clean

all: hash_files

hash_files: hash_files.c md5.c md5.h
	$(CC) $(CFLAGS) -pthread -o $@ hash_files.c md5.c

clean:
	$(RM) hash_files
