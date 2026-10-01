#!/usr/bin/env bash
#
# Check that the tools the lab sessions need are installed.
#
# Every session README lists its prerequisites; this script checks them, one
# session at a time, and says what to install for the ones that are missing.
# Run it before a session, on the machine you will be working on:
#
#     ./scripts/check-prerequisites.sh          # every session
#
# It changes nothing: it only looks around and reports. The exit status is 0
# when everything a checked session needs is there, and 1 otherwise.

set -u

readonly LAST_SESSION=5

# Terminal colours, but only when the output is a terminal: piping the report
# into a file or a pager should not fill it with escape sequences.
if [[ -t 1 ]]; then
	readonly RED=$'\033[31m'
	readonly GREEN=$'\033[32m'
	readonly YELLOW=$'\033[33m'
	readonly BOLD=$'\033[1m'
	readonly RESET=$'\033[0m'
else
	readonly RED='' GREEN='' YELLOW='' BOLD='' RESET=''
fi

# Tools that are missing, and tools that are missing but only needed by an
# optional (bonus) task. The second kind does not fail the run.
missing=()
missing_optional=()

usage() {
	cat <<'EOF'
Usage: check-prerequisites.sh [OPTION]...

Check that the tools needed by the lab sessions are installed.

  -q, --quiet       report only what is missing
  -h, --help        show this message

Exit status is 0 when everything needed is installed, 1 otherwise.
EOF
}

quiet=0
session=all

while [[ $# -gt 0 ]]; do
	case "$1" in
	-q | --quiet)
		quiet=1
		shift
		;;
	-h | --help)
		usage
		exit 0
		;;
	*)
		echo "error: unknown argument: $1" >&2
		usage >&2
		exit 2
		;;
	esac
done

say() {
	((quiet)) || printf '%s\n' "$*"
}

heading() {
	say ""
	say "${BOLD}$*${RESET}"
}

# One line of the report: a status, the thing checked, and a detail.
report() {
	local status=$1 name=$2 detail=$3

	case "$status" in
	ok)
		say "  ${GREEN}[ ok ]${RESET} $(printf '%-14s' "$name") $detail"
		;;
	optional)
		printf '  %s[ -- ]%s %-14s %s\n' "$YELLOW" "$RESET" "$name" "$detail"
		;;
	missing)
		printf '  %s[ !! ]%s %-14s %s\n' "$RED" "$RESET" "$name" "$detail"
		;;
	esac
}

# Note down a tool that is not installed. A tool needed by two sessions is
# checked twice but reported as missing once.
remember_missing() {
	local kind=$1 tool=$2

	if [[ $kind == optional ]]; then
		[[ " ${missing_optional[*]-} " == *" $tool "* ]] ||
			missing_optional+=("$tool")
	else
		[[ " ${missing[*]-} " == *" $tool "* ]] || missing+=("$tool")
	fi
}

# A list of names, as a sentence rather than as shell words.
join_list() {
	local separator='' item

	for item in "$@"; do
		printf '%s%s' "$separator" "$item"
		separator=', '
	done
}

# The first line of `<tool> --version`, which is what most of these tools
# answer with. Tools that do not are reported as simply being there.
version_of() {
	local tool=$1 line

	line=$("$tool" --version 2>/dev/null | head -n 1)
	printf '%s' "${line:-installed}"
}

# Whether a tool is installed. `required` fails the run when it is not,
# `optional` only mentions it: those are the tools a bonus task needs.
check_command() {
	local tool=$1 need=${2:-required} note=${3:-}
	local path

	if path=$(command -v "$tool" 2>/dev/null); then
		report ok "$tool" "$(version_of "$path")"
		return 0
	fi

	if [[ $need == optional ]]; then
		report optional "$tool" "not installed${note:+ -- $note}"
		remember_missing optional "$tool"
	else
		report missing "$tool" "not installed${note:+ -- $note}"
		remember_missing required "$tool"
	fi
	return 1
}

# `time` is a shell keyword as well as a program, and the sessions use the
# program, so look for the file rather than asking the shell.
check_time() {
	if [[ -x /usr/bin/time ]]; then
		report ok "/usr/bin/time" "$(version_of /usr/bin/time)"
	else
		report missing "/usr/bin/time" "not installed -- the shell built-in is not enough"
		remember_missing required /usr/bin/time
	fi
}

# The inline assembly of session 02 and the exploits of session 05 are written
# for x86-64 Linux, and will not work anywhere else.
check_arch() {
	local machine
	machine=$(uname -m)

	if [[ $machine == x86_64 ]]; then
		report ok "architecture" "$machine"
	else
		report missing "architecture" "$machine -- this session needs x86-64"
		remember_missing required "x86-64 machine"
	fi
}

# Not every distribution ships the static libc, and session 01 links against
# it. Finding out during the lab is a waste of the lab.
check_static_libc() {
	local source=${TMPDIR:-/tmp}/os-prereq-$$.c
	local binary=${source%.c}

	if ! command -v gcc >/dev/null 2>&1; then
		return
	fi

	printf 'int main(void) { return 0; }\n' >"$source"
	if gcc -static -o "$binary" "$source" >/dev/null 2>&1; then
		report ok "static libc" "gcc -static works"
	else
		report missing "static libc" "gcc -static fails -- the static C library is missing"
		remember_missing required "static libc"
	fi
	rm -f "$source" "$binary"
}

