# Demo: Four Containers, Three Protocols

WordPress as four separate programs: nginx, PHP-FPM, MariaDB, phpMyAdmin.

## Run

Start it *before* the lecture; it takes minutes to come up.

```console
cd ../../../01-software-stack-full/demos/06-software-interaction/docker-wordpress-nginx
docker compose up -d
docker compose ps
```

Then, in the room:

```console
docker compose logs --tail 20 nginx
docker compose logs --tail 20 mariadb
```

Open <http://localhost:8080/> and <http://localhost:8183/>.

## Ask

* One page load. How many interfaces does the request cross, and of what kinds?
* phpMyAdmin and WordPress were written by different people. Why do both work against MariaDB?
* Zoom in on the `mariadb` box. What does it look like from the inside?
