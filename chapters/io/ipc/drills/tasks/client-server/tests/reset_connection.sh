#!/bin/bash
# SPDX-License-Identifier: BSD-3-Clause

PORT=5000

# Kill any leftover server process
PID_LIST=$(lsof -ti tcp:$PORT)
if [ -n "$PID_LIST" ]; then
    echo "Killing leftover server processes on port $PORT: $PID_LIST"
    kill -9 "$PID_LIST"
    sleep 1
    echo "Connection reset complete."
else
    echo "No processes found on port $PORT."
fi
