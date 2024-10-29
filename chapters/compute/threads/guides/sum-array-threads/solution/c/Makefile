BINARIES = add_array_threads_openmp
CFLAGS += -fopenmp
LDFLAGS += -fopenmp

all: $(BINARIES)

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

$(BINARIES): $(LOGGER)

clean::
	-rm -f $(BINARIES)

.PHONY: all clean

sum_array_sequential: sum_array_sequential.o generate_random_array.o

sum_array_threads: sum_array_threads.o generate_random_array.o

sum_array_processes: sum_array_processes.o generate_random_array.o

sum_array_threads_openmp: sum_array_threads_openmp.o generate_random_array.o
