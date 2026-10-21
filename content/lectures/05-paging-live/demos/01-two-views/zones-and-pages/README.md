# Demo: One Address Space, Counted Both Ways

## Run

```console
grep -c . /proc/$$/maps
grep -E 'VmSize|VmRSS' /proc/$$/status
awk '/^VmSize/ { v = $2 } /^VmRSS/ { r = $2 } END { print "pages:", v / 4, " present:", r / 4 }' /proc/$$/status
```

## Ask

* 33 zones and 2,647 pages. Which structure does each number count, and who reads each?
* 1,098 of the pages are present. What are the other 1,549: allowed, forbidden, or something else?
