# Inspecting the Low-level Communication

Let's run `gdbus` under `strace` to see what's happening behind the scenes.
Run the script in `support/dbus/send_notification_strace.sh`:

```console
strace: Process 61888 attached
[pid 61887] socket(AF_UNIX, SOCK_STREAM|SOCK_CLOEXEC, 0) = 5
[pid 61887] connect(5, {sa_family=AF_UNIX, sun_path="/run/user/1000/bus"}, 110) = 0
[pid 61887] sendmsg(5, {msg_name=NULL, msg_namelen=0, msg_iov=[{iov_base="\0", iov_len=1}], msg_iovlen=1,
msg_control=[{cmsg_len=28, cmsg_level=SOL_SOCKET, cmsg_type=SCM_CREDENTIALS, cmsg_data={pid=61887,
uid=1000, gid=1000}}],
msg_controllen=32, msg_flags=0}, MSG_NOSIGNAL) = 1
strace: Process 61889 attached

[...]

[pid 61889] sendmsg(5, {msg_name=NULL, msg_namelen=0, msg_iov=[{iov_base="l\1\0\1T\0\0\0\3\0\0\0\237\0\0\0\1
\1o\0\36\0\0\0/org/freedesktop/Notifications\0\0\2\1s\0\35\0\0\0org.freedesktop.Notifications\0\0\0\6\1s\0\35
\0\0\0org.freedesktop.Notifications\0\0\0\10\1g\0\rsusssasa{sv}i\0\0\0\0\0\0\3\1s\0\6\0\0\0Notify\0\0\0\0\0\0
\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\21\0\0\0This is the title\0\0\0\23\0\0\0This is the content\0\0\0\0\0\0\0\0\0
\0\0\0\0\377\377\377\377", iov_len=260}], msg_iovlen=1, msg_controllen=0,
 msg_flags=0}, MSG_NOSIGNAL) = 260
[pid 61889] recvmsg(5, {msg_name=NULL, msg_namelen=0, msg_iov=[{iov_base="l\2\1\1\4\0\0\0\312\0\0\0.\0\0\0", iov_len=16}],
msg_iovlen=1, msg_controllen=0, msg_flags=MSG_CMSG_CLOEXEC}, MSG_CMSG_CLOEXEC) = 16
[pid 61889] recvmsg(5, {msg_name=NULL, msg_namelen=0, msg_iov=[{iov_base="\6\1s\0\6\0\0\0:1.497\0\0\10\1g\0\1u\0\0\5\1u\0
\3\0\0\0\7\1s\0\5\0\0\0:1.49\0\0\0\36\0\0\0", iov_len=52}], msg_iovlen=1, msg_controllen=0, msg_flags=MSG_CMSG_CLOEXEC}, MSG_CMSG_CLOEXEC) = 52
(uint32 30,)
[pid 61889] +++ exited with 0 +++
[pid 61888] +++ exited with 0 +++
+++ exited with 0 +++
```

We see a Unix socket being created and a connection made to `/run/user/1000/bus`, as expected.
Then a series of messages are exchanged on the socket, which are part of the D-Bus protocol.
On a closer look, we can even identify some strings from our notification, like `This is the title` or `This is the content`:

```console
[pid 61889] sendmsg(5, {msg_name=NULL, msg_namelen=0, msg_iov=[{iov_base="l\1\0\1T\0\0\0\3\0\0\0\237\0\0\0\1
\1o\0\36\0\0\0/org/freedesktop/Notifications\0\0\2\1s\0\35\0\0\0org.freedesktop.Notifications\0\0\0\6\1s\0\35
\0\0\0org.freedesktop.Notifications\0\0\0\10\1g\0\rsusssasa{sv}i\0\0\0\0\0\0\3\1s\0\6\0\0\0Notify\0\0\0\0\0\0
\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\21\0\0\0This is the title\0\0\0\23\0\0\0This is the content\0\0\0\0\0\0\0\0\0
\0\0\0\0\377\377\377\377", iov_len=260}], msg_iovlen=1, msg_controllen=0,
```
