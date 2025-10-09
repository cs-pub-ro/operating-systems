// SPDX-License-Identifier: BSD-3-Clause

import std.stdio;

enum SIZE_INT = 32;

// TODO 9: Fix the bug causing the Segmentation Fault
void print_bit_array(uint[SIZE_INT] the_bits)
{
    int i = SIZE_INT - 1;
    while (i >= 0)
    {
        writeln(the_bits[i]);
        i--;
    }
}

// REPLACE 9
// void print_bit_array(uint[SIZE_INT] the_bits)
// {
//     uint i = SIZE_INT - 1;
//     while (i >= 0)
//     {
//         writeln(the_bits[i]);
//         i--;
//     }
// }

void to_bits(uint value, ref uint[SIZE_INT] in_bits)
{
    uint shift_bit = 0x0001;

    for(uint i = 0; i < SIZE_INT; i++)
    {
        if ((value & shift_bit) == 0)
            in_bits[i] = 0;
        else
            in_bits[i] = 1;
        shift_bit = shift_bit << 1;
    }
}

uint factorial(uint num)
{
    uint fact = 0;

    if (num == 0)
        return 1;

    fact = factorial(num - 1);
    return fact * num;
}

int main()
{
    uint number = 0;
    uint[SIZE_INT] the_bits;
    uint fact;

    write("Input a positive integer: ");
    readf(" %u", &number);

    fact = factorial(number);
    writeln(number, "   Factorial = ", fact);

    to_bits(fact, the_bits);
    print_bit_array(the_bits);

    return 0;
}
