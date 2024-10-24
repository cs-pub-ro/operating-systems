# `apache2` Live Action

Let's run an actual instance of `apache2` and see how everything works.
Go to `apache2/support` and run `make run`.
This will start a container with `apache2` running inside.

Check that the server runs as expected:

```console
student@os:~$ curl localhost:8080
<html><body><h1>It works!</h1></body></html>
```

Now go inside the container and take a look at running processes:

```console
student@os:~/.../apache2/support$ docker exec -it apache2-test bash

root@56b9a761d598:/usr/local/apache2# ps -ef
UID          PID    PPID  C STIME TTY          TIME CMD
root           1       0  0 20:38 pts/0    00:00:00 httpd -DFOREGROUND
www-data       9       1  0 20:38 pts/0    00:00:00 httpd -DFOREGROUND
www-data      10       1  0 20:38 pts/0    00:00:00 httpd -DFOREGROUND
root          25       0  0 20:40 pts/1    00:00:00 bash
root          31      25  0 20:40 pts/1    00:00:00 ps -ef
```

We see 3 `httpd` processes.
The first one, running as root, is the main process, while the other 2 are the workers.

Let's confirm that we are using the `event` mpm:

```console
root@56b9a761d598:/usr/local/apache2# grep mod_mpm conf/httpd.conf
LoadModule mpm_event_module modules/mod_mpm_event.so
LoadModule mpm_prefork_module modules/mod_mpm_prefork.so
LoadModule mpm_worker_module modules/mod_mpm_worker.so
```

The `event` mpm is enabled, so we expect each worker to be multithreaded.
Let's check:

```console
root@56b9a761d598:/usr/local/apache2# ps -efL
UID          PID    PPID     LWP  C NLWP STIME TTY          TIME CMD
root           1       0       1  0    1 20:56 pts/0    00:00:00 httpd -DFOREGROUND
www-data       8       1       8  0    7 20:56 pts/0    00:00:00 httpd -DFOREGROUND
www-data       8       1      11  0    7 20:56 pts/0    00:00:00 httpd -DFOREGROUND
www-data       8       1      12  0    7 20:56 pts/0    00:00:00 httpd -DFOREGROUND
www-data       8       1      16  0    7 20:56 pts/0    00:00:00 httpd -DFOREGROUND
www-data       8       1      17  0    7 20:56 pts/0    00:00:00 httpd -DFOREGROUND
www-data       8       1      18  0    7 20:56 pts/0    00:00:00 httpd -DFOREGROUND
www-data       8       1      19  0    7 20:56 pts/0    00:00:00 httpd -DFOREGROUND
www-data       9       1       9  0    7 20:56 pts/0    00:00:00 httpd -DFOREGROUND
www-data       9       1      14  0    7 20:56 pts/0    00:00:00 httpd -DFOREGROUND
www-data       9       1      15  0    7 20:56 pts/0    00:00:00 httpd -DFOREGROUND
www-data       9       1      20  0    7 20:56 pts/0    00:00:00 httpd -DFOREGROUND
www-data       9       1      21  0    7 20:56 pts/0    00:00:00 httpd -DFOREGROUND
www-data       9       1      22  0    7 20:56 pts/0    00:00:00 httpd -DFOREGROUND
www-data       9       1      23  0    7 20:56 pts/0    00:00:00 httpd -DFOREGROUND
root          24       0      24  1    1 20:56 pts/1    00:00:00 bash
root          30      24      30  0    1 20:56 pts/1    00:00:00 ps -efL
```

Indeed, each worker has 7 threads.
In fact, the number of threads per worker is configurable, as well as the number of initial workers.

When a new connection is created, it will be handled by whatever thread is available from any worker.
If all the threads are busy, then the server will spawn more worker processes (and therefore more threads), as long as the total number of threads is below some threshold, which is also configurable.

Let's see this dynamic scaling in action.
We need to create a number of simultaneous connections that is larger than the current number of threads.
There is a simple script in `/apache2/supportmake_conn.py` to do this:

```console
student@os:~/.../apache2/support$ python3 make_conn.py localhost 8080
Press ENTER to exit
```

The script has created 100 connections and will keep them open until we press Enter.

Now, in another terminal, let's check the situation inside the container:

```console
student@os:~/.../apache2/support$ docker exec -it apache2-test bash

root@56b9a761d598:/usr/local/apache2# ps -efL
UID          PID    PPID     LWP  C NLWP STIME TTY          TIME CMD
root           1       0       1  0    1 20:56 pts/0    00:00:00 httpd -DFOREGROUND
www-data      40       1      40  0    7 21:07 pts/0    00:00:00 httpd -DFOREGROUND
www-data      40       1      45  0    7 21:07 pts/0    00:00:00 httpd -DFOREGROUND
www-data      40       1      46  0    7 21:07 pts/0    00:00:00 httpd -DFOREGROUND
www-data      40       1      51  0    7 21:07 pts/0    00:00:00 httpd -DFOREGROUND
www-data      40       1      52  0    7 21:07 pts/0    00:00:00 httpd -DFOREGROUND
www-data      40       1      53  0    7 21:07 pts/0    00:00:00 httpd -DFOREGROUND
www-data      40       1      54  0    7 21:07 pts/0    00:00:00 httpd -DFOREGROUND
www-data      55       1      55  0    7 21:07 pts/0    00:00:00 httpd -DFOREGROUND
www-data      55       1      58  0    7 21:07 pts/0    00:00:00 httpd -DFOREGROUND
www-data      55       1      60  0    7 21:07 pts/0    00:00:00 httpd -DFOREGROUND
www-data      55       1      62  0    7 21:07 pts/0    00:00:00 httpd -DFOREGROUND
www-data      55       1      63  0    7 21:07 pts/0    00:00:00 httpd -DFOREGROUND
www-data      55       1      65  0    7 21:07 pts/0    00:00:00 httpd -DFOREGROUND
www-data      55       1      66  0    7 21:07 pts/0    00:00:00 httpd -DFOREGROUND
[...]
www-data     109       1     109  0    7 21:07 pts/0    00:00:00 httpd -DFOREGROUND
www-data     109       1     115  0    7 21:07 pts/0    00:00:00 httpd -DFOREGROUND
www-data     109       1     116  0    7 21:07 pts/0    00:00:00 httpd -DFOREGROUND
www-data     109       1     121  0    7 21:07 pts/0    00:00:00 httpd -DFOREGROUND
www-data     109       1     122  0    7 21:07 pts/0    00:00:00 httpd -DFOREGROUND
www-data     109       1     123  0    7 21:07 pts/0    00:00:00 httpd -DFOREGROUND
www-data     109       1     124  0    7 21:07 pts/0    00:00:00 httpd -DFOREGROUND
root         146       0     146  0    1 21:10 pts/1    00:00:00 bash
root         152     146     152  0    1 21:10 pts/1    00:00:00 ps -efL
```

We see a much larger number of threads, as expected.
