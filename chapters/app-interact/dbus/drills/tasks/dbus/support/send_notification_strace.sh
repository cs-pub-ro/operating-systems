#!/bin/bash
# SPDX-License-Identifier: BSD-3-Clause

strace -s 1000 -f -e trace=socket,connect,sendmsg,recvmsg \
gdbus call \
      --session --dest org.freedesktop.Notifications \
      --object-path /org/freedesktop/Notifications \
      --method org.freedesktop.Notifications.Notify \
      -- \
      '""' \
      0 \
      '""' \
      "This is the title" \
      "This is the content" \
      [] \
      {} \
      -1
