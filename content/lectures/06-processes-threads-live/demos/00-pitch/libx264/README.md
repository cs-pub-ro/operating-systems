# Demo: One Program on Many Cores

## Run

```console
cp config.sample config      # then edit config: input_file=<a video you have>
./convert-to-x264.sh
```

In a second terminal, while it runs:

```console
htop
ps -o pid,comm,%cpu -C ffmpeg
ps -L -o pid,comm,lwp,%cpu -C ffmpeg
```

## Ask

* How can one process use more than 100% of a CPU?
* The encode is a single process. Where does the parallelism come from?
