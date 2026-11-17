CC     := gcc
CFLAGS := -Wall -Wextra -g

.PHONY: all clean

all: count_matches gen_text

count_matches: count_matches.c
	$(CC) $(CFLAGS) -pthread -o $@ $<

gen_text: gen_text.c
	$(CC) $(CFLAGS) -o $@ $<

clean:
	$(RM) count_matches gen_text
