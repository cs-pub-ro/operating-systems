#!/usr/bin/python3 -u
# SPDX-License-Identifier: BSD-3-Clause

import threading
import time
import random
from collections import deque

# Shared resources
queue = deque()
MAX_QUEUE_SIZE = 5
condition = threading.Condition()


# Producer part
def producer():
    while True:
        item = random.randint(1, 100)

        # Acquire the lock
        condition.acquire()

        with condition:
            while len(queue) >= MAX_QUEUE_SIZE:
                print("The queue is full, producer is waiting...")

                # Wait until there's space in the queue
                condition.wait()
            queue.append(item)
            print(f"Produced value: {item}")

            # Notify the consumer that an item is available
            condition.notify()

        # Release the lock
        condition.release()

        # Simulate work by sleeping
        time.sleep(random.uniform(1, 1.5))


# Consumer part
def consumer():
    while True:
        # Acquire the lock
        condition.acquire()

        with condition:
            while not queue:
                print("The queue is empty, consumer is waiting...")

                # Wait until there's an item in the queue
                condition.wait()
            item = queue.popleft()
            print(f"Consumed value: {item}")

            # Notify the producer that there's space in the queue
            condition.notify()

        # Release the lock
        condition.release()

        # Simulate work by sleeping
        time.sleep(random.uniform(1, 1.5))


def main():
    # Create both threads
    producer_thread = threading.Thread(target=producer)
    consumer_thread = threading.Thread(target=consumer)

    # Start threads
    producer_thread.start()
    consumer_thread.start()

    # Join threads
    producer_thread.join()
    consumer_thread.join()


if __name__ == "__main__":
    exit(main())
