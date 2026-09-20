CC     := gcc
CFLAGS := -Wall -Wextra

.PHONY: all clean

all: main

mystring.o: mystring.c mystring.h
	$(CC) $(CFLAGS) -c -o $@ $<

main.o: main.c mystring.h
	$(CC) $(CFLAGS) -c -o $@ $<

main: main.o mystring.o
	$(CC) $(CFLAGS) -o $@ $^

clean:
	$(RM) main *.o
