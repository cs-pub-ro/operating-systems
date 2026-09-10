# -g  : keep debug symbols, so gdb and Valgrind can show source lines
# -O0 : no optimisations, so the code you step through is the code you wrote
CC = gcc
CFLAGS = -Wall -Wextra -g -O0

OBJS = main.o symbol_hash_table.o

symtab: $(OBJS)
	$(CC) $(CFLAGS) -o symtab $(OBJS)

main.o: main.c symbol_hash_table.h
	$(CC) $(CFLAGS) -c main.c

symbol_hash_table.o: symbol_hash_table.c symbol_hash_table.h
	$(CC) $(CFLAGS) -c symbol_hash_table.c

clean:
	rm -f symtab *.o

.PHONY: clean
