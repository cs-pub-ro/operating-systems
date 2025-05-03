CC = gcc
SRCS = array_leak.c string_leak.c
OBJS = $(SRCS:.c=.o)
CFLAGS += -fno-stack-protector -fno-PIC
LDFLAGS += -no-pie
TARGETS = array_leak string_leak

all: $(TARGETS)

array_leak: array_leak.o
	$(CC) array_leak.o $(LDFLAGS) -o array_leak

string_leak: string_leak.o
	$(CC) string_leak.o $(LDFLAGS) -o string_leak

%.o: %.c
	$(CC) $(CFLAGS) -c $< -o $@

clean:
	rm -f $(OBJS) $(TARGETS)
