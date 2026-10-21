CC := gcc
CFLAGS := -Wall -Wextra -g

OBJS := main.o json_value.o

.PHONY: all clean

all: jsontool

jsontool: $(OBJS)
	$(CC) $(CFLAGS) -o $@ $^

main.o: main.c json_value.h
	$(CC) $(CFLAGS) -c $<

json_value.o: json_value.c json_value.h
	$(CC) $(CFLAGS) -c $<

clean:
	$(RM) jsontool $(OBJS)
