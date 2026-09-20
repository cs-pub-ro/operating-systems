# SHA-256 against a one-line non-cryptographic hash, over the same input.
#
# Needs the OpenSSL development files:
#   Debian / Ubuntu   apt install libssl-dev
#   Fedora            dnf install openssl-devel
#   Arch              pacman -S openssl

CFLAGS = -Wall -Wextra -O2
LDLIBS = -lcrypto

.PHONY: all run clean

all: security-vs-performance

run: security-vs-performance
	./security-vs-performance

clean:
	-rm -f *~ *.o security-vs-performance
