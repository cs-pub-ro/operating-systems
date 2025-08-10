#!/bin/bash
# SPDX-License-Identifier: BSD-3-Clause

tests=(
"nolibc|20"
"nolibc_no_rwx_rodata|10"
"nolibc_no_rwx_text|10"
"no_pie|30"
"pie|10"
"envp|10"
)

loader="$(pwd)/../src/elf-loader"
snippets="$(pwd)/snippets/"
out="$(pwd)/out/"
ref="$(pwd)/ref/"
total=0

#set -o pipefail

print_test()
{
	func="$1"
	result="$2"
	points="$3"

	if test "$points" -gt 999; then
		points=999
	fi

	printf "%-32s " "${func:0:31}"
	printf "........................"
	if test "$result" -eq 0; then
		printf " passed ... %3d\n" "$points"
		total=$((total + points))
	else
		printf " failed ...  0\n"
	fi
}

ret_expected()
{
	testname="$1"

	if [[ "$testname" =~ "no_rwx" ]]; then
		return 139
	fi

	return 0
}

run_tests()
{
	for tst in "${tests[@]}"; do
		test_name="$(echo "$tst" | cut -d'|' -f1)"
		test_points="$(echo "$tst" | cut -d'|' -f2)"

		execute_test "$test_name" "$test_points"
	done

	echo ""
	echo -n "Total:                           "
	echo -n "                                "
	LC_ALL=C printf "%3d/100\n" "$total"
}

execute_test()
{
	filename="$1"
	points="$2"
	outf="$filename.out"
	reff="$filename.ref"

	setsid bash -c "timeout -k 3 2 $loader $snippets/$filename > $out/$outf" >/dev/null 2>&1 & pid=$!; wait $pid;

	ret_code=$?
	ret_expected "$filename"
	ret_exp=$?

	if test "$ret_code" -ne "$ret_exp"; then
		print_test "$filename" 1 "$points"
		return
	fi

	diff "$ref/$reff" "$out/$outf" > /dev/null
	print_test "$filename" $? "$points"
}

run_tests
