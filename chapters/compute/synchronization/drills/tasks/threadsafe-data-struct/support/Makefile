TARGET = test
TARGET_PARALLEL = test_parallel

all: $(TARGET) $(TARGET_PARALLEL)

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

LIB_OBJECTS = clist.o
LIBRARY = libclist.a
TEST_OBJECTS = test.o $(LIBRARY)
TEST_OBJECTS_PARALLEL = test_parallel.o $(LIBRARY)

LDLIBS = -lpthread

$(LIBRARY): $(LIB_OBJECTS)
	ar rcs $(LIBRARY) $(LIB_OBJECTS)

$(TARGET): $(TEST_OBJECTS)
	$(CC) $^ -o $@ $(LDLIBS)

$(TARGET_PARALLEL): $(TEST_OBJECTS_PARALLEL)
	$(CC) $^ -o $@ $(LDLIBS)

clean::
	-rm -f $(LIBRARY) $(TARGET) $(TARGET_PARALLEL)
