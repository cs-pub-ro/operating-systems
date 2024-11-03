# SPDX-License-Identifier: BSD-3-Clause

"""
Checker for the "Parallel Firewall" assignment.

It walks through the input test files in `in/` and compares the output of the
binary with the appropriate file from `out/` directory.
"""

import os
import subprocess
import shutil
import time
import signal

from gen_packets import generate_packets
from typing import List

src = os.environ.get("SRC_PATH", "../src")
in_dir = os.path.join(os.curdir, "in")
out_dir = os.path.join(os.curdir, "out")
ref_dir = os.path.join(os.curdir, "ref")

SORT_TIMEOUT = 1
CMP_TIMEOUT = 1
SERIAL_TIMEOUT = 5

TEST_SIZES = [10, 100, 1_000, 10_000, 20_000]


"""Two millisecond for each probe"""
TRACE_LOG_TIMESLICE = 1 / 500

TOTAL = 0.0

GEN_TEST_ERROR_MSG = """Generating test cases for the checker failed. Please run:
```
make distclean
```
Then run the checker again"""


def create_dir(dir_path: str):
    """Create the directory pointed by `dir_path`.
    Remove it before creating if it already exists."""
    shutil.rmtree(dir_path, ignore_errors=True)

    os.mkdir(dir_path)


def print_log(text: str, newline=False):
    """Print a message in pretty way."""
    if newline:
        print("")

    print(30 * "~" + f" {text} ".ljust(50, "~"))


def generate_tests(test_sizes) -> bool:
    """Generate test cases in ./in and reference files in ./ref"""
    print("")
    try:
        tests = os.listdir(in_dir)

        if len(tests) == len(test_sizes):
            print_log("Skipping test generation")
            return True
    except FileNotFoundError:
        pass

    print_log("Generating test cases")

    create_dir(in_dir)
    create_dir(ref_dir)
    serial_imp = os.path.join(src, "serial")

    # Generate the rest of tests
    for test_size in test_sizes:
        test_file_in = os.path.join(in_dir, f"test_{test_size:_}.in")
        test_file_ref = os.path.join(ref_dir, f"test_{test_size:_}.ref")

        print(
            "Generate {} and {}".format(test_file_in.ljust(20), test_file_ref.ljust(21))
        )

        generate_packets(test_file_in, test_size, seed=test_size)
        with subprocess.Popen([serial_imp, test_file_in, test_file_ref]) as serial_proc:
            try:
                if serial_proc.wait(timeout=SERIAL_TIMEOUT) != 0:
                    print(GEN_TEST_ERROR_MSG)
                    return False
            except subprocess.TimeoutExpired:
                print("Time expired for serial imeplementation !! Killing ...")
                serial_proc.kill()
                print(GEN_TEST_ERROR_MSG)
                return False

    print_log("Tests cases generated")
    return True


def files_are_identical(out_file: str, ref_file: str, sort_out_file: bool) -> bool:
    """Return true if the files are identical with the option of sorting the
    output file before comaparing the two.
    """
    # Sort output file before comparing
    if sort_out_file:
        # Sort the file by the numerical value in the third column
        with subprocess.Popen(
            ["sort", "-n", "-k3", "-o", out_file, out_file]
        ) as sort_proc:
            try:
                sort_proc.wait(timeout=SORT_TIMEOUT)
            except subprocess.TimeoutExpired:
                sort_proc.kill()
                return False
    with subprocess.Popen(["cmp", "-s", out_file, ref_file]) as cmp_proc:
        try:
            return cmp_proc.wait(timeout=CMP_TIMEOUT) == 0
        except subprocess.TimeoutExpired:
            cmp_proc.kill()
            return False

    return False


def file_prefix_identical(out_file_path: str, ref_file_path: str) -> bool:
    """Check if the output file is a prefix of the ref file.

    Used to check during the runtime of the firewall if the data is
    inserted in a sorted order."""
    with open(out_file_path) as out_file, open(ref_file_path) as ref_file:
        for out_line in out_file:
            ref_line = ref_file.readline()
            if out_line != ref_line:
                return False
    return True


def file_line_count(file_path: str) -> int:
    return sum(1 for _ in open(file_path))


def line_count_probe_check(probe: List[int]) -> bool:
    double_occurences = 0
    for i in range(1, len(probe)):
        if probe[i] == probe[i - 1] and probe[i] != 0 and probe[i] not in TEST_SIZES:
            double_occurences += 1

    return double_occurences / len(probe) <= 0.5


def file_exists_probe_check(probe: List[bool]) -> bool:
    return any(probe)


