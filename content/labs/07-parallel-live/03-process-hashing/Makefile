CC     := gcc
CFLAGS := -Wall -Wextra -g

.PHONY: all clean

all: hash_files

hash_files: hash_files.c
	$(CC) $(CFLAGS) -o $@ $<

clean:
	$(RM) hash_files
