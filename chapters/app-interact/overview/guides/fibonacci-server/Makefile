BINARIES = server mt_server mp_server mt_pool_server mp_pool_server_works

CC = gcc
MAKEFILE_DIR := $(dir $(lastword $(MAKEFILE_LIST)))
INCLUDES_DIR := $(MAKEFILE_DIR)utils
LOGGER_DIR := $(INCLUDES_DIR)/log
SOCK_DIR := $(INCLUDES_DIR)/sock

CPPFLAGS += -I$(INCLUDES_DIR)
CFLAGS += -g -Wall -Wextra
LDFLAGS += -z lazy

LOGGER_OBJ = $(LOGGER_DIR)/log.o
SOCK_OBJ = $(SOCK_DIR)/sock_util.o
CONNECTIONS_OBJ = connection.o
TASK_OBJ = task.o

all: $(BINARIES)

server: server.o $(LOGGER_OBJ) $(SOCK_OBJ) $(CONNECTIONS_OBJ)
	$(CC) $(CPPFLAGS) $(CFLAGS) -o $@ $^ $(LDFLAGS)

mt_server: mt_server.o $(LOGGER_OBJ) $(SOCK_OBJ) $(CONNECTIONS_OBJ)
	$(CC) $(CPPFLAGS) $(CFLAGS) -o $@ $^ $(LDFLAGS)

mp_server: mp_server.o $(LOGGER_OBJ) $(SOCK_OBJ) $(CONNECTIONS_OBJ)
	$(CC) $(CPPFLAGS) $(CFLAGS) -o $@ $^ $(LDFLAGS)

mt_pool_server: mt_pool_server.o $(LOGGER_OBJ) $(SOCK_OBJ) $(CONNECTIONS_OBJ) $(TASK_OBJ)
	$(CC) $(CPPFLAGS) $(CFLAGS) -o $@ $^ $(LDFLAGS)

mp_pool_server_works: mp_pool_server_works.o $(LOGGER_OBJ) $(SOCK_OBJ) $(CONNECTIONS_OBJ) $(TASK_OBJ)
	$(CC) $(CPPFLAGS) $(CFLAGS) -o $@ $^ $(LDFLAGS)

$(LOGGER_OBJ): $(LOGGER_DIR)/log.c $(LOGGER_DIR)/log.h
	$(CC) $(CPPFLAGS) $(CFLAGS) -c $< -o $@

$(SOCK_OBJ): $(SOCK_DIR)/sock_util.c $(SOCK_DIR)/sock_util.h
	$(CC) $(CPPFLAGS) $(CFLAGS) -c $< -o $@

$(CONNECTIONS_OBJ): connection.c connection.h
	$(CC) $(CPPFLAGS) $(CFLAGS) -c $< -o $@

$(TASK_OBJ): task.c task.h
	$(CC) $(CPPFLAGS) $(CFLAGS) -c $< -o $@

clean:
	rm -f $(BINARIES) *.o $(LOGGER_OBJ) $(SOCK_OBJ) $(CONNECTIONS_OBJ) $(TASK_OBJ)

.PHONY: all clean
