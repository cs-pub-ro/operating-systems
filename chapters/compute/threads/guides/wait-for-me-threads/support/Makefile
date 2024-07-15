BINARY = wait_for_me_threads

all: $(BINARY)

CC = gcc

# Get the relative path to the directory of the current makefile.
MAKEFILE_DIR := $(dir $(lastword $(MAKEFILE_LIST)))
INCLUDES_DIR := $(MAKEFILE_DIR)..
UTILS_DIR := $(MAKEFILE_DIR)/utils
LOGGER_DIR := $(UTILS_DIR)/log

CPPFLAGS += -I$(INCLUDES_DIR)
CFLAGS += -g -Wall -Wextra
LDFLAGS += -z lazy
LOGGER_OBJ = log.o
LOGGER = $(LOGGER_DIR)/$(LOGGER_OBJ)

SRCS = $(wildcard *.c)
OBJS = $(SRCS:.c=.o)

$(LOGGER_OBJ): $(LOGGER_DIR)/log.c
	@make -C $(LOGGER_DIR) $(LOGGER_OBJ)

$(OBJS): %.o: %.c

clean::
	-rm -f $(OBJS) $(LOGGER)

.PHONY: clean

$(BINARY): $(OBJS) $(LOGGER)
	$(CC) $^ $(LDFLAGS) -o $@ $(LDLIBS)

clean::
	-rm -f $(BINARY)

.PHONY: all clean
