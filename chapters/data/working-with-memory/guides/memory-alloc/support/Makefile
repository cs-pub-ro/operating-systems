CC = gcc

SRC = c_memory_alloc.c
OBJ = c_memory_alloc.o
DEP = $(SRC:.c=.d)

CFLAGS += -g -Wall -Wextra -MMD
LDFLAGS += -z lazy

BINARY = c_memory_alloc

all: $(BINARY)

$(BINARY): $(OBJ)
	$(CC) $^ $(LDFLAGS) -o $@

# Rule to generate .o and .d files
%.o: %.c
	$(CC) $(CFLAGS) -c $< -o $@

-include $(DEP)

clean:
	-rm -f $(BINARY) $(OBJ) $(DEP)

.PHONY: all clean
