# List Open Files

Use the [`lsof` command](https://man7.org/linux/man-pages/man8/lsof.8.html) to list the open I/O channels of a given process.
This prints the channels that a process uses to interact with the outside world.

To list the I/O channels (the file descriptors) of the current process (shell), use:

```console
$ lsof -p $$ -a -d 0-1023
COMMAND  PID   USER   FD   TYPE DEVICE SIZE/OFF NODE NAME
bash    8851 razvan    0u   CHR 136,10      0t0   13 /dev/pts/10
bash    8851 razvan    1u   CHR 136,10      0t0   13 /dev/pts/10
bash    8851 razvan    2u   CHR 136,10      0t0   13 /dev/pts/10
bash    8851 razvan  255u   CHR 136,10      0t0   13 /dev/pts/10
```

The shell opens up the standard descriptors (`0` - _standard input_, `1` - _standard output_, `2` - _standard error_) to interact with the terminal (`/dev/pts/10`).

The list the I/O channels (the file descriptors) of the most memory consuming process, use:

```console
$ lsof -p $(ps -e -o pid --sort rss | tail -1 | tr -d ' ') -a -d 0-1023
COMMAND   PID   USER   FD      TYPE             DEVICE SIZE/OFF     NODE NAME
slack   13096 razvan    0r      CHR                1,3      0t0        5 /dev/null
slack   13096 razvan    1w      CHR                1,3      0t0        5 /dev/null
slack   13096 razvan    2w      CHR                1,3      0t0        5 /dev/null
slack   13096 razvan    3u  a_inode               0,16        0     2078 [eventpoll:12]
slack   13096 razvan    4u     unix 0x0000000000000000      0t0    53447 type=SEQPACKET (CONNECTED)
slack   13096 razvan    5r      REG               7,35 10467680       58 /snap/slack/216/usr/lib/slack/icudtl.dat
slack   13096 razvan    6r      REG               7,35   712173      194 /snap/slack/216/usr/lib/slack/v8_context_snapshot.bin
slack   13096 razvan    7r      REG               7,35   167701       55 /snap/slack/216/usr/lib/slack/chrome_100_percent.pak
slack   13096 razvan    8r      REG               7,35   259856       56 /snap/slack/216/usr/lib/slack/chrome_200_percent.pak
slack   13096 razvan    9r      REG               7,35   522408       76 /snap/slack/216/usr/lib/slack/locales/en-US.pak
slack   13096 razvan   10r      REG               7,35  6343268      191 /snap/slack/216/usr/lib/slack/resources.pak
slack   13096 razvan   11r      CHR                1,9      0t0       10 /dev/urandom
slack   13096 razvan   12u  a_inode               0,16        0     2078 [eventfd:127]
slack   13096 razvan   13u     unix 0x0000000000000000      0t0    55344 type=STREAM (CONNECTED)
slack   13096 razvan   14u     unix 0x0000000000000000      0t0    54537 @19b75 type=SEQPACKET (CONNECTED)
[...]
```

The process is Slack.
The I/O channels are varied pointing out to `/dev/null`, regular files, UNIX-domain / local sockets and event interfaces.
