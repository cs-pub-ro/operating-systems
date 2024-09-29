import sys
import shutil

# TODO 7: Copy file from command line arguments

if len(sys.argv) < 3:
    sys.exit(1)
try:
    shutil.copy(sys.argv[1], sys.argv[2])
except shutil.Error:
    sys.exit(1)
