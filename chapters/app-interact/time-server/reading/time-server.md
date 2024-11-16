# Time Server

Check out the code in `chapters/app-interact/time-server/support/server.c` and `chapters/app-interact/time-server/support/client.c`.

This is a simple program consisting of a server and a client.
The server uses a tcp socket to wait for connections.
Once a client has connected, the server will send the current time to it.
The client will then print the received time to the console.

Let's build and run this example:

```console
student@os:~/.../support$ make
student@os:~/.../support$ ./server
```

Then, in another terminal:

```console
student@os:~/.../support$ ./client 127.0.0.1 2000
The time is Thu Sep  1 11:48:03 2022
```

## Python Version

In `chapters/app-interact/time-server/support/python` we have the equivalent python implementation for both the server and client:

```console
student@os:~/.../support/python$ python3 server.py
```

```console
student@os:~/.../support/python$ python3 client.py 127.0.0.1 2000
The time is Thu Sep  1 11:58:01 2022
```
