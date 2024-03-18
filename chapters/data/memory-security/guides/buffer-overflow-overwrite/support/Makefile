CC = gcc
SRCS = bo_write.c bo_write_practice.c
OBJS = $(SRCS:.c=.o)
CFLAGS += -fno-stack-protector -fno-PIC
LDFLAGS += -no-pie
TARGETS = bo_write bo_write_practice

all: $(TARGETS)

bo_write: bo_write.o
	$(CC) bo_write.o $(LDFLAGS) -o bo_write

bo_write_practice: bo_write_practice.o
	$(CC) bo_write_practice.o $(LDFLAGS) -o bo_write_practice

%.o: %.c
	$(CC) $(CFLAGS) -c $< -o $@

clean:
	rm -f $(OBJS) $(TARGETS)
