DISPATCHER_NAME := dispatcher
COMPILER=gcc

all: build

build: $(DISPATCHER_NAME)

$(DISPATCHER_NAME): dispatcher.o
	$(COMPILER) -o $(DISPATCHER_NAME) dispatcher.o -lpthread

dispatcher.o: dispatcher.c
	$(COMPILER) -c dispatcher.c -o dispatcher.o

run-dispatcher:
	./$(DISPATCHER_NAME)

clean:
	rm $(DISPATCHER_NAME) *.o
