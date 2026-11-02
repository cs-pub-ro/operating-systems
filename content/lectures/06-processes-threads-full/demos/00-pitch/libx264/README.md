# Demo: One Program on Many Cores

Encode a video with `ffmpeg` and watch one process use more than one CPU through its threads.

## Goal

See a single process using several hundred percent of a CPU, because it is one process with many threads running on many cores.

## Background

`ffmpeg`, encoding H.264 video through the `libx264` library, is multi-threaded: it splits the work across threads so that several CPU cores encode at once.
It is one process, with many threads, all sharing one address space.

## Run

Set up the input, then start the encode:

```console
cp config.sample config
```

Edit `config` so that `input_file` points at a video file you have, then:

```console
./convert-to-x264.sh
```

While it runs, watch it from a second terminal:

```console
htop
ps -o pid,comm,%cpu -C ffmpeg
ps -L -o pid,comm,lwp,%cpu -C ffmpeg
```

## What it shows

```text
$ ps -o pid,comm,%cpu -C ffmpeg
    PID COMMAND         %CPU
  12632 ffmpeg           641
```

One process at 641% CPU: it is using between six and seven cores at once, which no single-threaded program can do.
`ps -L` lists the threads, and the CPU is spread across many of them; `htop` shows the cores busy.

## Ask

* How can one process use more than 100% of a CPU?
* The encode is one process. Where is the parallelism coming from?
