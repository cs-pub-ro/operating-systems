#!/bin/sh

test -d work || mkdir work
num_files=10

for i in $(seq -f "%02g" 1 "$num_files"); do
    cat > work/hello-"$i".c <<END
#include <stdio.h>
#include <unistd.h>

int main(void)
{
    puts("Hello, World! ($i)!");
    sleep(1000000);
    return 0;
}
END
done
