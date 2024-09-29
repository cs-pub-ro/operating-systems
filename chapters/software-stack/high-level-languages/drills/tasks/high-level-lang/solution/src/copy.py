import sys
import shutil

# TODO 8: Copy file from command line arguments

if len(sys.argv) < 3:
    sys.exit(1)

try:
    shutil.copyfile(sys.argv[1], sys.argv[2])
except shutil.Error:
    sys.exit(1)
