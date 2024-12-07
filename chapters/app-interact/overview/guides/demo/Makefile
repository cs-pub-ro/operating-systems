
BINARIES = send_receive_pipe reader writer \
	   send_fifo receive_fifo \
	   send_unix_socket receive_unix_socket \
	   send_net_dgram_socket receive_net_dgram_socket \
	   send_net_stream_socket receive_net_stream_socket

# Compiler and flags
CC = gcc
CFLAGS = -g -Wall -Wextra
LDFLAGS = -z lazy

# Source files and corresponding object files
SRCS = $(BINARIES:=.c)
OBJS = $(SRCS:.c=.o)

# Default rule: build all binaries
all: $(BINARIES)

# Rule to compile object files from source files
%.o: %.c
	$(CC) $(CFLAGS) -c $< -o $@

# Rule to create binaries
$(BINARIES): %: %.o utils/sock/sock_util.o
	$(CC) $(LDFLAGS) $^ -o $@

# Rule to compile the sock_util object
utils/sock/sock_util.o: utils/sock/sock_util.c
	$(CC) $(CFLAGS) -c $< -o $@

# Clean rule: Remove object files and binaries
clean:
	-rm -f $(OBJS) $(BINARIES) utils/sock/sock_util.o
	-rm -f socket_channel
	-rm -f fifo_channel