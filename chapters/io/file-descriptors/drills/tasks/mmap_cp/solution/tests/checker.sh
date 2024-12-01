#!/bin/bash
# SPDX-License-Identifier: GPL-2.0

# Make cmd
cd ../src || exit
make
cd ../tests || exit
echo

# Create a test file
echo "This is a test file." > testfile.txt

# Copy using mmap_cp
./../src/mmap_cp testfile.txt testfile_mmap.txt > /dev/null

# Copy using standard cp command
cp testfile.txt testfile_rw.txt

# Verify the files are identical
if cmp -s testfile.txt testfile_mmap.txt && cmp -s testfile.txt testfile_rw.txt; then
    echo "Test PASSED (File copies are identical)"
else
    echo "Test FAILED (File copies differ)"
fi

# Clean up
rm testfile.txt testfile_mmap.txt testfile_rw.txt
