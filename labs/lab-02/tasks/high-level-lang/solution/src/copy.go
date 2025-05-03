package main

/* REMOVE 5 */
import (
	"io"
	"os"
)

func main() {
	/* TODO 24: Copy file from command line arguments */
	if len(os.Args) < 3 {
		os.Exit(1)
	}

	fin, err := os.Open(os.Args[1])
	if err != nil {
		os.Exit(1)
	}

	fout, err := os.Create(os.Args[2])
	if err != nil {
		fin.Close()
		os.Exit(1)
	}

	_, err = io.Copy(fout, fin)
	if err != nil {
		fin.Close()
		fout.Close()
		os.Exit(1)
	}

	fin.Close()
	fout.Close()
}
