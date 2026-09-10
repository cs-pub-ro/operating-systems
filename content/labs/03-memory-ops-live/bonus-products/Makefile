CC     := gcc
CFLAGS := -O2 -Wall -Wextra -std=c11

.PHONY: all run test clean

all: products

products: products.c
	$(CC) $(CFLAGS) -o $@ $<

clean:
	$(RM) products
