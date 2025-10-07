SRC := hello.c
OBJ := $(SRC:.c=.o)

STATIC_BINARY := hello-static
DYNAMIC_BINARY := hello-dynamic

CC := gcc
CFLAGS := -Wall -Wextra -g
LDFLAGS_STATIC := -static

all: $(OBJ) $(STATIC_BINARY) $(DYNAMIC_BINARY)

%.o: %.c
	$(CC) $(CFLAGS) -c $< -o $@

$(STATIC_BINARY): $(OBJ)
	$(CC) $(CFLAGS) $(OBJ) -o $@ $(LDFLAGS_STATIC)

$(DYNAMIC_BINARY): $(OBJ)
	$(CC) $(CFLAGS) $(OBJ) -o $@

clean:
	-rm -f $(OBJ) $(STATIC_BINARY) $(DYNAMIC_BINARY)

.PHONY: all clean
