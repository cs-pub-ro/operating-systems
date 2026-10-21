/*
 * Salary report.
 *
 * Reads employees from a CSV file, one "name,department,salary" per line,
 * then prints the payroll of every department and the highest-paid employee.
 *
 * At least it is supposed to. Right now it does not get that far.
 *
 * Build:  make
 * Run:    ./report employees.csv
 */
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define LINE_LEN	128
#define NAME_LEN	32
#define MAX_EMPLOYEES	100
#define MAX_DEPARTMENTS	16

struct employee {
	char name[NAME_LEN];
	char department[NAME_LEN];
	int salary;
};

/* The payroll of one department. */
struct payroll {
	char department[NAME_LEN];
	int headcount;
	int total;
};

/* Copy a field into a fixed-size name, truncating if it is too long. */
static void copy_field(char *dst, const char *src)
{
	strncpy(dst, src, NAME_LEN - 1);
	dst[NAME_LEN - 1] = '\0';
}

/* Split one CSV line into its three fields. */
static void parse_employee(char *line, struct employee *e)
{
	char *name = strtok(line, ",");
	char *department = strtok(NULL, ",");
	char *salary = strtok(NULL, ",");

	copy_field(e->name, name);
	copy_field(e->department, department);
	e->salary = atoi(salary);
}

/* Find the payroll of a department, creating it on first sight. */
static struct payroll *find_payroll(struct payroll *payrolls, size_t *count,
				    const char *department)
{
	size_t i;

	for (i = 0; i < *count; i++)
		if (strcmp(payrolls[i].department, department) == 0)
			return &payrolls[i];

	if (*count == MAX_DEPARTMENTS)
		return NULL;

	copy_field(payrolls[*count].department, department);
	payrolls[*count].headcount = 0;
	payrolls[*count].total = 0;

	return &payrolls[(*count)++];
}

int main(int argc, char *argv[])
{
	struct employee employees[MAX_EMPLOYEES];
	struct payroll payrolls[MAX_DEPARTMENTS];
	size_t nemployees = 0, npayrolls = 0, i;
	const struct employee *top = NULL;
	char line[LINE_LEN];
	FILE *f;

	if (argc != 2) {
		fprintf(stderr, "usage: %s <csv-file>\n", argv[0]);
		exit(EXIT_FAILURE);
	}

	f = fopen(argv[1], "r");
	if (f == NULL) {
		perror(argv[1]);
		return 1;
	}

	while (nemployees < MAX_EMPLOYEES &&
	       fgets(line, sizeof(line), f) != NULL) {
		line[strcspn(line, "\n")] = '\0';
		parse_employee(line, &employees[nemployees]);
		nemployees++;
	}

	fclose(f);

	for (i = 0; i < nemployees; i++) {
		const struct employee *e = &employees[i];
		struct payroll *p;

		p = find_payroll(payrolls, &npayrolls, e->department);
		if (p == NULL) {
			fprintf(stderr, "too many departments\n");
			return 1;
		}
		p->headcount++;
		p->total += e->salary;

		if (top == NULL || e->salary > top->salary)
			top = e;
	}

	printf("%-14s %10s %10s\n", "department", "headcount", "payroll");
	for (i = 0; i < npayrolls; i++)
		printf("%-14s %10d %10d\n", payrolls[i].department,
		       payrolls[i].headcount, payrolls[i].total);

	if (top != NULL)
		printf("\nhighest paid: %s (%s), %d\n",
		       top->name, top->department, top->salary);

	return 0;
}
