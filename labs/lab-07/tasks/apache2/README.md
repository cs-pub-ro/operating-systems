---
parent: Lab 7 - Copy-on-Write
nav_order: 3
---

# Task: Apache2

Enter the `labs/lab-07/tasks/apache2/support/` folder and go through the practice items below.

1. Use `make run` to start the container.
   Use `strace` inside the container to discover the server document root.
   The document root is the path in the filesystem from where `httpd` serves all the files requested by the clients.

First, you will have to stop the running container using `make stop`, then restart it with `make run-privileged`.

1. Use `strace` inside the container to attach to the worker processes (use the `-p` option for this).
   You will also have to use the `-f` flag with `strace`, so that it will follow all the threads inside the processes.

1. After you have attached successfully to all worker processes, use the `curl` command to send a request.

1. Then check the `strace` output to see what files were opened by the server.

[Quiz](../../../quizzes/apache2-strace.md)

If you're having difficulties solving this exercise, go through [this](guides/apache2.md) reading material.
