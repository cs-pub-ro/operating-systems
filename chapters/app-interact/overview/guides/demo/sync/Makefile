# List of executables to build
BINARIES = thread_sem thread_cond proc_sem_first proc_sem_second proc_sig_first proc_sig_second

# Default library flags if not provided externally
LDLIBS ?= -lpthread

CC = gcc
CFLAGS += -g -Wall -Wextra
LDFLAGS += -z lazy
CPPFLAGS +=

INCLUDES_DIR = utils
LOGGER_DIR = $(INCLUDES_DIR)/log
LOGGER_OBJ = $(LOGGER_DIR)/log.o

all: $(BINARIES)

# Compile log object
$(LOGGER_OBJ): $(LOGGER_DIR)/log.c $(LOGGER_DIR)/log.h
	$(CC) $(CPPFLAGS) $(CFLAGS) -c $< -o $@

# Generic rule for .o files
%.o: %.c
	$(CC) $(CPPFLAGS) $(CFLAGS) -c $< -o $@

# Link each executable with the logger object
thread_sem: thread_sem.o $(LOGGER_OBJ)
	$(CC) $(LDFLAGS) -o $@ $^ $(LDLIBS)

thread_cond: thread_cond.o $(LOGGER_OBJ)
	$(CC) $(LDFLAGS) -o $@ $^ $(LDLIBS)

proc_sem_first: proc_sem_first.o $(LOGGER_OBJ)
	$(CC) $(LDFLAGS) -o $@ $^ $(LDLIBS)

proc_sem_second: proc_sem_second.o $(LOGGER_OBJ)
	$(CC) $(LDFLAGS) -o $@ $^ $(LDLIBS)

proc_sig_first: proc_sig_first.o $(LOGGER_OBJ)
	$(CC) $(LDFLAGS) -o $@ $^ $(LDLIBS)

proc_sig_second: proc_sig_second.o $(LOGGER_OBJ)
	$(CC) $(LDFLAGS) -o $@ $^ $(LDLIBS)

clean:
	rm -f $(BINARIES) *.o $(LOGGER_OBJ)

.PHONY: all clean
