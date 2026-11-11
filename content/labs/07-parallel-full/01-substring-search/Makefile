CC     := gcc
CFLAGS := -Wall -Wextra -g

.PHONY: all test clean

all: search gen_text

search: search.c
	$(CC) $(CFLAGS) -pthread -o $@ $<

gen_text: gen_text.c
	$(CC) $(CFLAGS) -o $@ $<

test: all
	./test.sh

clean:
	$(RM) search gen_text
