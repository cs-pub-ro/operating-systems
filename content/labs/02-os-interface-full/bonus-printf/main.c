#include "printf.h"

int main(void)
{
	/* Basic string */
	printf("Hello, World!\n");

	/* Integer formatting */
	printf("Decimal:     %d\n", 42);
	printf("Negative:    %d\n", -7);
	printf("Hex:         0x%x\n", 0xdeadbeef);
	printf("Octal:       0%o\n", 0755);

	/* Width and padding */
	printf("Padded:      %10d\n", 42);
	printf("Left-align:  %-10d|\n", 42);
	printf("Zero-pad:    %08d\n", 42);

	/* Strings and characters */
	printf("String:      %s\n", "operating systems");
	printf("Char:        %c\n", 'A');

	/* Floating point */
	printf("Float:       %.4f\n", 3.14159265);

	return 0;
}
