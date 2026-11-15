CC = gcc
CPPFLAGS = -I../../utils
CFLAGS = -Wall -Wextra -Wno-unused-parameter -g
LDLIBS = -lpthread

.PHONY: all clean

all: granularity-fine granularity-coarse

granularity-fine: granularity-fine.o

granularity-fine.o: granularity.c ../../utils/utils.h
	$(CC) $(CPPFLAGS) -DGRANULARITY_TYPE=GRANULARITY_FINE $(CFLAGS) -c -o $@ $<

granularity-coarse: granularity-coarse.o

granularity-coarse.o: granularity.c ../../utils/utils.h
	$(CC) $(CPPFLAGS) -DGRANULARITY_TYPE=GRANULARITY_COARSE $(CFLAGS) -c -o $@ $<

clean:
	-rm -f *~
	-rm -f granularity-fine.o granularity-coarse.o
	-rm -f granularity-fine granularity-coarse
