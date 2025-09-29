#!/usr/bin/python3 -u
# SPDX-License-Identifier: BSD-3-Clause

from random import randint
from threading import Condition, Thread
from time import sleep
from typing import List

NUM_WORKERS = 3
messages: List[str] = []


def worker(event, id):
    msg = ""

    while True:
        # TODO: Acquire the lock before accessing the shared resource (messages)
        while len(messages) == 0:
            # TODO: Wait for a message to be available if the list is empty

        print(f"Worker {id} started handling message...")
        sleep(randint(1, 5))

        # TODO: Safely retrieve the message while holding the lock (use "msg")

        # TODO: Release the lock after modifying the shared resource

        print(f"Worker {id} handling message: {msg}")
        sleep(randint(1, 5))

        print(f"Worker {id} done!")


def main():
    event = Condition()

    # Create and start the worker threads
    thread_pool = [Thread(target=worker, args=(event, i)) for i in range(NUM_WORKERS)]
    for t in thread_pool:
        t.daemon = True
        t.start()

    print(
        "Type a message and press Enter to simulate one connection. "
        + "Type 'exit' and then wait a bit to quit."
    )

    while True:
        msg = input("> ")
        if msg == "exit":
            break

        # TODO: Acquire the lock before appending a message to the list

        # TODO: Append the message to "messages" and notify the workers that a message is available

        # TODO: Release the lock after writing (appending) in the shared resource


if __name__ == "__main__":
    exit(main())
