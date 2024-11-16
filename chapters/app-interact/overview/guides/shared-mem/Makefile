# List of executables to build
BINARIES = shmem_threads shmem_file_reader shmem_file_writer shmem_shm_reader shmem_shm_writer

# Default library flags if not provided externally
LDLIBS ?= -lpthread -lrt

# Include directories
INCLUDES_DIR := utils
LOGGER_DIR := $(INCLUDES_DIR)/log

CPPFLAGS += -I$(INCLUDES_DIR)
CFLAGS += -g -Wall -Wextra
LDFLAGS += -z lazy

# Shared object file
LOGGER_OBJ = $(LOGGER_DIR)/log.o

# Build all executables by default
all: $(BINARIES)

# Compile shared logger object
$(LOGGER_OBJ): $(LOGGER_DIR)/log.c $(LOGGER_DIR)/log.h
	$(CC) $(CPPFLAGS) $(CFLAGS) -c $< -o $@

# Specialized compilation for file and shm variants
shmem_file_reader.o: shmem_reader.c utils/log/log.h utils/utils.h
	$(CC) $(CPPFLAGS) -DSHMEM_FILE $(CFLAGS) -c -o $@ $<

shmem_file_writer.o: shmem_writer.c utils/log/log.h utils/utils.h
	$(CC) $(CPPFLAGS) -DSHMEM_FILE $(CFLAGS) -c -o $@ $<

shmem_shm_reader.o: shmem_reader.c utils/log/log.h utils/utils.h
	$(CC) $(CPPFLAGS) -DSHMEM_SHM $(CFLAGS) -c -o $@ $<

shmem_shm_writer.o: shmem_writer.c utils/log/log.h utils/utils.h
	$(CC) $(CPPFLAGS) -DSHMEM_SHM $(CFLAGS) -c -o $@ $<

shmem_threads.o: shmem_threads.c utils/log/log.h utils/utils.h
	$(CC) $(CPPFLAGS) $(CFLAGS) -c -o $@ $<

# Link each executable separately (no utils.o)
shmem_threads: shmem_threads.o $(LOGGER_OBJ)
	$(CC) $(LDFLAGS) -o $@ $^ $(LDLIBS)

shmem_file_reader: shmem_file_reader.o $(LOGGER_OBJ)
	$(CC) $(LDFLAGS) -o $@ $^ $(LDLIBS)

shmem_file_writer: shmem_file_writer.o $(LOGGER_OBJ)
	$(CC) $(LDFLAGS) -o $@ $^ $(LDLIBS)

shmem_shm_reader: shmem_shm_reader.o $(LOGGER_OBJ)
	$(CC) $(LDFLAGS) -o $@ $^ $(LDLIBS)

shmem_shm_writer: shmem_shm_writer.o $(LOGGER_OBJ)
	$(CC) $(LDFLAGS) -o $@ $^ $(LDLIBS)

clean:
	-rm -f $(BINARIES) *.o $(LOGGER_OBJ) \
	       shmem_file_writer.o shmem_file_reader.o \
	       shmem_shm_writer.o shmem_shm_reader.o \
	       shmem_threads.o

.PHONY: all clean
