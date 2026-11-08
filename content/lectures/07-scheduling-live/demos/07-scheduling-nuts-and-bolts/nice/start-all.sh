#!/bin/bash
#
# Start three groups of CPU-bound processes, N per group, where N is the
# number of cores: one group at nice -20 (needs root), one at the default 0,
# one at +19.  Every process is wrapped in `/usr/bin/time -v`, whose report
# goes to pri<nice>-<i>.txt; `grep Elapsed pri*.txt` compares the groups.

n=$(nproc)

# Ask for the sudo password up front, so the -20 group starts together.
sudo -v

for i in $(seq 1 "$n"); do
	sudo nice -n -20 /usr/bin/time -v ./cpu 2> "pri-20-$i.txt" &
done
for i in $(seq 1 "$n"); do
	/usr/bin/time -v ./cpu 2> "pri0-$i.txt" &
done
for i in $(seq 1 "$n"); do
	nice -n 19 /usr/bin/time -v ./cpu 2> "pri+19-$i.txt" &
done

wait
