CC     := gcc
CFLAGS := -O2 -Wall -Wextra -std=c11

.PHONY: all run test clean

all: products

products: products.c
	$(CC) $(CFLAGS) -o $@ $<

run: products
	@./products products.txt

# Confirm the printed prices are non-decreasing, however many products there are.
test: products
	@./products products.txt | awk '/^ +[0-9]/ { print $$1 }' | sort -c -n 2>/dev/null \
		&& echo "OK: products come out in ascending price order" \
		|| echo "FAIL: output is not sorted by price"

clean:
	$(RM) products
