# Demo: An Assignment That Does Nothing

## Run

```console
cd ../../../../01-software-stack-full/demos/00-pitch/04-python-string-edit
python3 string_vs_bytearray.py
```

```text
       N       plain      shared   bytearray
   40000     0.0011s     0.0084s     0.0008s
   80000     0.0021s     0.0380s     0.0016s
  160000     0.0043s     0.1662s     0.0029s
```

The only difference between the two string columns:

```python
keep = s            # never read again
s = s + "a"
```

## Ask

* Read down the columns, not across the rows. Which column quadruples when N doubles?
* Python strings are immutable, so `s + "a"` has to copy. Why is the `plain` column not quadratic then?
* Which of the two columns is the language, and which is one implementation of it?
