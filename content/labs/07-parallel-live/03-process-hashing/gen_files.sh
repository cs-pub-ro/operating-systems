#!/usr/bin/env bash
#
# Create the files to hash: NFILES files of SIZE MiB of random bytes each
# under data/, and files.txt, the list of their names, one per line.
#
#     ./gen_files.sh            # 16 files of 16 MiB
#     ./gen_files.sh 8 4        # 8 files of 4 MiB

set -eu

nfiles=${1:-16}
size_mib=${2:-16}

rm -rf data files.txt
mkdir data

for ((i = 1; i <= nfiles; i++)); do
	name="data/file-$(printf '%02d' "$i").bin"
	head -c "$((size_mib * 1024 * 1024))" /dev/urandom > "$name"
	echo "$name" >> files.txt
done

echo "$nfiles files of $size_mib MiB in data/, listed in files.txt"
