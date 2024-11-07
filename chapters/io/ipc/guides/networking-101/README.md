# Networking 101

In this section, we will **briefly** explore how networking works in general, from the perspective of the application.
Understanding the details of it, however, is beyond the scope of this course.

The main **protocols** used by applications are **User Datagram Protocol (UDP)** and **Transmission Control Protocol (TCP)**.

UDP is the simpler of the two protocols.
It simply sends data to a receiver identified by an IP and port.
It does not care whether the receiver has got all the data, whether it was corrupted or dropped altogether by some router along the way.

At first glance, UDP might seem useless due to its lack of reliability checks.
However, this simplicity makes UDP **fast**.
As a result, it is often used for **real-time services**, such as video streaming or voice calls, where minor data losses (like dropped frames) are less problematic because they are quickly replaced by new data, masking any errors.

On the other hand, TCP offers **reliability**.
It ensures that data is received correctly by performing error checks and retransmitting any lost or corrupted packets.
This makes TCP ideal for applications that require guaranteed delivery, such as **web browsing** or **file transfers**, where accuracy and completeness are critical.

## Local TCP and UDP Services

To get a full list of all network-handling processes in your system together with the protocols they're using, we can use the `netstat` with the `-tuanp` arguments.
`-tuanp` is short for `-t -u -a -n -p`, which stand for:

- `-t`: list processes using the TCP protocol
- `-u`: list processes using the UDP protocol
- `-a`: list both servers and clients
- `-n`: list IPs in numeric format
- `-p`: show the PID and name of each program

```console
student@os:~$ sudo netstat -tunp
Active Internet connections (w/o servers)
Proto Recv-Q Send-Q Local Address           Foreign Address         State       PID/Program name
tcp        0      0 0.0.0.0:22              0.0.0.0:*               LISTEN      1057/sshd: /usr/sbi
tcp        0      0 127.0.0.1:6463          0.0.0.0:*               LISTEN      3261/Discord --type
tcp        0      0 192.168.100.2:51738     162.159.128.235:443     ESTABLISHED 3110/Discord --type
tcp        0      0 192.168.100.2:43694     162.159.129.235:443     ESTABLISHED 3110/Discord --type
tcp        0      0 192.168.100.2:56230     54.230.159.113:443      ESTABLISHED 9154/firefox
tcp        0      0 192.168.100.2:38096     34.107.141.31:443       ESTABLISHED 9154/firefox
tcp        0      0 192.168.100.2:42462     34.117.237.239:443      ESTABLISHED 9154/firefox
tcp        0      0 192.168.100.2:41128     162.159.135.234:443     ESTABLISHED 3110/Discord --type
tcp6       0      0 :::80                   :::*                    LISTEN      1114/apache2
tcp6       0      0 :::22                   :::*                    LISTEN      1057/sshd: /usr/sbi
tcp6       0      0 2a02:2f0a:c10f:97:55754 2a02:2f0c:dff0:b::1:443 ESTABLISHED 9154/firefox
tcp6       0      0 2a02:2f0a:c10f:97:55750 2a02:2f0c:dff0:b::1:443 ESTABLISHED 9154/firefox
udp        0      0 0.0.0.0:56585           0.0.0.0:*                           3261/Discord --type
udp        0      0 0.0.0.0:42629           0.0.0.0:*                           3261/Discord --type
udp6       0      0 :::52070                :::*                                9154/firefox
udp6       0      0 :::38542                :::*                                9154/firefox
```

Your output will likely differ from the example above.
Let’s focus on the fourth column, which displays the local address and port in use by each process.
The first 1024 ports are reserved for well-known applications, ensuring consistency across networks.
For example, `SSH` uses port `22` and `Apache2` uses port `80` for both IPv4 and IPv6 addresses (look for rows starting with `tcp` for IPv4 and `tcp6` for IPv6).

Some user programs, like Firefox, establish multiple connections, often using both IPv4 and IPv6, with each connection assigned a unique port.
Discord is another example, using TCP to handle text messages, images, videos, and other static content, while relying on UDP for real-time voice and video data during calls.

[Quiz: Why does Firefox uses both TCP and UDP?](../../drills/questions/firefox-tcp-udp.md)

## Conclusion

The difference between TCP and UDP can be summarised as follows:

![TCP vs UDP](../../media/tcp-udp-simplified.png)
