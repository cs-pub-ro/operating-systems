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
SRCS = sleepy_creator.c
OBJS = $(SRCS:.c=.o)
BINARIES = sleepy_creator

# Default rule: Build everything
all: $(BINARIES)

# Rule to compile the logger
$(LOGGER_OBJ): $(LOGGER_DIR)/log.c
	$(MAKE) -C $(LOGGER_DIR) $(LOGGER_OBJ)

# Rule to compile object files from source files
%.o: %.c
	$(CC) $(CFLAGS) $(CPPFLAGS) -c $< -o $@

# Rule to create sleepy_creator binary
sleepy_creator: sleepy_creator.o $(LOGGER)
	$(CC) $(CFLAGS) sleepy_creator.o $(LOGGER) -o sleepy_creator $(LDFLAGS)

# Clean rule: Remove object files and binaries
clean:
	-rm -f $(OBJS) $(BINARIES)
	@make -C $(LOGGER_DIR) clean  # Clean the logger directory as well

.PHONY: all clean