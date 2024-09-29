#!/bin/python3
import subprocess
import filecmp
import os

progs_fibo = [
    { "name": "Fibonacci [C]", "cmdline": "./fibo" },
    { "name": "Fibonacci [Python]", "cmdline": "python3 fibo.py" },
    { "name": "Fibonacci [Go]", "cmdline": "./fibo_go" }
]

values_fibo = [ (10, 55), (5, 5), (20, 6765) ]

progs_copy = [
    { "name": "Copy [C]", "cmdline": "./copy" },
    { "name": "Copy [Python]", "cmdline": "python3 copy.py" },
    { "name": "Copy [Go]", "cmdline": "./copy_go" }
]

if __name__ == "__main__":
    for prog in progs_fibo:
        for val in values_fibo:
            inp, out = val
            shellcmd = prog["cmdline"] + " " + str(inp)

            output = subprocess.Popen(shellcmd, shell = True, stdout = subprocess.PIPE).stdout.read().decode("utf-8")
            try:
                num_output = int(output)
            except:
                num_output = -1

            if num_output == out:
                print(f"{prog['name']:<18}  --  fibo({inp:>2}) == {output.strip():>4}  --  PASSED")
            else:
                print(f"{prog['name']:<18}  --  fibo({inp:>2}) != {output.strip():>4}  --  FAILED")

    for prog in progs_copy:
        shellcmd = prog["cmdline"] + " ../../solution/src/testfile.txt testfile2.txt"

        output = subprocess.Popen(shellcmd, shell = True)
        try:
            ok = filecmp.cmp("../../solution/src/testfile.txt", "testfile2.txt")
        except:
            ok = False

        try:
            os.remove("testfile2.txt")
        except:
            pass

        if ok:
            print(f"{prog['name']:<18}  --  PASSED")
        else:
            print(f"{prog['name']:<18}  --  FAILED")
