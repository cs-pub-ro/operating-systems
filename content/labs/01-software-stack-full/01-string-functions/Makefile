CC     := gcc
# -fno-builtin: gcc knows what strlen/strcpy/memcpy mean and will happily
# replace calls with inline SIMD, or fold them away entirely at compile time.
# That would measure the compiler, not our code. See the README.
CFLAGS := -O2 -Wall -Wextra -std=c11 -fno-builtin

.PHONY: all test bench clean

all: test_mystring bench_strcat

# Separate .o files on purpose: no cross-file inlining, so bench.c really does
# call into your mystring.c the way a library call works.
mystring.o: mystring.c mystring.h
	$(CC) $(CFLAGS) -c -o $@ $<

test_mystring.o: test_mystring.c mystring.h
	$(CC) $(CFLAGS) -c -o $@ $<

bench.o: bench.c mystring.h
	$(CC) $(CFLAGS) -c -o $@ $<

test_mystring: test_mystring.o mystring.o
	$(CC) $(CFLAGS) -o $@ $^

bench_strcat: bench.o mystring.o
	$(CC) $(CFLAGS) -o $@ $^

# Correctness first...
test: test_mystring
	@./test_mystring

# ...then speed. Timing a wrong answer is not a measurement.
bench: bench_strcat
	@./bench_strcat

clean:
	$(RM) test_mystring bench_strcat *.o
