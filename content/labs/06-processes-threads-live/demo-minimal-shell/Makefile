CC     := gcc
CFLAGS := -Wall -Wextra -g

.PHONY: all clean

all: shell

shell: shell.c
	$(CC) $(CFLAGS) -o $@ $<

clean:
	$(RM) shell
