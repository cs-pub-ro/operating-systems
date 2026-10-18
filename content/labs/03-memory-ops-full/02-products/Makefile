CC     := gcc
CFLAGS := -O2 -Wall -Wextra -std=c11

.PHONY: all run clean

all: products

products: products.c
	$(CC) $(CFLAGS) -o $@ $<

run: products
	@./products products.txt

clean:
	$(RM) products
