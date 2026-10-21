CC := gcc
CFLAGS := -Wall -Wextra -g

OBJS := main.o symbol_hash_table.o

.PHONY: all clean

all: symtab

symtab: $(OBJS)
	$(CC) $(CFLAGS) -o $@ $^

main.o: main.c symbol_hash_table.h
	$(CC) $(CFLAGS) -c $<

symbol_hash_table.o: symbol_hash_table.c symbol_hash_table.h
	$(CC) $(CFLAGS) -c $<

clean:
	$(RM) symtab $(OBJS)
