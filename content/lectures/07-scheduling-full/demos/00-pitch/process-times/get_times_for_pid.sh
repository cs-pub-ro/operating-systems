#!/bin/sh

if test $# -ne 1; then
    echo "Usage: $0 <PID>" 1>&2
    exit 1
fi

pid="$1"

kill -0 "$pid" > /dev/null 2>&1
if test $? -ne 0; then
    echo "No such process with PID $pid" 1>&2
    exit 1
fi

perl -MPOSIX -l -0777 -ne '@f = /\(.*\)|\S+/gs;
    printf "user time:    %10.2fs\nsystem time:  %10.2fs\n",
    map {$_/POSIX::sysconf( &POSIX::_SC_CLK_TCK )}@f[13..14]' /proc/"$pid"/stat
printf "elapsed time: %10.2fs\n" $(ps --no-header -o etimes "$pid" | tr -d ' ')
