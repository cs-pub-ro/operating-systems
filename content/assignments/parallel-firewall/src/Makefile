BUILD_DIR := build
UTILS_PATH ?= ../utils
CPPFLAGS := -I$(UTILS_PATH)
CFLAGS := -Wall -Wextra

CFLAGS += -ggdb -O0
LDLIBS := -lpthread

SRCS:= ring_buffer.c producer.c consumer.c packet.c $(UTILS_PATH)/log/log.c
HDRS := $(patsubst %.c,%.h,$(SRCS))
OBJS := $(patsubst %.c,%.o,$(SRCS))

.PHONY: all pack clean always

all: firewall serial

firewall: $(OBJS) firewall.o
	$(CC) $(CPPFLAGS) $(CFLAGS) -o $@ $^ $(LDLIBS)

serial: $(OBJS) serial.o
	$(CC) $(CPPFLAGS) $(CFLAGS) -o $@ $^ $(LDLIBS)

$(UTILS_PATH)/log/log.o: $(UTILS_PATH)/log/log.c $(UTILS_PATH)/log/log.h
	$(CC) $(CPPFLAGS) $(CFLAGS) -c -o $@  $<

pack: clean
	-rm -f ../src.zip
	zip -r ../src.zip *

clean:
	-rm -f $(OBJS) serial.o firewall.o
	-rm -f firewall serial
