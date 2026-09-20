#include <stdio.h>
#include <string.h>

int main(void)
{
	char *str = "*Hello!";

	printf("str is '%s', str+1 is '%s'\n", str, str+1);
	str[0] = strlen(str) - 1;
	printf("str+1 is '%s'\n", str+1);

	return 0;
}
