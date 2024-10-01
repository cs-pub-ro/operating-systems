# Compiler
CC = gcc

# Source files
SRCS = aslr.c

# Object files
OBJS = $(SRCS:.c=.o)

# Flags for compiling and linking
CFLAGS += -fno-stack-protector -fno-PIC
LDFLAGS += -no-pie

# Output binary
TARGET = aslr

# Default rule to build the target
all: $(TARGET)

# Rule to link the object files and create the binary
$(TARGET): $(OBJS)
	$(CC) $(OBJS) $(LDFLAGS) -o $(TARGET)

# Rule to compile the C source files into object files
%.o: %.c
	$(CC) $(CFLAGS) -c $< -o $@

# Clean rule to remove object files and the target binary
clean:
	rm -f $(OBJS) $(TARGET)

