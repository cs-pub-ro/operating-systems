CC     := gcc
CFLAGS := -Wall -Wextra -g

.PHONY: all clean

all: copy_file

copy_file: copy_file.c
	$(CC) $(CFLAGS) -o $@ $<

clean:
	$(RM) copy_file
