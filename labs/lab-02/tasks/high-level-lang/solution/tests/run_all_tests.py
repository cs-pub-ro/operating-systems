#!/bin/python3
# SPDX-License-Identifier: BSD-3-Clause

import subprocess
import filecmp
import os

progs_fibo = [
    {"name": "Fibonacci [C]", "cmdline": "./fibo"},
    {"name": "Fibonacci [Python]", "cmdline": "python3 fibo.py"},
    {"name": "Fibonacci [Go]", "cmdline": "./fibo_go"},
]

values_fibo = [(10, 55), (5, 5), (20, 6765)]

progs_copy = [
    {"name": "Copy [C]", "cmdline": "./copy"},
    {"name": "Copy [Python]", "cmdline": "python3 copy.py"},
    {"name": "Copy [Go]", "cmdline": "./copy_go"},
]

if __name__ == "__main__":
    for prog in progs_fibo:
        for val in values_fibo:
            inp, out = val
            shellcmd = prog["cmdline"] + " " + str(inp)

            output = (
                subprocess.Popen(shellcmd, shell=True, stdout=subprocess.PIPE)
                .stdout.read()
                .decode("utf-8")
            )
            try:
                num_output = int(output)
            except:
                num_output = -1

            if num_output == out:
                print(
                    f"{prog['name']:<18}  --  fibo({inp:>2}) == {output.strip():>4}  --  PASSED"
                )
            else:
                print(
                    f"{prog['name']:<18}  --  fibo({inp:>2}) != {output.strip():>4}  --  FAILED"
                )

    for prog in progs_copy:
        shellcmd = prog["cmdline"] + " ../src/testfile.txt ../src/testfile2.txt"

        os.system(shellcmd)
        try:
            ok = filecmp.cmp(
                "../src/testfile.txt", "../src/testfile2.txt", shallow=False
            )
        except:
            ok = False

        try:
            os.unlink("../src/testfile2.txt")
        except:
            pass

        if ok:
            print(f"{prog['name']:<18}  --  PASSED")
        else:
            print(f"{prog['name']:<18}  --  FAILED")
