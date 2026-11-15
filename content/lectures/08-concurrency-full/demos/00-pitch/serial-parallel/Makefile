CC = gcc
CPPFLAGS = -I../../utils
CFLAGS = -Wall -Wextra -Wno-unused -Wno-unused-parameter -g
LDLIBS = -lpthread

.PHONY: all clean

all: serial parallel

serial: serial.o
	$(CC) $(LDFLAGS) -o $@ $^ $(LDLIBS)

serial.o: serial.c ../../utils/utils.h
	$(CC) $(CPPFLAGS) $(CFLAGS) -c -o $@ $<

parallel: parallel.o
	$(CC) $(LDFLAGS) -o $@ $^ $(LDLIBS)

parallel.o: parallel.c ../../utils/utils.h
	$(CC) $(CPPFLAGS) $(CFLAGS) -c -o $@ $<

clean:
	-rm -f *~
	-rm -f serial.o serial
	-rm -f parallel.o parallel
