all: file_operations java_file_operations

# Get the relative path to the directory of the current makefile.
MAKEFILE_DIR := $(dir $(lastword $(MAKEFILE_LIST)))
INCLUDES_DIR := $(MAKEFILE_DIR)
UTILS_DIR := $(MAKEFILE_DIR)/utils
LOGGER_DIR := $(UTILS_DIR)/log

# Compiler and flags
CC = gcc
JAVAC = javac
CPPFLAGS += -I$(INCLUDES_DIR)
CFLAGS += -g -Wall -Wextra
LDFLAGS += -z lazy

# Logger object
LOGGER_OBJ = log.o
LOGGER = $(LOGGER_DIR)/$(LOGGER_OBJ)

# Rule to compile the logger
$(LOGGER_OBJ): $(LOGGER_DIR)/log.c
	$(MAKE) -C $(LOGGER_DIR) $(LOGGER_OBJ)

# Rule to compile the C file_operations binary
file_operations: file_operations.c $(LOGGER)
	$(CC) $(CFLAGS) $^ -o $@

# Rule to compile the Java FileOperations class
java_file_operations: FileOperations.java
	$(JAVAC) FileOperations.java

# Clean rule: Remove object files and binaries
clean:
	-rm -f file_operations *.o
	-rm -f FileOperations.class
	-rm -f $(LOGGER)

.PHONY: all clean
