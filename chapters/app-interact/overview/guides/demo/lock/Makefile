# Executables to build
BINARIES = thread_mutex thread_sem proc_sem proc_flock

# Compiler and Flags
CC = gcc
MAKEFILE_DIR := $(dir $(lastword $(MAKEFILE_LIST)))
INCLUDES_DIR := $(MAKEFILE_DIR)utils
LOGGER_DIR := $(INCLUDES_DIR)/log
SOCK_DIR := $(INCLUDES_DIR)/sock

CPPFLAGS += -I$(INCLUDES_DIR)
CFLAGS += -g -Wall -Wextra
LDFLAGS += -z lazy

# External libraries (if not set outside, defaults to -lpthread)
LDLIBS ?= -lpthread

# Object Files
LOGGER_OBJ = $(LOGGER_DIR)/log.o
SOCK_OBJ = $(SOCK_DIR)/sock_util.o

# Build all binaries by default
all: $(BINARIES)

# Rules for each binary
thread_mutex: thread_mutex.o $(LOGGER_OBJ) $(SOCK_OBJ)
	$(CC) $(CPPFLAGS) $(CFLAGS) -o $@ $^ $(LDFLAGS) $(LDLIBS)

thread_sem: thread_sem.o $(LOGGER_OBJ) $(SOCK_OBJ)
	$(CC) $(CPPFLAGS) $(CFLAGS) -o $@ $^ $(LDFLAGS) $(LDLIBS)

proc_sem: proc_sem.o $(LOGGER_OBJ) $(SOCK_OBJ)
	$(CC) $(CPPFLAGS) $(CFLAGS) -o $@ $^ $(LDFLAGS) $(LDLIBS)

proc_flock: proc_flock.o $(LOGGER_OBJ) $(SOCK_OBJ)
	$(CC) $(CPPFLAGS) $(CFLAGS) -o $@ $^ $(LDFLAGS) $(LDLIBS)

# Logger Object
$(LOGGER_OBJ): $(LOGGER_DIR)/log.c $(LOGGER_DIR)/log.h
	$(CC) $(CPPFLAGS) $(CFLAGS) -c $< -o $@

# Socket Object
$(SOCK_OBJ): $(SOCK_DIR)/sock_util.c $(SOCK_DIR)/sock_util.h
	$(CC) $(CPPFLAGS) $(CFLAGS) -c $< -o $@

# Clean rule
clean:
	-rm -f $(BINARIES) *.o $(LOGGER_OBJ) $(SOCK_OBJ)

.PHONY: all clean
