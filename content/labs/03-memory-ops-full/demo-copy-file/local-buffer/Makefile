# SPDX-License-Identifier: BSD-3-Clause

CC      = gcc
CFLAGS  = -Wall -Wextra -g

.PHONY: all clean

all: copy_file

copy_file: copy_file.c
	$(CC) $(CFLAGS) -o $@ $<

clean:
	rm -f copy_file
