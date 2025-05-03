import sys

# TODO 22: Compute the Nth fibonacci number
if len(sys.argv) < 2:
    print("0")
    sys.exit(1)

N = int(sys.argv[1])

if N < 0:
    print("N cannot be negative")
    sys.exit(1)

if N == 0:
    print("0")
    sys.exit(0)

a = 0
b = 1
for i in range(1, N):
    c = a + b
    a = b
    b = c

print(b)
