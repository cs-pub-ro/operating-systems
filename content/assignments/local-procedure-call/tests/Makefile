SERVICE_NAME := service
CLIENT_MANAGER_NAME := client-manager
COMPILER=g++

all: build

build: $(SERVICE_NAME) $(CLIENT_MANAGER_NAME)

$(SERVICE_NAME): service.cpp ../src/protocol/components.h
	$(COMPILER) -o $(SERVICE_NAME) service.cpp

$(CLIENT_MANAGER_NAME): client-manager.cpp ../src/protocol/components.h
	$(COMPILER) -o $(CLIENT_MANAGER_NAME) client-manager.cpp

run-service:
	./$(SERVICE_NAME)

run-client-manager:
	./$(CLIENT_MANAGER_NAME)

clean:
	rm $(SERVICE_NAME) $(CLIENT_MANAGER_NAME)
