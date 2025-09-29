LDFLAGS = -z lazy

.PHONY: all clean

all: hello fibo fibo_go copy copy_go

hello: hello.go
	go build -ldflags '-linkmode external -extldflags "-dynamic"' $<

fibo_go: fibo.go
	go build -o $@ -ldflags '-linkmode external -extldflags "-dynamic"' $<

copy_go: copy.go
	go build -o $@ -ldflags '-linkmode external -extldflags "-dynamic"' $<

clean:
	-rm -f hello
	-rm -f fibo
	-rm -f fibo_go
	-rm -f copy
	-rm -f copy_go
	-rm -f testfile2.txt
	-rm -f *~
