CC     := gcc
CFLAGS := -Wall -Wextra -g

.PHONY: all clean

all: db

db: db.c
	$(CC) $(CFLAGS) -pthread -o $@ $<

clean:
	$(RM) db
