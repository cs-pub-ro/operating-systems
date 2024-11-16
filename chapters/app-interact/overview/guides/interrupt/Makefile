BINARIES = signal_printer rt_signal_printer signal_sender signal_sender_sleep rt_signal_sender

CC = gcc
MAKEFILE_DIR := $(dir $(lastword $(MAKEFILE_LIST)))
INCLUDES_DIR := $(MAKEFILE_DIR)utils
LOGGER_DIR := $(INCLUDES_DIR)/log

CPPFLAGS += -I$(INCLUDES_DIR)
CFLAGS += -g -Wall -Wextra
LDFLAGS += -z lazy
LOGGER_OBJ = $(LOGGER_DIR)/log.o

SRCS = $(wildcard *.c)
OBJS = $(SRCS:.c=.o)

all: $(BINARIES)

%: %.c $(LOGGER_OBJ)
	$(CC) $(CPPFLAGS) $(CFLAGS) -o $@ $^ $(LDFLAGS)

$(LOGGER_OBJ): $(LOGGER_DIR)/log.c
	$(CC) $(CPPFLAGS) $(CFLAGS) -c $< -o $@

clean:
	-rm -f $(BINARIES) $(OBJS) $(LOGGER_OBJ)

.PHONY: all clean
