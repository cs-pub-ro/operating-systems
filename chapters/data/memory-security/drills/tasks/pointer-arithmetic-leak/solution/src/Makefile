CC = gcc
SRCS = buff_leak.c
OBJS = $(SRCS:.c=.o)
CFLAGS += -fno-stack-protector -fno-PIC
LDFLAGS += -no-pie
TARGET = buff_leak

all: $(TARGET)

$(TARGET): $(OBJS)
	$(CC) $(OBJS) $(LDFLAGS) -o $(TARGET)

%.o: %.c
	$(CC) $(CFLAGS) -c $< -o $@

clean:
	rm -f $(OBJS) $(TARGET)
