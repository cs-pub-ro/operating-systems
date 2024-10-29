NASM = nasm
ASFLAGS = -f elf64
CC = gcc
LDFLAGS = -no-pie
LDLIBS = -lpthread
BINARY = race_condition_lock_checker

.PHONY: all clean

all: $(BINARY)

$(BINARY): race_condition_lock_checker.c race_condition_lock.o
	$(CC) $(LDFLAGS) -o $@ $^ $(LDLIBS)

race_condition_lock.o: race_condition_lock.asm
	$(NASM) $(ASFLAGS) -o $@ $<

build: all

clean:
	-rm -f $(BINARY) *.o
	-rm -f *~
