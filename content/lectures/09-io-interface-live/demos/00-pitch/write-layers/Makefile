CC = gcc
CPPFLAGS = -I../../utils
CFLAGS = -Wall -Wextra -g

PROGRAMS = fwrite write write_o_direct write_o_direct_o_sync

.PHONY: all run clean

all: $(PROGRAMS)

fwrite: fwrite.c write.h ../../utils/utils.h
	$(CC) $(CPPFLAGS) $(CFLAGS) -o $@ $<

write: write.c write.h ../../utils/utils.h
	$(CC) $(CPPFLAGS) $(CFLAGS) -o $@ $<

write_o_direct: write.c write.h ../../utils/utils.h
	$(CC) $(CPPFLAGS) -DNAME='"write O_DIRECT"' -DEXTRA_FLAGS=O_DIRECT \
		$(CFLAGS) -o $@ $<

write_o_direct_o_sync: write.c write.h ../../utils/utils.h
	$(CC) $(CPPFLAGS) -DNAME='"write O_DIRECT|O_SYNC"' \
		-DEXTRA_FLAGS='(O_DIRECT | O_SYNC)' $(CFLAGS) -o $@ $<

# All four, in order, each on a file of its own making.
run: all
	@for p in $(PROGRAMS); do ./$$p; done

clean:
	-rm -f *~ *.o f.dat
	-rm -f $(PROGRAMS)
