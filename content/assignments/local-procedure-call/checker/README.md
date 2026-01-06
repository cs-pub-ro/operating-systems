# Client Manager Output Checker

## Features

- Strict counting of valid messages only:
  - `Hello from func()`
  - `Hello from func(arg1)`
  - `Hello from func(arg1, arg2)`
- Fail on any invalid message or empty line
- Optional rule check based on number of clients
- Supports multi-threaded client output
- Works with any number of clients (streaming mode)

## Usage

### Count messages

```bash
# Count and validate exactly 10000 messages
./client-manager 10000 | ./count_calls.sh 10000

# Check if messages match expected call format for given client count
./client-manager 100 | ./rule_check.sh 100
