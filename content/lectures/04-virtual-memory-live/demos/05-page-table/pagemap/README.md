# Demo: Reading Your Own Page Table

`/proc/self/pagemap`: one 64-bit entry per virtual page, indexed by the page number.

## Run

```console
make
./pagemap
sudo ./pagemap
sudo ./shared_frame
sudo ./shared_frame
```

## Ask

* The `index` column is the address without its last three hex digits. Where in the file is the entry for a page?
* After `mmap()`, four entries, none present. After two writes, two present. What made them?
* As root: three consecutive pages, frames at 16 GB, 29 GB and 37 GB into the RAM. What keeps track of which is which?
* `shared_frame` twice: two virtual addresses for `printf()`, one frame. How many copies of libc's code are in memory?
* Back to the pitch: `0x404040` in two processes. Same index in two tables; what is in the two entries?
