# Time server

Navigate to `chapters/app-interact/time-server/drills/tasks/time-server/support`.
Try to figure out the protocol used by the server and the client.
You can do this by reading the source code, corroborated with information obtained at runtime.

Run the server again (the version in C), but instead of running the client, let's run `netcat` and pipe the output to `hexdump`:

```console
nc -d 127.0.0.1 2000 | hexdump -C
```

[Quiz](../drills/questions/time-server.md)

[Quiz](../drills/questions/time-server-interop.md)

If you're having difficulties solving this exercise, go through [this](../../../reading/time-server.md) reading material.
