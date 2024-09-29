LDFLAGS = -z lazy

.PHONY: all clean

all: hello_c hello_go fibo_c fibo_go copy_c copy_go

hello_c: hello.c

hello_go: hello.go
	go build -ldflags '-linkmode external -extldflags "-dynamic"' $<

fibo_c: fibo.c

fibo_go: fibo.go
	go build -o $@ -ldflags '-linkmode external -extldflags "-dynamic"' $<

copy_c: copy.c

copy_go: copy.go
	go build -o $@ -ldflags '-linkmode external -extldflags "-dynamic"' $<

clean:
	-rm -f hello_c
	-rm -f hello_go
	-rm -f fibo_c
	-rm -f fibo_go
	-rm -f copy_c
	-rm -f copy_go
	-rm -f testfile2.txt
	-rm -f *~
