// SPDX-License-Identifier: BSD-3-Clause

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <mcheck.h>

struct student {
	char name[128];
	unsigned int age;
	char favorite_os[16];
};

static void init_student(struct student *s, const char *name, unsigned int age, const char *os)
{
	strcpy(s->name, name);
	s->age = age;
	strcpy(s->favorite_os, os);
}

static void print_student(struct student *s)
{
	printf("%s is %u years old and likes %s\n",
			s->name, s->age, s->favorite_os);
}

int main(void)
{
	struct student *s;

	mtrace();

	s = malloc(sizeof(*s));
	init_student(s, "Linus Torvalds", 22, "Linux");
	print_student(s);

	/* TODO 1: Solve memory leaks. */
	free(s);

	s = malloc(sizeof(*s));
	init_student(s, "Steve Jobs", 23, "macOS");
	print_student(s);

	/* REMOVE 2 */
	free(s);

	/* TODO 1: Print size of student. */
	printf("Size of struct student: %ld\n", sizeof(struct student));

	return 0;
}
