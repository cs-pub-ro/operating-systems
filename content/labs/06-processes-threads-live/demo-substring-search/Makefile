CC     := gcc
CFLAGS := -Wall -Wextra -g

.PHONY: all clean

all: search gen_text

search: search.c
	$(CC) $(CFLAGS) -pthread -o $@ $<

gen_text: gen_text.c
	$(CC) $(CFLAGS) -o $@ $<

clean:
	$(RM) search gen_text
