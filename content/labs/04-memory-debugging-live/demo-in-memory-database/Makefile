CC := gcc
CFLAGS := -Wall -Wextra -g

.PHONY: all clean

all: db

db: main.c
	$(CC) $(CFLAGS) -o $@ $<

clean:
	$(RM) db
