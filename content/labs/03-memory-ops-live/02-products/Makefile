CC     := gcc
CFLAGS := -Wall -Wextra -g

.PHONY: all run clean

all: products

products: products.c
	$(CC) $(CFLAGS) -o $@ $<

clean:
	$(RM) products
