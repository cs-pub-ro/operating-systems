CC := gcc
CFLAGS := -Wall -Wextra -g

.PHONY: all clean

all: report

report: main.c
	$(CC) $(CFLAGS) -o $@ $<

clean:
	$(RM) report
