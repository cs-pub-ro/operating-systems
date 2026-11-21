CPPFLAGS = -I../../utils
CFLAGS = -Wall -Wextra -Wno-unused -Wno-unused-parameter -g

.PHONY: all clean

all: fwrite write write_o_direct write_o_direct_o_sync

fwrite: fwrite.o

fwrite.o: fwrite.c ../../utils/utils.h
	$(CC) $(CPPFLAGS) $(CFLAGS) -c -o $@ $<

write: write.o

write.o: write.c ../../utils/utils.h
	$(CC) $(CPPFLAGS) $(CFLAGS) -c -o $@ $<

write_o_direct: write_o_direct.o

write_o_direct.o: write_o_direct.c ../../utils/utils.h
	$(CC) $(CPPFLAGS) $(CFLAGS) -c -o $@ $<

write_o_direct_o_sync: write_o_direct_o_sync.o

write_o_direct_o_sync.o: write_o_direct_o_sync.c ../../utils/utils.h
	$(CC) $(CPPFLAGS) $(CFLAGS) -c -o $@ $<

clean:
	-rm -f *~
	-rm -f fwrite.o fwrite
	-rm -f write.o write
	-rm -f write_o_direct.o write_o_direct
	-rm -f write_o_direct_o_sync.o write_o_direct_o_sync
