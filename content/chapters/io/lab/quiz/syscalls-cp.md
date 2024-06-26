# Syscalls Used by `cp`

## Question Text

What syscalls does `cp` use to copy files?

## Question Answers

- `mmap()`

+ `read()` and `write()`

+ `copy_file_range()`

- a combination of `read()` - `write()` and `mmap()`

## Feedback

It suffices to use `strace` to see that `cp` uses `read()` and `write()`.

```console
student@os:/.../support/file-mappings$ strace cp test-file.txt output.txt
openat(AT_FDCWD, "test-file.txt", O_RDONLY) = 3
fstat(3, {st_mode=S_IFREG|0664, st_size=1048576, ...}) = 0
openat(AT_FDCWD, "output.txt", O_WRONLY|O_CREAT|O_EXCL, 0664) = 4
fstat(4, {st_mode=S_IFREG|0664, st_size=0, ...}) = 0
[...]
read(3, "@Y\344\0025\317\27\243\23\201:\27\342\356\240\345\331Nq\v/\36\244\200\301\247\3152\35WZ\337"..., 131072) = 131072
write(4, "@Y\344\0025\317\27\243\23\201:\27\342\356\240\345\331Nq\v/\36\244\200\301\247\3152\35WZ\337"..., 131072) = 131072
read(3, "\201\240J7x\275\257Z\343\334\307d<\321U\275\337\10\233j\222\313,##cQD\268e\324"..., 131072) = 131072
write(4, "\201\240J7x\275\257Z\343\334\307d<\321U\275\337\10\233j\222\313,##cQD\268e\324"..., 131072) = 131072
read(3, "\371\3244=\17\300L9\243\201\362\25\273\37\326\323\362\200\1T\310N\316\305\253\331\331Nt\346\3369"..., 131072) = 131072
write(4, "\371\3244=\17\300L9\243\201\362\25\273\37\326\323\362\200\1T\310N\316\305\253\331\331Nt\346\3369"..., 131072) = 131072
read(3, "\350\304\345f\16\305V\356\371\263?+\355{\16\235\344\310P4}\2043%\0052\345D\265\243t\354"..., 131072) = 131072
write(4, "\350\304\345f\16\305V\356\371\263?+\355{\16\235\344\310P4}\2043%\0052\345D\265\243t\354"..., 131072) = 131072
read(3, "\277\226\315\226\n\37\337;N*\211\352\254$\273\2\351\30a\254\ta\352R\25-\23\274\376zy\211"..., 131072) = 131072
write(4, "\277\226\315\226\n\37\337;N*\211\352\254$\273\2\351\30a\254\ta\352R\25-\23\274\376zy\211"..., 131072) = 131072
read(3, "}\245\356;\222\327\204\242u\26dy%\346\374\201ndT\226\233\3575\345\247\356\362\344\350\354\17\261"..., 131072) = 131072
write(4, "}\245\356;\222\327\204\242u\26dy%\346\374\201ndT\226\233\3575\345\247\356\362\344\350\354\17\261"..., 131072) = 131072
read(3, "\35\277\207\243~\355(i\351^\1\346\312V\232\204\32\230~\376\20\245\"\305\344d\304\304B\272\346\332"..., 131072) = 131072
write(4, "\35\277\207\243~\355(i\351^\1\346\312V\232\204\32\230~\376\20\245\"\305\344d\304\304B\272\346\332"..., 131072) = 131072
read(3, "\n)\334\275\331:R\236O\231\243\302\314\267\326\"\rY\262\21\374\305\275\3\332\23\345\16>\214\210\235"..., 131072) = 131072
write(4, "\n)\334\275\331:R\236O\231\243\302\314\267\326\"\rY\262\21\374\305\275\3\332\23\345\16>\214\210\235"..., 131072) = 131072
```

Alternatively, if your kernel version is `5.19` or newer, it's likely that `cp` will use `copy_file_range()`:

```console
student@os:/.../support/file-mappings$ strace cp test-file.txt output.txt
openat(AT_FDCWD, "test-file.txt", O_RDONLY) = 3
newfstatat(3, "", {st_mode=S_IFREG|0664, st_size=1048576, ...}, AT_EMPTY_PATH) = 0
openat(AT_FDCWD, "output.txt", O_WRONLY|O_CREAT|O_EXCL, 0664) = 4
ioctl(4, BTRFS_IOC_CLONE or FICLONE, 3) = -1 EOPNOTSUPP (Operation not supported)
newfstatat(4, "", {st_mode=S_IFREG|0644, st_size=0, ...}, AT_EMPTY_PATH) = 0
fadvise64(3, 0, 0, POSIX_FADV_SEQUENTIAL) = 0
copy_file_range(3, NULL, 4, NULL, 9223372035781033984, 0) = 1048576
copy_file_range(3, NULL, 4, NULL, 9223372035781033984, 0) = 0
```

[This syscall](https://man7.org/linux/man-pages/man2/copy_file_range.2.html) copies files inside the kernel without having the data pass through the user space.
This procedure is called zero-copy.
