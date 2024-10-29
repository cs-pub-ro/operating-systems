CC = gcc
CFLAGS = -Wall -Wextra -pthread
INCLUDES = -I./utils -I./log

SRC_OUTER = race_condition_outer_mutex.c ../utils/log/log.c
SRC_INNER = race_condition_inner_mutex.c ../utils/log/log.c
TARGET_OUTER = race_condition_outer_mutex
TARGET_INNER = race_condition_inner_mutex

all: $(TARGET_OUTER) $(TARGET_INNER)

build: all

$(TARGET_OUTER): $(SRC_OUTER)
	$(CC) $(CFLAGS) $(INCLUDES) $(SRC_OUTER) -o $(TARGET_OUTER)

$(TARGET_INNER): $(SRC_INNER)
	$(CC) $(CFLAGS) $(INCLUDES) $(SRC_INNER) -o $(TARGET_INNER)

clean:
	rm -f $(TARGET_OUTER) $(TARGET_INNER)

.PHONY: all clean build
