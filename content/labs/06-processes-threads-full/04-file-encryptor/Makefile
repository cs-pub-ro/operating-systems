CC     := gcc
CFLAGS := -Wall -Wextra -g

.PHONY: all clean

all: encryptor

encryptor: encryptor.c
	$(CC) $(CFLAGS) -pthread -o $@ $<

clean:
	$(RM) encryptor
