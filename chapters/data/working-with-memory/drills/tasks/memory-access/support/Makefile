CC = gcc

MAKEFILE_DIR := $(dir $(lastword $(MAKEFILE_LIST)))

SRC = mem_access.c
OBJ = mem_access.o

INCLUDES_DIR := $(MAKEFILE_DIR)..
CPPFLAGS += -I$(INCLUDES_DIR)

CFLAGS += -g -Wall -Wextra
LDFLAGS += -z lazy
BINARY = mem_access

all: $(BINARY)

$(BINARY): $(OBJ)
	$(CC) $^ $(LDFLAGS) -o $@

%.o: %.c
	$(CC) $(CPPFLAGS) $(CFLAGS) -c $< -o $@


clean:
	-rm -f $(BINARY) $(OBJ)

.PHONY: all clean
