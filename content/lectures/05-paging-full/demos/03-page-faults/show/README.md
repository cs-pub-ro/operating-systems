# Show Page Fault Metrics

Access to memory cause page faults if the physical memory is not mapped in the virtual address space (and the PTE is marked as invalid).

To show the number of minor and major page faults of the current shell process, use:

```console
$ ps -o pid,comm,vsz,rss,min_flt,maj_flt $$
    PID COMMAND            VSZ   RSS  MINFL  MAJFL
  26566 bash             16540 10964  96911      0
```

To show the number of minor and major page faults of the most memory intensive process, use:

```console
$ ps -o pid,comm,vsz,rss,min_flt,maj_flt $(ps -e --no-header -o pid --sort rss | tail -1)
    PID COMMAND            VSZ   RSS  MINFL  MAJFL
  33989 chrome          1287208600 722700 6125338 4
```
