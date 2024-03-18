# App Investigation: Servo

[Servo](https://servo.org/) is a browser engine written in Rust that provides reusable components to implement web standards.

We do not clone the repository, since it's very large.

We find information about allocator used, by accessing the `components/allocator/` in [its source code](https://github.com/servo/servo/tree/master/components/allocator).
In `Cargo.toml` we see that it requires `jemalloc` for non-Windows implementations and the standard Windows API (called `heapapi`) for Windows:

```text
[...]
[lib]
path = "lib.rs"

[target.'cfg(not(windows))'.dependencies]
jemalloc-sys = { version = "0.3.2" }

[target.'cfg(windows)'.dependencies]
winapi = { version = "0.3", features = ["heapapi"] }
ust: https://github.com/servo/servo
```

In `lib.rs`, in [`GlobalAlloc:alloc()`](https://github.com/servo/servo/blob/master/components/allocator/lib.rs#L70) we see it is using [the `mallocx` custom function from `jemalloc()`](https://jemalloc.net/jemalloc.3.html).
See [the initialization of `ffi`](https://github.com/servo/servo/blob/master/components/allocator/lib.rs#L17).

See the use of the allocator in the [`Cargo.toml` file in the `net` component](https://github.com/servo/servo/blob/master/components/net/Cargo.toml).
Search for the `alloc` string.

## Practice

Look for uses of the allocator in other components of Servo.
