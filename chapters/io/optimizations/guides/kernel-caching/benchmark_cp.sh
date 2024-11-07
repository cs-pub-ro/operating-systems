#!/bin/bash
# SPDX-License-Identifier: BSD-3-Clause

[ -f large-file.txt ] || make large-file

# Drop all OS caches: buffer cache, dentry cache, inode cache, page cache.
sudo sh -c "sync; echo 3 > /proc/sys/vm/drop_caches"

echo "Benchmarking cp on a 1 GB file..."
time cp large-file.txt large-file-cp.txt
