package main

/* REMOVE 6 */
import (
	"fmt"
	"os"
	"strconv"
)

func main() {
	/* TODO 31: Compute the Nth fibonacci number */
	if len(os.Args) < 2 {
		fmt.Println("Not enough arguments")
		os.Exit(1)
	}

	N, err := strconv.Atoi(os.Args[1])

	if err != nil {
		fmt.Println("Invalid argument")
		os.Exit(1)
	}

	if N < 0 {
		fmt.Println("N cannot be negative")
		os.Exit(1)
	}

	if N == 0 {
		fmt.Println("0")
		return
	}

	a := 0
	b := 1
	for i := 1; i < N; i++ {
		c := a + b
		a = b
		b = c
	}

	fmt.Printf("%d\n", b)
}
