# Local Procedure Call

## Application Development

All development work should be carried out exclusively within the [virtual machines dedicated to Operating Systems](https://cs-pub-ro.github.io/operating-systems/resources#virtual-machine).

**Note:**
It's crucial to avoid running tests locally, either on personal computers or within your allocated virtual machines.
Discrepancies might arise between local environments and the dedicated OS virtual machines.
Grading will consider results obtained solely in the OS virtual machine environment.

The core of this project revolves around the construction of a daemon capable of handling information passing between any number of local processes, split between services / servers and clients, to allow clients to call a function that a specific service / server exposes. This allows for similar functionalities to [gRPC](https://grpc.io/) but it doesn't require the use of network stack.

The project architecture relies on [local inter-process communication using named pipes](https://cs-pub-ro.github.io/operating-systems/IO/lab10/#task-named-pipes-communication). The dispatcher is responsible for managing the services and clients initialization and communication by providing a specific communication protocol. Below, you can see a diagram of the general architecture.

![Solution architecture](content-utils/architecture-light.svg#gh-dark-mode-only)
<!-- ![Solution architecture](content-utils/architecture-dark.svg#gh-light-mode-only) -->

### Implementation Details and Notes

The implementation involves developing a dispatcher that is able to receive install commands from different services and connect commands from different clients utilising [named pipes](https://cs-pub-ro.github.io/operating-systems/IO/lab10#task-named-pipes-communication). The dispatcher implements a basic protocol that can be seen in _`protocol/componests.h`_.

#### Protocol details

**Important:**
The header information is transmitted between service and clients in big-endian format.
Convert integers where it is needed. (Hint: **_htobe32_**, **_be32toh_**, etc.)

##### Service / Server

1. generates a install request using _`InstallRequestHeader`_ followed by the name of the pipe that the service will use to send its own information (the service decides the name of the pipe).

```c
/**
 * Install request
 *
 * Header
 * Install pipe name length (2 bytes)
 *
 * Contents
 * Install pipe name
 */
struct InstallRequestHeader {
    uint16_t m_IpnLen; /* The maximum length of the install pipe name */
}
```

1. using the pipe from _step 1_ (which the dispatcher has to create if needed) the service is going to send the information to make itself visible to clients using _`InstallHeader`_ followed by the proper information.

```c
/**
 * Install packet
 *
 * Header
 * \t Version length (1 byte)
 * \t Number of parameters (1 byte) - Not used in current version of the protocol
 * \t Call pipe name length (2 bytes)
 * \t Return pipe name length (2 bytes)
 * \t Access path length (2 bytes)
 *
 * Contents
 * \t Version (max 255 bytes)
 * \t Call pipe name (max 65_535 bytes)
 * \t Return pipe name (max 65_535 bytes)
 * \t Access path (max 65_535 bytes)
 * \t Parameters definition (max 255 * sizeof(ParameterInfo) bytes) - Not used in current version of the protocol
 */
struct InstallHeader {
    uint8_t m_VersionLen; /* The maximum length of the version */
    // uint8_t m_ParamDefLen; /* The maximum number of parameters definitions. */
    uint16_t m_CpnLen; /* The maximum length of the call pipe name */
    uint16_t m_RpnLen; /* The maximum length of the return pipe name */
    uint16_t m_ApLen; /* The maximum length of the access path */
}
```

**Note:**
The **access path** is going to be used by the clients to connect to a specific service.
The **call pipe** is used by the server to receive a procedure call and the **return pipe** is used to send the result of the procedure.

1. the service waits for calls from any client that might connect to it.

##### Client

1. generates a connect request using _`ConnectionRequestHeader`_ followed by the name of the pipe that the client will receive the information, if connection is possible, and the name of the access path of the service.

```c
/**
 * Connect request
 *
 * Header
 * Response pipe length (4 bytes) | Access path length (4 bytes)
 *
 * Contents
 * Connect pipe name | Access path
 */
struct ConnectionRequestHeader {
    uint32_t m_RpnLen; /* The maximum length of the response pipe name */
    uint32_t m_ApLen; /* The maximum length of the access path */
}
```

1. using the pipe from _step 1_ (which the dispatcher has to create if needed) the client is going to receive the information to communicate with the service / server using _`ConnectHeader`_ which is followed by the proper information.

```c
/**
 * Connect packet
 *
 * Header
 * \t Version length (1 byte)
 * \t Call pipe name length (4 bytes)
 * \t Return pipe name length (4 bytes)
 *
 * Contents
 * \t Version (max 255 bytes)
 * \t Call pipe name (max 4_294_967_295 bytes)
 * \t Return pipe name (max 4_294_967_295 bytes)
 */
struct ConnectHeader {
    uint8_t m_VersionLen; /* The maximum length of the version */
    uint32_t m_CpnLen; /* The maximum length of the call pipe name */
    uint32_t m_RpnLen; /* The maximum length of the return pipe name */
}
```

**Note:**
The **call pipe** is used by the client to send a procedure call and the **return pipe** is used to receive the result of the procedure.

1. the service can exit after receiving the information (the dispatcher **MUST** clean any internal information regarding this specific client)

    **Note:**
    The basic of the protocol doesn't need to be able to maintain a connection alive for more than one call request from the client

**Note:**
**All the pipes are created by the dispatcher in case they do not exist.**

#### Dispatcher implementation

**Important:**
The dispatcher must be implemented using multiple threads (possibly [detached](https://man7.org/linux/man-pages/man3/pthread_attr_init.3.html)) in order to obtain better performance such that the servers and clients do not get increased communication overhead.

Basic functionality:

- using _`mkfifo`_ for creating all the needed pipes
- creating two pipes between the dispatcher and each entity (an entity is a server or a client) with the proper permissions (each server can write or read, **NOT BOTH** from its own pipes without); while implementing and testing the permissions can be more permissive but the final solution should have only the minimum permissions when creating each pipe
  - the dispatcher pipes should be created inside the `.dispatcher` directory and every entity pipes should be created inside the `.pipes` directory
  - the pipe used for install requests must be called `install_req_pipe` and the pipe used for connect requests must be called `connection_req_pipe`; both pipes should be created in the `.dispatcher` directory
- the information is transferred fast between server and client (without too much delay); **HINT:** [iovec](https://man7.org/linux/man-pages/man3/iovec.3type.html)
- the dispacther runs all the time but it does not consume system resources when there is no transfer required
- the dispatcher handles system restrictions internally (eg. the size of the file descriptors table)
- the dispatcher follows the basic protocol as it is (**DO NOT** modify the basic protocol)
- the dispatcher should handle one service / server and multiple clients communication

**Important:**
Use the proper synchronisation mechanism for each action (eg. **DO NOT** use a spinlock when having blocking operations in the critical region without proper handling of the data transfer)

### Testing

#### Checker Run

You have a checker available for partial verification of your implementation.

The checker behaves as follows:

- it automatically builds the source files then it starts the `dispatcher` and `service`.
- it runs all the tests without restarting the `dispatcher` and `service`.
- it then kills the `dispatcher` and `service`.

For running the checker, please see below.

```bash
student@os:.../local-procedure-call$ cd checker

# Run the full test suite
student@os:.../local-procedure-call/checker$ ./run_tests.sh
[...]
```

**Important**
You can check [README.md](checker/README.md) for manual testing.
Be careful to start the `dispatcher` and `service` in the proper location when testing manually.

### Additional Tasks / Tie-breakers

All teams must implement the fundamental features as a base requirement.
Additionally, for differentiation purposes, teams have the option to introduce supplementary functionalities to the dispatcher.
Each added functionality should be thoroughly documented in a README file, providing details on its purpose and the testing methodologies employed.

Here are some potential additional functionalities to consider (or propose other relevant ones):

- The dispatcher checks the payloads for security issues (eg. it checks if the payload is a shell code).
- Protocol extension:
Add / Remove fields from the basic protocol to make it more robust.
- Allow multiple service / server - multiple clients communication.
- Advanced logging (good log format that is done asynchronously to not add overhead on runtime).
- Implementing a thread pool:
If you have multiple threads that do the same action you don't need to create a new thread each time, only a few and then only assign work to them.
- Real-time server monitoring and statistical extraction (e.g. clients per server, total requests per server, total data transferred per server, highest load time, etc.).
- Adapting the implementation to another programming language (the initial skeleton is in C, but the communication's nature allows implementation in any language meeting project requirements).
See the [restrictions](#restrictions) section.

### Restrictions

**Important:**
The dispatcher is implemented using the C programming language. If other language is used you have to:

- use a _low-level_ programming language
- keep the basic protocol functionality
- provide an implementation that can run any multiple operating systems without changing the code while still using named pipes (regardless of the system that it runs on)

**Important**
The dispatcher does not create more than 600 pipes at any point during data transfer.
