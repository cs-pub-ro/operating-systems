CC     := gcc
CFLAGS := -O0 -Wall -Wextra

.PHONY: all clean

all: printf_demo write_demo

printf_demo: printf_demo.c
	$(CC) $(CFLAGS) -o $@ $<

write_demo: write_demo.c
	$(CC) $(CFLAGS) -o $@ $<

clean:
	$(RM) printf_demo write_demo
