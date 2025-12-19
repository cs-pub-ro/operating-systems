#!/bin/bash
# SPDX-License-Identifier: BSD-3-Clause

PORT=5000
SUPPORT_DIR="../support"
TESTS_DIR="../tests"

SERVER_BIN="$SUPPORT_DIR/server"
CLIENT_PY="$SUPPORT_DIR/client.py"

SERVER_LOG="$SUPPORT_DIR/server_output.log"
CLIENT_LOG="$SUPPORT_DIR/client_output.log"

INPUT_SERVER="$TESTS_DIR/input_server.txt"
INPUT_CLIENT="$TESTS_DIR/input_client.txt"

OUTPUT_SERVER="$TESTS_DIR/output_server.txt"
OUTPUT_CLIENT="$TESTS_DIR/output_client.txt"

make -C "$SUPPORT_DIR"
echo

# Kill leftover server processes
PID_LIST=$(lsof -ti tcp:$PORT)
if [ -n "$PID_LIST" ]; then
    echo "Killing leftover server processes on port $PORT: $PID_LIST"
    kill -9 "$PID_LIST"
    sleep 1
fi

# Start server with input_server.txt feeding it
stdbuf -oL "$SERVER_BIN" < "$INPUT_SERVER" > "$SERVER_LOG" 2>&1 &
SERVER_PID=$!

# Wait for server port ready
for _i in {1..10}; do
    if lsof -ti tcp:$PORT >/dev/null 2>&1; then break; fi
    sleep 1
done

# Start client with input_client.txt feeding it
stdbuf -oL python3 "$CLIENT_PY" < "$INPUT_CLIENT" > "$CLIENT_LOG" 2>&1 &

echo "Establishing connection between client and server..."

# Wait up to 8 seconds for server to exit
SECONDS=0
while kill -0 $SERVER_PID 2>/dev/null; do
  if [ $SECONDS -ge 8 ]; then
    echo "Client test .......................... failed ... 0"
    kill -9 $SERVER_PID 2>/dev/null
    exit 0
  fi
  sleep 0.1
done

echo "Extracting outputs..."

# Extract what client output received
tail -n +2 "$CLIENT_LOG" | cut -c26- > "$OUTPUT_CLIENT"

# Extract what server received from client
tail -n +2 "$SERVER_LOG" | cut -c27- > "$OUTPUT_SERVER"

echo "Comparing outputs with expected inputs..."

diff_client=$(diff -q "$INPUT_SERVER" "$OUTPUT_CLIENT")
diff_server=$(diff -q "$INPUT_CLIENT" "$OUTPUT_SERVER")

if [ -z "$diff_client" ] || [ -z "$diff_server" ]; then
    echo "Server test .......................... passed ... 100"
    RESULT=0
else
    echo "Server test .......................... failed ... 0"
    RESULT=1
fi

exit $RESULT
