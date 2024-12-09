BINARIES = send_receive_pipe reader writer \
           send_fifo receive_fifo \
           send_unix_socket receive_unix_socket \
           send_net_dgram_socket receive_net_dgram_socket \
           send_net_stream_socket receive_net_stream_socket

CC = gcc
MAKEFILE_DIR := $(dir $(lastword $(MAKEFILE_LIST)))
INCLUDES_DIR := $(MAKEFILE_DIR)utils
LOGGER_DIR := $(INCLUDES_DIR)/log
SOCK_DIR := $(INCLUDES_DIR)/sock

CPPFLAGS += -I$(INCLUDES_DIR)
CFLAGS += -g -Wall -Wextra
LDFLAGS += -z lazy

# Object Files
LOGGER_OBJ = $(LOGGER_DIR)/log.o
SOCK_OBJ = $(SOCK_DIR)/sock_util.o

SRCS = $(wildcard *.c)
OBJS = $(SRCS:.c=.o)

# Build All Binaries
all: $(BINARIES)

# Rule to Build Each Binary
%: %.c $(LOGGER_OBJ) $(SOCK_OBJ)
	$(CC) $(CPPFLAGS) $(CFLAGS) -o $@ $^ $(LDFLAGS)

# Rule for Logger Object
$(LOGGER_OBJ): $(LOGGER_DIR)/log.c $(LOGGER_DIR)/log.h
	$(CC) $(CPPFLAGS) $(CFLAGS) -c $< -o $@

# Rule for Socket Object
$(SOCK_OBJ): $(SOCK_DIR)/sock_util.c $(SOCK_DIR)/sock_util.h
	$(CC) $(CPPFLAGS) $(CFLAGS) -c $< -o $@

# Clean Rule
clean:
	-rm -f $(BINARIES) $(OBJS) $(LOGGER_OBJ) $(SOCK_OBJ)

.PHONY: all clean