def run_once_and_check_output(
    binary: str,
    in_file_path: str,
    out_file_path: str,
    ref_file_path: str,
    sort_out_file: bool,
    threads: int = 1,
    test_timeout: float = 1,
    trace_logs: bool = False,
) -> bool:
    """Run the test once and check the output file with the reference file

    Also, delete the output file before running to ensure all the content
    was written during this run."""

    # Delete output file
    try:
        os.remove(out_file_path)
    except FileNotFoundError:
        pass

    if not os.path.exists(binary):
        print("No program to run, maybe compilation failed?")
        return False

    with subprocess.Popen(
        [binary, in_file_path, out_file_path, f"{threads}"],
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        preexec_fn=os.setpgrp,
    ) as proc_firewall_res:
        try:
            """Check periodically if the output file is sorted correctly"""
            if trace_logs:
                err = ""
                line_count_probe, file_exists_probe = [], []
                running_time = 0

                while running_time < test_timeout and proc_firewall_res.poll() is None:
                    time.sleep(TRACE_LOG_TIMESLICE)
                    running_time += TRACE_LOG_TIMESLICE

                    file_exists = os.path.isfile(out_file_path)
                    file_exists_probe.append(file_exists)
                    if file_exists:
                        proc_firewall_res.send_signal(signal.SIGSTOP)

                        line_count_probe.append(file_line_count(out_file_path))
                        if not file_prefix_identical(out_file_path, ref_file_path):
                            err = (
                                f"Log tracing failed: file {ref_file_path} does not"
                                + f"start with the contents of {out_file_path}."
                            )
                            break
                        proc_firewall_res.send_signal(signal.SIGCONT)

                if running_time >= test_timeout:
                    err = "Time expired for process!! Killing ..."
                if not line_count_probe_check(line_count_probe):
                    err = "Line count did not change between two probes too many times"
                if not file_exists_probe_check(file_exists_probe):
                    err = "File was never created during execution"

                if err != "":
                    print(err)
                    proc_firewall_res.kill()
                    return False

            else:
                _, _ = proc_firewall_res.communicate(timeout=test_timeout)
        except subprocess.TimeoutExpired:
            print("Time expired for process!! Killing ...")
            proc_firewall_res.kill()
            return False
        except KeyboardInterrupt:
            # Test was CTRL-C'ed
            proc_firewall_res.kill()
            return False

    return files_are_identical(out_file_path, ref_file_path, sort_out_file)


def check(
    test_name: str,
    sort_out_file: bool,
    threads: int,
    test_timeout: float = 1,
    number_of_runs: int = 1,
    trace_logs: bool = False,
):
    """Check a test file.

    Pass test filenames `firewall`
    """
    # Format output file name.
    in_file_name = f"{test_name}.in"
    in_file_path = os.path.join("in", in_file_name)

    # Format output file name.
    out_file_name = f"{test_name}.out"
    out_file_path = os.path.join("out", out_file_name)

    # Format the ref file name
    ref_file_name = f"{test_name}.ref"
    ref_file_path = os.path.join("ref", ref_file_name)

    firewall_path = os.path.join(src, "firewall")

    # When checking single threader version, there's no need to run the program
    # multiple times, as there **should not** be any variance.
    # And if there is, it'll get caught during parallel testing.
    if threads == 1:
        number_of_runs = 1

    # Running `number_of_runs` times and check the output every time.
    # We do this in order to check the program output is consistent.
    for _ in range(number_of_runs):
        if not run_once_and_check_output(
            firewall_path,
            in_file_path,
            out_file_path,
            ref_file_path,
            True,
            threads=threads,
            test_timeout=test_timeout,
        ):
            return False

    if trace_logs:
        if not run_once_and_check_output(
            firewall_path,
            in_file_path,
            out_file_path,
            ref_file_path,
            sort_out_file,
            threads=threads,
            test_timeout=test_timeout,
            trace_logs=trace_logs,
        ):
            return False
    return True


def check_and_grade(
    test_size: int,
    sort_out_file: bool = False,
    threads: int = 1,
    test_timeout: int = 2,
    points: float = 5.0,
    trace_logs: bool = False,
):
    """Check and grade a single test case using test size and number of threads"""

    global TOTAL
    test_name = f"test_{test_size:_}"
    result_format = "Test [{} packets, sort {}, {} thread{}]".format(
        f"{test_size:,}".rjust(6),
        f"{sort_out_file}".ljust(len("False")),
        threads,
        "s" if threads > 1 else " ",
    )
    result_format += " " + 22 * "." + " "

    if check(test_name, sort_out_file, threads, test_timeout, 20, trace_logs):
        print(result_format + "passed ... {}".format(points))
        TOTAL += points
    else:
        print(result_format + "failed ... 0")


def main():
    global TOTAL
    if not generate_tests(TEST_SIZES):
        # Something bad happened, can't run checker, try again
        return

    create_dir(out_dir)

    print_log("Running tests ...", newline=True)

    # Test out serial implementation: 10 points.
    check_and_grade(TEST_SIZES[0], threads=1, points=3)
    check_and_grade(TEST_SIZES[2], threads=1, points=3)
    check_and_grade(TEST_SIZES[4], threads=1, points=4)

    # Test out parallel implementation, but without the restriction of having
    # correctly sorted output: 50 points (2 x 5 x 5).
    for test_size in TEST_SIZES:
        check_and_grade(test_size, threads=2, sort_out_file=True, points=5)
        check_and_grade(test_size, threads=4, sort_out_file=True, points=5)

    # Test out parallel implementation, this time with the restriction of having
    # correctly sored output: 30 points (5 x 6)
    for test_size in TEST_SIZES[2:]:
        check_and_grade(
            test_size, threads=4, sort_out_file=False, points=5, trace_logs=True
        )
        check_and_grade(
            test_size, threads=8, sort_out_file=False, points=5, trace_logs=True
        )

    TOTAL = int(TOTAL)
    print("\nTotal:" + 67 * " " + f" {TOTAL}/100")


if __name__ == "__main__":
    main()
