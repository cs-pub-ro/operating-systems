# Get the relative path to the directory of the current makefile.
MAKEFILE_DIR := $(dir $(lastword $(MAKEFILE_LIST)))
INCLUDES_DIR := $(MAKEFILE_DIR)
UTILS_DIR := $(MAKEFILE_DIR)/utils
LOGGER_DIR := $(UTILS_DIR)/log

# Compiler and flags
CPPFLAGS += -I$(INCLUDES_DIR)
CFLAGS += -g -Wall -Wextra
LDFLAGS += -z lazy

# Logger object
LOGGER_OBJ = log.o
LOGGER = $(LOGGER_DIR)/$(LOGGER_OBJ)

# Source files and corresponding binaries
SRCS = mmap_copy.c read_write_copy.c
OBJS = $(SRCS:.c=.o)
BINARIES = mmap_copy read_write_copy

# Default rule: Build everything
all: $(BINARIES) in.dat

# Rule to compile the logger
$(LOGGER_OBJ): $(LOGGER_DIR)/log.c
	$(MAKE) -C $(LOGGER_DIR) $(LOGGER_OBJ)

# Rule to compile object files from source files
%.o: %.c
	$(CC) $(CFLAGS) $(CPPFLAGS) -c $< -o $@

# Rule to create mmap_copy binary
mmap_copy: mmap_copy.o $(LOGGER)
	$(CC) $(CFLAGS) mmap_copy.o $(LOGGER) -o mmap_copy $(LDFLAGS)

# Rule to create read_write_copy binary
read_write_copy: read_write_copy.o $(LOGGER)
	$(CC) $(CFLAGS) read_write_copy.o $(LOGGER) -o read_write_copy $(LDFLAGS)

# Rule to create the in.dat file with some contents
in.dat:
	echo "Hello, world!" > in.dat

# Clean rule: Remove object files and binaries
clean:
	-rm -f $(OBJS) $(BINARIES) in.dat
	@make -C $(LOGGER_DIR) clean  # Clean the logger directory as well

.PHONY: all clean
