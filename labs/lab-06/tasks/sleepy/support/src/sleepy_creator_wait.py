# SPDX-License-Identifier: BSD-3-Clause

import subprocess
from sys import exit

NUM_SLEEPS = 10


def main():
    procs = []
    for _ in range(NUM_SLEEPS):
        # Create new process and add it to the list of processes.
        p = subprocess.Popen(["sleep", "1000"])
        procs.append(p)

    # TODO: Make the current process wait for its child processes.


if __name__ == "__main__":
    exit(main())
