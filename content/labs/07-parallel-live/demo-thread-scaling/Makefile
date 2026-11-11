CC     := gcc
CFLAGS := -Wall -Wextra -g

.PHONY: all clean

all: count_chars

count_chars: count_chars.c
	$(CC) $(CFLAGS) -pthread -o $@ $<

clean:
	$(RM) count_chars
