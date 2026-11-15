CC = gcc
CPPFLAGS = -I../../utils
CFLAGS = -Wall -Wextra -Wno-unused-parameter -g
LDLIBS = -lpthread

BINARIES = sum_serial sum_threads sum_partition sum_atomic sum_spinlock sum_mutex

.PHONY: all run clean

all: $(BINARIES)

$(BINARIES): %: %.o

$(BINARIES:=.o): %.o: %.c sum.h ../../utils/utils.h

# Every version, one after the other.
run: all
	@for b in $(BINARIES); do ./$$b; done

clean:
	-rm -f *~
	-rm -f $(BINARIES:=.o) $(BINARIES)
