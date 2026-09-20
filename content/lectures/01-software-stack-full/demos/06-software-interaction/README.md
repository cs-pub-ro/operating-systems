# Demo: A Web Application Is Four Programs Talking

One `docker compose up` starts a web server, an application runtime, a database and an administration interface.
None of them knows what the others are; each one only knows an interface.

## Goal

Show that the stack is not only vertical.
A running system is also a set of peers, each of them a stack in its own right, connected by protocols instead of by function calls.

## Background

The setup in [`docker-wordpress-nginx/`](docker-wordpress-nginx) is a standard WordPress deployment, split into four containers:

| Container | What it is | How it is reached |
| --- | --- | --- |
| `nginx` | web server | HTTP, on port 8080 |
| `php` | PHP-FPM, running WordPress | FastCGI, over a socket |
| `mariadb` | relational database | the MySQL wire protocol, on port 3306 |
| `phpmyadmin` | a web UI for the database | HTTP, on port 8183 |

Follow one request through it.
A browser sends `GET /` over HTTP to nginx.
nginx serves static files itself, and for a `.php` path it speaks FastCGI to the `php` container instead.
WordPress, running there, decides it needs a post, and speaks the MySQL protocol to `mariadb`.
MariaDB reads the row -- through libc, through the kernel's file I/O, off the page cache we met in the pitch -- and answers.
The answer travels back up the same three hops, and the browser renders it.

Four interfaces are crossed on the way: a UI, HTTP, FastCGI and the MySQL protocol.
Three of them are protocols between separate processes; none of them is a function call.
That is the difference between a *library*, which you link into your program, and a *service*, which you talk to.

`phpmyadmin` is the same argument from the other side: it is a completely different application, written by different people, which works against `mariadb` because it speaks the same protocol.
The database has no idea whether its client is WordPress or a browser-based admin tool, and that is exactly why both can exist.

## Build and run

Docker and the Compose plugin are needed.
WordPress itself is not in the repository; download it into `www/` first, as the imported README explains.

```console
cd docker-wordpress-nginx
docker compose up -d
docker compose ps
```

Then open <http://localhost:8080/> for the site and <http://localhost:8183/> for phpMyAdmin.

Stop it with:

```console
docker compose down
```

## Results and explanations

The interesting part is not the web page; it is the traffic.

Watch the containers talk to each other:

```console
docker compose logs -f nginx
docker compose logs -f mariadb
```

A single page load produces a line in the nginx log, several queries in the MariaDB log, and nothing at all in the browser's own log, because the browser is on the other side of the first interface.

Three things to take from it.

* **Every box in the diagram is itself a stack.**
  MariaDB is an application on top of libc on top of the kernel, exactly like `hello.c`.
  Zoom in on any one of the four containers and the vertical picture from part 02 comes back.
* **The connections are protocols, not APIs.**
  A protocol is an interface whose two ends are in different processes, often on different machines, written in different languages, released on different schedules.
  It therefore has to be specified far more carefully than a function signature: what is a valid message, what happens to a half-finished one, what happens when the other end disappears.
* **Replaceability is the payoff.**
  Swap nginx for Apache, MariaDB for MySQL, phpMyAdmin for Adminer: the system still works, because what each component depends on is an interface and not an implementation.
  This is the same argument as `libc` being replaceable by `musl`, one level up.

## Going further

* Run `docker compose exec mariadb ss -tnp` and look at who is connected to port 3306.
* Change `ports:` for `nginx` from `8080:80` to another port and restart.
  Nothing inside the containers changes; the interface moved, the implementations did not.
* Stop the database with `docker compose stop mariadb` and reload the page.
  The error you get is WordPress failing at a protocol boundary, which is a different kind of failure from a null pointer.
* Compare with the single-process version of the same idea: `python3 -m http.server` in [`02-software-stack/`](../02-software-stack) is the whole web tier in one program.

## A note on the imported directory

`docker-wordpress-nginx/` is taken from [masoudei/docker-wordpress-nginx](https://github.com/masoudei/docker-wordpress-nginx) and kept as it is, including its own `README.md`.
It is used, not modified, so it is not reformatted to this repository's style -- the rule is in [`dev/questions.md`](../../../../../dev/questions.md).

## References

* [FastCGI specification](https://fastcgi-archives.github.io/FastCGI_Specification.html)
* [MySQL client/server protocol](https://dev.mysql.com/doc/dev/mysql-server/latest/PAGE_PROTOCOL.html)
* [Docker Compose](https://docs.docker.com/compose/)
</content>
