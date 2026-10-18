CC = gcc
CPPFLAGS = -I../../utils
CFLAGS = -Wall -Wextra -g

.PHONY: all clean

all: pagemap shared_frame

pagemap: pagemap.o

pagemap.o: pagemap.c ../../utils/utils.h

shared_frame: shared_frame.o

shared_frame.o: shared_frame.c ../../utils/utils.h

clean:
	-rm -f *~
	-rm -f pagemap.o pagemap
	-rm -f shared_frame.o shared_frame
