BINARIES = shmem_threads shmem_file_reader shmem_file_writer shmem_shm_reader shmem_shm_writer
LDLIBS ?= -lpthread -lrt

include makefiles/multiple.mk

shmem_file_reader.o: shmem_reader.c utils/log/log.h utils/utils.h
	$(CC) $(CPPFLAGS) -DSHMEM_FILE $(CFLAGS) -c -o $@ $<

shmem_file_writer.o: shmem_writer.c utils/log/log.h utils/utils.h
	$(CC) $(CPPFLAGS) -DSHMEM_FILE $(CFLAGS) -c -o $@ $<

shmem_shm_reader.o: shmem_reader.c utils/log/log.h utils/utils.h
	$(CC) $(CPPFLAGS) -DSHMEM_SHM $(CFLAGS) -c -o $@ $<

shmem_shm_writer.o: shmem_writer.c utils/log/log.h utils/utils.h
	$(CC) $(CPPFLAGS) -DSHMEM_SHM $(CFLAGS) -c -o $@ $<

clean::
	-rm -f shmem_file_writer.o shmem_file_reader.o
	-rm -f shmem_shm_writer.o shmem_shm_reader.o
