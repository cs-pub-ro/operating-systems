// SPDX-License-Identifier: BSD-3-Clause

#include <stdio.h>

int main(void )
{
	int a;
	const int ca = 2;

	char *p = "LeString";
	char *const cp = "ConstLeString";
	const char *const cp2 = "LeConstString";

	int arr[20];
	char c_arr[20];

	printf("sizeof(a) = %ld\n", sizeof(a));
	printf("sizeof(ca) = %ld\n", sizeof(ca));
	printf("sizeof(p) = %ld\n", sizeof(p));
	printf("sizeof(cp) = %ld\n", sizeof(cp));
	printf("sizeof(cp2) = %ld\n", sizeof(cp2));
	printf("sizeof(arr) = %ld\n", sizeof(arr));
	printf("sizeof(c_arr) = %ld\n", sizeof(c_arr));

	/* TODO 1: Implement assigning another value to ca */
	ca = 3;

	/* TODO 1: Implement assigning another value to cp */
	cp = "NewConstLeString";
	/* TODO 1: Attempt to modify the first character by dereferencing cp */
	*cp = 'X';

	/* REMOVE 3 */
	/* Note that *cp = 'X' fails not because of cp itself, but because of the readonly
	 * string literal it points to.
	 */

	/* TODO 1: Implement assigning another value to cp2 */
	cp2 = "NewLeConstString";
	/* TODO 1: Attempt to modify the first character by dereferencing cp2 */
	*cp2 = 'X';

	return 0;
}
