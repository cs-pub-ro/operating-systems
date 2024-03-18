CC = gcc
SRCS = bo_write_practice.c
OBJS = $(SRCS:.c=.o)
CFLAGS += -fno-stack-protector -fno-PIC
LDFLAGS += -no-pie
TARGET = bo_write_practice

all: $(TARGET)

$(TARGET): $(OBJS)
	$(CC) $(OBJS) $(LDFLAGS) -o $(TARGET)

%.o: %.c
	$(CC) $(CFLAGS) -c $< -o $@

clean:
	rm -f $(OBJS) $(TARGET)