# pwntools is a Python library, so having python3 says nothing about it.
check_pwntools() {
	local version

	if ! command -v python3 >/dev/null 2>&1; then
		return
	fi

	if version=$(python3 -c 'import pwnlib; print(pwnlib.__version__)' 2>/dev/null); then
		report ok "pwntools" "$version"
	else
		report missing "pwntools" "not installed for this python3"
		remember_missing required pwntools
	fi
}

check_common() {
	heading "Common (every session)"
	check_command gcc
	check_command make
}

check_session_01() {
	heading "Session 01 -- The Software Stack"
	check_command ar
	check_command nm
	check_command objdump
	check_command size
	check_command ldd
	check_command strace
	check_time
	check_static_libc
}

check_session_02() {
	heading "Session 02 -- The Operating System Interface"
	check_arch
	check_command strace
}

check_session_03() {
	heading "Session 03 -- Memory Operations"
	check_command valgrind
}

check_session_04() {
	heading "Session 04 -- Memory Debugging"
	check_command gdb
	check_command valgrind
	check_command objdump
	check_command nm
	check_command readelf
	check_command python3 optional "needed by the binary-only bonus task"
}

check_session_05() {
	heading "Session 05 -- Memory Security"
	check_arch
	check_command gdb
	check_command objdump
	check_command python3
	check_pwntools
	check_command nc optional "needed to reach a challenge deployed over the network"
}

# The package that provides a tool, for the package manager this machine uses.
# A tool with no entry is its own package, which is true of most of them.
package_for() {
	local manager=$1 tool=$2

	case "$tool" in
	ar | nm | objdump | size | readelf)
		echo binutils
		;;
	ldd)
		case "$manager" in
		apt-get) echo libc-bin ;;
		*) echo glibc ;;
		esac
		;;
	/usr/bin/time)
		echo time
		;;
	nc)
		case "$manager" in
		apt-get) echo netcat-openbsd ;;
		pacman) echo openbsd-netcat ;;
		*) echo nmap-ncat ;;
		esac
		;;
	"static libc")
		case "$manager" in
		apt-get) echo libc6-dev ;;
		pacman) echo glibc ;;
		*) echo glibc-static ;;
		esac
		;;
	*)
		echo "$tool"
		;;
	esac
}

# The package manager of this machine, if it is one we know how to advise on.
detect_manager() {
	local manager
	for manager in apt-get dnf pacman zypper; do
		if command -v "$manager" >/dev/null 2>&1; then
			printf '%s' "$manager"
			return
		fi
	done
}

install_command() {
	local manager=$1
	shift

	case "$manager" in
	apt-get) echo "sudo apt-get install $*" ;;
	dnf) echo "sudo dnf install $*" ;;
	pacman) echo "sudo pacman -S $*" ;;
	zypper) echo "sudo zypper install $*" ;;
	esac
}

# What to run to fix what is missing, as one command per package manager.
suggest_install() {
	local manager=$1
	shift
	local tool packages=() package

	for tool in "$@"; do
		case "$tool" in
		# Nothing to install: pwntools is a Python library, whose distribution
		# package is usually far behind, and an architecture is not a package.
		# The empty case is an empty list of optional tools.
		"" | pwntools | "x86-64 machine")
			continue
			;;
		esac
		package=$(package_for "$manager" "$tool")
		# The same package provides several of these tools.
		if [[ " ${packages[*]-} " != *" $package "* ]]; then
			packages+=("$package")
		fi
	done

	if ((${#packages[@]})); then
		echo ""
		echo "Install the missing packages with:"
		echo ""
		echo "    $(install_command "$manager" "${packages[@]}")"
	fi
}

main() {
	say "${BOLD}Operating Systems -- prerequisites${RESET}"

	if [[ $session == all ]]; then
		check_common
		check_session_01
		check_session_02
		check_session_03
		check_session_04
		check_session_05
	else
		check_common
		"check_session_$(printf '%02d' "$session")"
	fi

	echo ""
	if ((${#missing_optional[@]})); then
		echo "${YELLOW}Missing, needed only by bonus tasks:${RESET} $(join_list "${missing_optional[@]}")"
	fi

	if ((${#missing[@]} == 0)); then
		echo "${GREEN}Everything needed is installed.${RESET}"
		exit 0
	fi

	echo "${RED}Missing:${RESET} $(join_list "${missing[@]}")"

	local manager
	manager=$(detect_manager)
	if [[ -n $manager ]]; then
		suggest_install "$manager" "${missing[@]}" "${missing_optional[@]-}"
	else
		echo ""
		echo "Install them with the package manager of your distribution."
	fi

	if [[ " ${missing[*]} " == *" pwntools "* ]] ||
		[[ " ${missing_optional[*]-} " == *" pwntools "* ]]; then
		echo ""
		echo "pwntools is a Python library, and is installed with pip:"
		echo ""
		echo "    python3 -m pip install --user pwntools"
	fi

	if [[ " ${missing[*]} " == *" x86-64 machine "* ]]; then
		echo ""
		echo "Sessions 02 and 05 need an x86-64 machine: use a virtual machine,"
		echo "a container, or one of the faculty's lab machines."
	fi

	exit 1
}

main
