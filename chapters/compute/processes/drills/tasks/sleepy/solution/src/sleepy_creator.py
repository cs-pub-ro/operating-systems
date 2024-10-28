# SPDX-License-Identifier: BSD-3-Clause

import subprocess
from sys import exit

NUM_SLEEPS = 10


# Hint: Use the documentation: https://docs.python.org/3/library/subprocess.html#subprocess.Popen
def main():
    # TODO 5: Create 10 `sleep 1000` processes using `subprocess.Popen`
    procs = []
    for _ in range(NUM_SLEEPS):
        # Create new process and add it to the list of processes.
        p = subprocess.Popen(["sleep", "1000"])
        procs.append(p)


if __name__ == "__main__":
    exit(main())
