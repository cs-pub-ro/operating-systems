export SRC_PATH ?= $(realpath ../src)
export UTILS_PATH ?= $(realpath ../utils)

CC=gcc
NASM=nasm
CFLAGS_NO_PIE=-g -static -fcf-protection=none -fno-PIC -o
CFLAGS=-g -static-pie -o
LDFLAGS_NO_PIE=-no-pie
LDFLAGS=
NASMFLAGS=-felf64 -o

SNIPPETS_PATH=$(PWD)/snippets

.PHONY: all src snippets clean_src clean_snippets check lint

all: src snippets

src:
	$(MAKE) -C $(SRC_PATH)

snippets:
	$(MAKE) -C $(SNIPPETS_PATH)

clean_snippets:
	$(MAKE) -C $(SNIPPETS_PATH) clean

clean_src:
	$(MAKE) -C $(SRC_PATH) clean

check:
	$(MAKE) clean_src clean_snippets src snippets
	./run_tests.sh

check-fast:
	$(MAKE) clean_src clean_snippets src snippets
	./run_tests.sh

lint:
	-cd .. && checkpatch.pl -f src/*.c tests/snippets/*.c
	-cd .. && checkpatch.pl -f checker/*.sh tests/*.sh
	-cd .. && shellcheck checker/*.sh tests/*.sh
