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

# Source and object files for alloc_size
SRC = hello.c
OBJ = $(SRC:.c=.o)

# Binary name for alloc_size
BINARY = hello

# Default rule: Build the binary
all: $(BINARY)

# Rule to compile the logger
$(LOGGER_OBJ): $(LOGGER_DIR)/log.c
	$(MAKE) -C $(LOGGER_DIR) $(LOGGER_OBJ)

# Rule to compile alloc_size object file
$(OBJ): %.o: %.c
	$(CC) $(CFLAGS) $(CPPFLAGS) -c $< -o $@

# Rule to create the alloc_size binary
$(BINARY): $(OBJ) $(LOGGER)
	$(CC) $(CFLAGS) $(OBJ) $(LOGGER) -o $(BINARY) $(LDFLAGS)

# Clean rule: Remove object files and binaries
clean:
	-rm -f $(OBJ) $(BINARY)
	@make -C $(LOGGER_DIR) clean  # Clean the logger directory as well

.PHONY: all clean
