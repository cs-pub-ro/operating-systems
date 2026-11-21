# Demo: Open Permissions

`open-perm` tries the three access modes on a file.
`channel-perm` goes through four steps; read them in `main()` before running it.
Run both as an ordinary user.

## Run

```console
make
echo hello > f.txt
chmod 644 f.txt; ./open-perm f.txt
chmod 444 f.txt; ./open-perm f.txt
chmod 000 f.txt; ./open-perm f.txt
rm -f f.txt
./channel-perm
```

## Ask

* Which `open()` calls does a file with permissions 444 allow?
* In step 1 the owner may write the file. Why is `write()` refused, and with which error?
* In step 4 nobody may open the file. Why does `write()` work?
* When are the permissions of a file checked?
