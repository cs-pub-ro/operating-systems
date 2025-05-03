CC = gcc

MAKEFILE_DIR := $(dir $(lastword $(MAKEFILE_LIST)))

SRC = mem_prot.c
OBJ = mem_prot.o

CFLAGS += -g -Wall -Wextra
LDFLAGS += -z lazy

BINARY = mem_prot

all: $(BINARY)

$(BINARY): $(OBJ)
	$(CC) $^ $(LDFLAGS) -o $@

%.o: %.c
	$(CC) $(CFLAGS) -c $< -o $@

clean:
	-rm -f $(BINARY) $(OBJ)

.PHONY: all clean
