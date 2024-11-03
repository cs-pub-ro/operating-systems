# Parallel Firewall

## Objectives

- Learn how to design and implement parallel programs
- Get experienced at utilizing the POSIX threading API
- Learn how to convert a serial program into a parallel one

## Statement

A firewall is a program that checks network packets against a series of filters which provide a decision regarding dropping or allowing the packets to continue to their intended destination.

**In a real setup**, the network card will receive real packets (e.g. packets having [`Ethernet`](https://en.wikipedia.org/wiki/Ethernet_frame), [`IP`](https://en.wikipedia.org/wiki/IPv4) headers plus payload) from the network and will send them to the firewall for processing.
The firewall will decide if the packets are to be dropped or not and, if not, passes them further.

**In this assignment**, instead of real network packets, we'll deal with made up packets consisting of a made up source (a number), a made up destination (also a number), a timestamp (also a number) and some payload.
And instead of the network card providing the packets, we'll have a **producer thread** creating these packets.

The created packets will be inserted into a [`circular buffer`](https://en.wikipedia.org/wiki/Circular_buffer), out of which **consumer threads** (which implement the firewall logic) will take packets and process them in order to decide whether they advance to the destination.

The result of this processing is a log file in which the firewall will record the decision taken (PASS or DROP) for each packet, along with other information such as timestamp.

The purpose of this assignment is to:

- implement the circular buffer, along with synchronization mechanisms for it to work in a multithreaded program

- implement the consumer threads, which consume packets and process them

- provide the log file containing the result of the packet processing

## Support Code

The support code consists of the directories:

- `src/` contains the skeleton for the parallelized firewall and the already implemented serial code in `src/serial.c`.
  You will have to implement the missing parts marked as `TODO`

- `utils/` contains utility files used for debugging and logging.

- `tests/` contains tests used to validate and grade the assignment.

## Implementation

### Firewall Threads

In order to parallelize the firewall we have to distribute the packets to multiple threads.
The packets will be added to a shared data structure (visible to all threads) by a `producer` thread and processed by multiple `consumer` threads.
Each `consumer` thread picks a packet from the shared data structure, checks it against the filter function and writes the packet hash together with the drop/accept decision to a log file.
`consumer` threads stop waiting for new packets from the `producer` thread and exit when the `producer` thread closes the connection to the shared data structure.

The `consumer` threads **must not do any form of busy waiting**.
When there are new packets that need to be handled, the `consumer` threads must be **notified**.
**Waiting in a `while()` loop or sleeping is not considered a valid synchronization mechanism and points will be deducted.**

Implement the `consumer` related functions marked with `TODO` in the `src/consumer.c` file.
**The number of consumer threads will be passed as the 3rd command-line argument**

### Ring Buffers

A ring buffer (or a circular buffer) is a data structure that stores its elements in a circular fixed size array.
One of the advantages of using such a data structure as opposed to an array is that it acts as a FIFO, without the overhead of moving the elements to the left as they are consumed.
Thus, the shared ring buffer offers the following fields:

- `write_pos` index in the buffer used by the `producer` thread for appending new packets.
- `read_pos`  index in the buffer used by the `consumer` threads to pick packets.
- `cap` the size of the internal buffer.
- `data` pointer to the internal buffer.

Apart from these fields you have to add synchronization primitives in order to allow multiple threads to access the ring buffer in a deterministic manner.
You can use mutexes, semaphores, conditional variables and other synchronization mechanisms offered by the `pthread` library.

You will have to implement the following interface for the ring buffer:

- `ring_buffer_init()`: initialize the ring buffer (allocate memory and synchronization primitives).
- `ring_buffer_enqueue()`: add elements to the ring buffer.
- `ring_buffer_dequeue()`: remove elements from the ring buffer.
- `ring_buffer_destroy()`: free up the memory used by the ring_buffer.
- `ring_buffer_stop()`: finish up using the ring buffer for the calling thread.

### Log File

The output of the firewall will be a log file with the rows containing the firewall's decision, the hash of the packet and its timestamp.
The actual format can be found in the serial implementation (at `src/serial.c`).

When processing the packets in parallel the threads will finish up the work in a non deterministic order.
The packet processing functions are already implemented in `src/packet.c`

We would like the logs to be sorted by the packet timestamp, the order that they came in from the producer.
Thus, the `consumers` should insert the packet information to the log file such as the result is ordered by timestamp.
The printing format can be found in `./src/serial.c`

The logs must be written to the file in ascending order during packet processing.
**Sorting the log file after the consumer threads have finished processing is not considered a valid synchronization mechanism and points will be deducted.**

## Operations

### Building

To build both the serial and the parallel versions, run `make` in the `src/` directory:

```console
student@so:~/.../content/assignments/parallel-firewall$ cd src/

student@so:~/.../assignments/parallel-firewall/src$ make
```

That will create the `serial` and `firewall` binaries.

## Testing and Grading

Testing is automated.
Tests are located in the `tests/` directory.

To test and grade your assignment solution, enter the `tests/` directory and run `grade.sh`.

```console
student@so:~/.../content/assignments/parallel-firewall$ cd tests/
```

```console
student@so:~/.../content/assignments/parallel-firewall/tests$ ./grade.sh
```

Note that this requires linters being available.
The easiest way to test the project is to use a Docker-based setup with everything installed and configured (see the [README.checker.md](README.checker.md) file for instructions).

To create the tests, run:

```console
student@so:~/.../content/assignments/parallel-firewall/tests$ make check
```

To remove the tests, run:

```console
student@so:~/.../content/assignments/parallel-firewall/tests$ make distclean
```

When using `grade.sh` you will get a maximum of 90/100 points for general correctness and a maximum of 10/100 points for coding style.

### Restrictions

- Threads must yield the cpu when waiting for empty/full buffers i.e. not doing `busy waiting`.
- The logs must be written as they are processed and not after the processing is done, in ascending order by the timestamp.
- The number of running threads must be at least `num_consumers + 1`, where `num_consumers` is the 3rd command-line argument of the `firewall` binary.

### Grades

- 10 points are awarded for a single consumer solution that also implements the ring buffer
- 50 points are awarded for a multi consumer solution
- 30 points are awarded for a multi consumer solution that writes the logs in the sorted manner (bearing in mind the above restrictions)

### Running the Checker

Each test is worth a number of points.
The maximum grade is `90`.

A successful run will show the output:

```console
student@so:~/.../assignments/parallel-firewall/tests$ make check
[...]
Test [    10 packets, sort False, 1 thread ] ...................... passed ... 3
Test [ 1,000 packets, sort False, 1 thread ] ...................... passed ... 3
Test [20,000 packets, sort False, 1 thread ] ...................... passed ... 4
Test [    10 packets, sort True , 2 threads] ...................... passed ... 5
Test [    10 packets, sort True , 4 threads] ...................... passed ... 5
Test [   100 packets, sort True , 2 threads] ...................... passed ... 5
Test [   100 packets, sort True , 4 threads] ...................... passed ... 5
Test [ 1,000 packets, sort True , 2 threads] ...................... passed ... 5
Test [ 1,000 packets, sort True , 4 threads] ...................... passed ... 5
Test [10,000 packets, sort True , 2 threads] ...................... passed ... 5
Test [10,000 packets, sort True , 4 threads] ...................... passed ... 5
Test [20,000 packets, sort True , 2 threads] ...................... passed ... 5
Test [20,000 packets, sort True , 4 threads] ...................... passed ... 5
Test [ 1,000 packets, sort False, 4 threads] ...................... passed ... 5
Test [ 1,000 packets, sort False, 8 threads] ...................... passed ... 5
Test [10,000 packets, sort False, 4 threads] ...................... passed ... 5
Test [10,000 packets, sort False, 8 threads] ...................... passed ... 5
Test [20,000 packets, sort False, 4 threads] ...................... passed ... 5
Test [20,000 packets, sort False, 8 threads] ...................... passed ... 5

Checker:                                                                    90/100
```

### Running the Linters

To run the linters, use the `make lint` command in the `tests/` directory:

```console
student@so:~/.../assignments/parallel-firewall/tests$ make lint
[...]
cd .. && checkpatch.pl -f checker/*.sh tests/*.sh
[...]
cd .. && cpplint --recursive src/ tests/ checker/
[...]
cd .. && shellcheck checker/*.sh tests/*.sh
```

Note that the linters have to be installed on your system: [`checkpatch.pl`](https://.com/torvalds/linux/blob/master/scripts/checkpatch.pl), [`cpplint`](https://github.com/cpplint/cpplint), [`shellcheck`](https://www.shellcheck.net/).
They also need to have certain configuration options.
It's easiest to run them in a Docker-based setup with everything configured.

### Fine-Grained Testing

Input tests cases are located in `tests/in/` and are generated by the checker.
The expected results are generated by the checker while running the serial implementation.
If you want to run a single test, use the below commands while in the `src/` directory:

```console
student@so:~/.../assignments/parallel-firewall/src$ ./firewall ../tests/in/test_<num_packets>.in <output_file> <number_of_consumers>
```

Results provided by the serial and parallel implementation must be the same for the test to successfully pass.
