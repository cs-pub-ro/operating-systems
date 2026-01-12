#!/bin/bash
# SPDX-License-Identifier: BSD-3-Clause

PORT=5000
SUPPORT_DIR="../support"
TESTS_DIR="../tests"

SERVER_PY="$SUPPORT_DIR/server.py"
CLIENT_BIN="$SUPPORT_DIR/client"

SERVER_LOG="$SUPPORT_DIR/server_output.log"
CLIENT_LOG="$SUPPORT_DIR/client_output.log"

INPUT_CLIENT="$TESTS_DIR/input_client.txt"
INPUT_SERVER="$TESTS_DIR/input_server.txt"

OUTPUT_CLIENT="$TESTS_DIR/output_client.txt"
OUTPUT_SERVER="$TESTS_DIR/output_server.txt"

make -C "$SUPPORT_DIR"
echo

# Kill any leftover server process
PID_LIST=$(lsof -ti tcp:$PORT)
if [ -n "$PID_LIST" ]; then
    echo "Killing leftover server processes on port $PORT: $PID_LIST"
    kill -9 "$PID_LIST"
    sleep 1
fi

# Start server with input_server.txt feeding it
stdbuf -oL python3 "$SERVER_PY" < "$INPUT_SERVER" > "$SERVER_LOG" 2>&1 &
SERVER_PID=$!

# Wait for server port ready
for _i in {1..10}; do
  if lsof -ti tcp:$PORT >/dev/null 2>&1; then break; fi
  sleep 1
done

# Start client with input_client.txt feeding it
stdbuf -oL "$CLIENT_BIN" < "$INPUT_CLIENT" > "$CLIENT_LOG" 2>&1 &
CLIENT_PID=$!

echo "Establishing connection between client and server..."

# Wait up to 8 seconds for client to exit
SECONDS=0
while kill -0 $CLIENT_PID 2>/dev/null; do
  if [ $SECONDS -ge 8 ]; then
    echo "Client test .......................... failed ... 0"
    kill -9 $CLIENT_PID $SERVER_PID 2>/dev/null
    break
  fi
  sleep 0.1
done

echo "Extracting outputs..."

# Extract what client output received
cut -c26- "$CLIENT_LOG" > "$OUTPUT_CLIENT"

# Extract what server received from client
tail -n +3 "$SERVER_LOG" | cut -c32- > "$OUTPUT_SERVER"

if [ "$(tail -n 1 "$INPUT_SERVER")" = "exit" ]; then
  _server_exit=true
fi

echo "Comparing outputs with expected inputs..."

diff_client=$(diff -q "$INPUT_SERVER" "$OUTPUT_CLIENT")
diff_server=$(diff -q "$INPUT_CLIENT" "$OUTPUT_SERVER")

if [ -z "$diff_client" ] || [ -z "$diff_server" ]; then
    echo "Client test .......................... passed ... 100"
    RESULT=0
else
    echo "Client test .......................... failed ... 0"
    RESULT=1
fi

exit $RESULT
