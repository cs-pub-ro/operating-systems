CC     := gcc
CFLAGS := -Wall -Wextra -g

.PHONY: all clean

all: ordered

ordered: ordered.c
	$(CC) $(CFLAGS) -pthread -o $@ $<

clean:
	$(RM) ordered
