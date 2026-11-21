CC = gcc
CPPFLAGS = -I../../utils
CFLAGS = -Wall -Wextra -g

.PHONY: all clean

all: write_file read_file

write_file: write_file.o

write_file.o: write_file.c ../../utils/utils.h

read_file: read_file.o

read_file.o: read_file.c ../../utils/utils.h

clean:
	-rm -f *~ file_channel
	-rm -f write_file.o read_file.o write_file read_file
