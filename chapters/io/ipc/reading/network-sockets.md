# Network Sockets

Network sockets are an inter-process communication (IPC) method that enables communication between processes on different hosts.
They are managed through the [Berkeley Sockets API](https://en.wikipedia.org/wiki/Berkeley_sockets), which is widely supported across various operating systems and programming languages.
The API is further explored in the [Unix sockets section](../reading/unix-sockets.md).
This section focuses on identifying peer processes and establishing connections between them.

## Addresses and Ports

The most crucial aspect of remote I/O is identifying the correct endpoint for communication.
Whether you are connecting to a website or a Minecraft server, you need a reliable way to specify the application you want to interact with.
This is where IP addresses and ports come into play.

An **IP address** is a unique numerical label assigned to each device on a network.
It functions like a mailing address, ensuring that data packets reach the correct destination.
For example, if you want to access a website, your browser connects to the server's IP address, so that the server knows where to send the requested data.
But what if there is more than one server running at that IP address?

This is the reason we need ports.
A port is simply a **number** that **uniquely identifies a connection** on a device.
When an application performs remote I/O, it requests a port from the operating system and begins listening for incoming data on that port.
However, how do clients know which port the application is using?
Typically, this information is transmitted by user or established by convention.
For instance, popular applications have predefined ports: `SSH` uses port `22`, `HTTP` operates on port `80`, and `HTTPS` defaults to port `443`.

**Note**: In most cases, you don’t interact with IP addresses and ports directly.
For example, when you access `https://cs-pub-ro.github.io/operating-systems/`, you don’t see any numbers.
Behind the scenes, the [DNS](https://www.ibm.com/topics/dns) translates the domain name cs-pub-ro.github.io to its corresponding IP address, while the HTTPS protocol automatically uses port 443 by default.

**Note:** You can use network sockets for communication between local processes.
Each host provides a `localhost` address (commonly `127.0.0.1`) or a loopback address that can be used for this purpose.

Let's take a coding example to see how addresses and ports are used to identify a process over the network:

```c
#define PORT 12345
struct sockaddr_in addr;  // Structure to hold the address for the network socket.

memset(&addr, 0, sizeof(addr));                         // Clear the address structure.
addr.sin_family = AF_INET;                              // Set the address family to IPv4.
server_addr.sin_addr.s_addr = inet_addr("127.0.0.1");   // Set the server's IP address (localhost).
addr.sin_port = htons(PORT);                            // Set the port number.

int sockfd = socket(AF_INET, SOCK_STREAM, 0);           // Create the socket.
if (sockfd < 0) {...} // handle error

int rc = bind(sockfd, (struct sockaddr *) &addr, sizeof(addr)); // Bind the socket.
if (rc < 0) {...} // handle error
```

You can practice working with network sockets by completing the [Network Sockets Communication task](../drills/tasks/network-socket/README.md).
