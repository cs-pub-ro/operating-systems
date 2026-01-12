#!/bin/bash
# SPDX-License-Identifier: BSD-3-Clause

TEST_FILE="../support/test-file.txt"
if [ ! -f "$TEST_FILE" ]; then
    echo "run make test-file.txt in the support/ folder to generate the test file"
    exit 1
fi

SUPPORT_DIR="../support"
SOLUTION_DIR="../solution"
PORT=5000

SERVER_BIN="$SUPPORT_DIR/server"
SERVER_LOG="$SUPPORT_DIR/server_output.log"
CLIENT_LOG="$SUPPORT_DIR/client_output.log"
REF_CONFIRMATION="Received 100MB file from"

make -C "$SUPPORT_DIR" > /dev/null 2>&1
make -C "$SOLUTION_DIR" > /dev/null 2>&1

rm -f "$SERVER_LOG" "$CLIENT_LOG"

# Kill existing processes using port
PID_LIST=$(lsof -ti tcp:$PORT)
if [ -n "$PID_LIST" ]; then
    echo "Killing previous server processes on port $PORT: $PID_LIST"
    lsof -ti tcp:$PORT | xargs kill -9
    sleep 1
fi

# Start the server with line-buffered output
setsid timeout --kill-after=5s 300s stdbuf -oL "$SERVER_BIN" > "$SERVER_LOG" 2>&1 &
SERVER_PID=$!

# Allow server to bind port
sleep 1

# Run client with live output in terminal and capture to log
(
    timeout 300s bash -c "(cd $SOLUTION_DIR && stdbuf -oL ./client)" 2>&1 | tee "$CLIENT_LOG"
) &
CLIENT_PID=$!

# Monitor client output log for "Sent 10 MB" within 10 seconds
timeout 10 bash -c "tail -n +0 -F $CLIENT_LOG | grep -q 'Sent 10 MB'"
grep_status=$?

if [ $grep_status -ne 0 ]; then
    echo "Client did not send first 10 MB within 10 seconds. Failing test."
    kill -9 $CLIENT_PID 2>/dev/null || true
    kill -9 $SERVER_PID 2>/dev/null || true
    exit 1
fi

wait $CLIENT_PID

# Wait for server to finish (up to 30 seconds)
MAX_WAIT=30
elapsed=0
interval=0.1
while kill -0 $SERVER_PID 2>/dev/null; do
    if (( $(echo "$elapsed >= $MAX_WAIT" | bc -l) )); then
        echo "Timeout waiting for server to exit"
        break
    fi
    sleep $interval
    elapsed=$(echo "$elapsed + $interval" | bc)
done

echo "===== server output ====="
cat "$SERVER_LOG"
echo "==============================================="

if grep -Fq "$REF_CONFIRMATION" "$SERVER_LOG"; then
    echo "Server test .......................... passed ... 100"
    RESULT=0
else
    echo "Server test .......................... failed ... 0"
    echo "Did not find confirmation message:"
    echo "\"$REF_CONFIRMATION\""
    tail -20 "$SERVER_LOG"
    RESULT=1
fi

make -C "$SUPPORT_DIR" clean > /dev/null 2>&1
make -C "$SOLUTION_DIR" clean > /dev/null 2>&1
rm -f "$SERVER_LOG" "$CLIENT_LOG"

exit $RESULT
