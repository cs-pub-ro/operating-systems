# -g  : keep debug symbols, so gdb and Valgrind can show source lines
# -O0 : no optimisations, so the code you step through is the code you wrote
CC = gcc
CFLAGS = -Wall -Wextra -g -O0

OBJS = main.o json_value.o

jsontool: $(OBJS)
	$(CC) $(CFLAGS) -o jsontool $(OBJS)

main.o: main.c json_value.h
	$(CC) $(CFLAGS) -c main.c

json_value.o: json_value.c json_value.h
	$(CC) $(CFLAGS) -c json_value.c

clean:
	rm -f jsontool *.o

.PHONY: clean
