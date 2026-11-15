CC = gcc
CPPFLAGS = -I../../utils
CFLAGS = -Wall -Wextra -Wno-unused-parameter -g
LDLIBS = -lpthread

BINARIES = count

# The one-instruction versions are written in x86 assembly.
ifeq ($(shell uname -m),x86_64)
BINARIES += count_one_insn count_locked_insn
endif

.PHONY: all clean

all: $(BINARIES)

count: count.o

count.o: count.c ../../utils/utils.h

count_one_insn: count_one_insn.o

count_one_insn.o: count.c ../../utils/utils.h
	$(CC) $(CPPFLAGS) -DONE_INSN $(CFLAGS) -c -o $@ $<

count_locked_insn: count_locked_insn.o

count_locked_insn.o: count.c ../../utils/utils.h
	$(CC) $(CPPFLAGS) -DLOCKED_INSN $(CFLAGS) -c -o $@ $<

clean:
	-rm -f *~
	-rm -f count.o count_one_insn.o count_locked_insn.o
	-rm -f count count_one_insn count_locked_insn
