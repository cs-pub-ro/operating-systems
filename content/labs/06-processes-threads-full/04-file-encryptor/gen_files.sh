#!/usr/bin/env bash
#
# Create the files the encryptor works on: NFILES files of random size and
# random content under data/, and an untouched copy of each under data.orig/
# to compare with afterwards.
#
#     ./gen_files.sh        # 64 files
#     ./gen_files.sh 57

set -eu

nfiles=${1:-64}

rm -rf data data.orig
mkdir data

for ((i = 1; i <= nfiles; i++)); do
	# Between 64 KiB and about 576 KiB each.
	size=$((65536 + RANDOM * 16))
	head -c "$size" /dev/urandom > "data/file-$(printf '%02d' "$i").bin"
done

cp -r data data.orig

echo "$nfiles files in data/, with a copy of each in data.orig/"
