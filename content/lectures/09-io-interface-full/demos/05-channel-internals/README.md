# Demo: File Channel Internals

| Demo | What it shows |
| --- | --- |
| [`open-perm/`](open-perm) | The permissions of a file decide which `open()` is allowed; the permissions of the channel are fixed at `open()` and are not those of the file. |
| [`file-pointer/`](file-pointer) | Two descriptors for one file, obtained with two `open()` calls, with `dup()` and with `fork()`: when they share a file pointer and when they do not. |
