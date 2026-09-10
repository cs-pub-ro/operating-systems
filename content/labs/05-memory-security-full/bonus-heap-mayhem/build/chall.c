/*
 * chall.c -- heap-mayhem: a small "account vault" with an audit hook.
 *
 * Each account is a heap-allocated struct with a name buffer, a balance,
 * and a function pointer that gets called whenever the account is
 * audited. rename_account() copies the player-supplied name straight into
 * an *already-allocated* account with scanf("%s", ...) -- no length check
 * -- and accounts are allocated back-to-back on the heap, so a long
 * enough name overflows past this account's own balance/audit fields and
 * into the next account's, without anything re-initialising them
 * afterwards to undo the damage.
 *
 * Unlike the other heap-havoc-style challenges, this binary is built as a
 * PIE: every address (code, heap) is randomised per run, and the program
 * hands the player no shortcuts for defeating that. The only address ever
 * printed is a legitimate function pointer belonging to an account that
 * has not been tampered with -- but a function pointer *is* a code
 * address, and this binary is fixed at a constant offset from its own
 * base no matter where that base is loaded. Leak one pointer into a
 * function you know the address of within the binary, and you know the
 * binary's load base -- and therefore the address of every other
 * function in it, including one nobody is supposed to call.
 */
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define FLAGSIZE_MAX	64
#define MAX_ACCOUNTS	4
#define NAME_SIZE	24

struct account {
	char name[NAME_SIZE];
	long balance;
	void (*audit)(const struct account *);
};

static struct account *accounts[MAX_ACCOUNTS];

/* Ordinary audit hook: every account starts out pointing at this. */
static void default_audit(const struct account *a)
{
	printf("audit ok: %-24s balance=%ld\n", a->name, a->balance);
}

/*
 * Nothing in this program ever sets an account's audit pointer to this
 * function. The only way to reach it is to overwrite an account's audit
 * field with its address.
 */
static void secret_audit(const struct account *a)
{
	char buf[FLAGSIZE_MAX];
	FILE *fd;

	(void)a;

	printf("\nSECRET AUDITOR CALLED\n");

	fd = fopen("flag.txt", "r");
	if (fd == NULL) {
		perror("fopen");
		exit(1);
	}
	fgets(buf, FLAGSIZE_MAX, fd);
	printf("%s\n", buf);
	fflush(stdout);
	fclose(fd);
}

static void print_menu(void)
{
	printf("\n1. Create account\n2. List accounts\n3. Rename account\n"
	       "4. Run audit\n5. Exit\n\nEnter your choice: ");
	fflush(stdout);
}

/*
 * Allocates a new account in slot "idx" with a benign starting name.
 * Accounts are allocated back-to-back on the heap in whatever order the
 * player creates them.
 */
static void create_account(void)
{
	int idx;

	printf("Slot (0-%d): ", MAX_ACCOUNTS - 1);
	fflush(stdout);
	if (scanf("%d", &idx) != 1)
		exit(0);

	if (idx < 0 || idx >= MAX_ACCOUNTS) {
		printf("Invalid slot\n");
		fflush(stdout);
		return;
	}

	if (accounts[idx] != NULL) {
		printf("Slot already in use\n");
		fflush(stdout);
		return;
	}

	accounts[idx] = malloc(sizeof(struct account));

	printf("Name: ");
	fflush(stdout);
	scanf("%s", accounts[idx]->name);

	accounts[idx]->balance = 100;
	accounts[idx]->audit = default_audit;
}

/*
 * Overwrites the name of an *existing* account with scanf("%s", ...),
 * which stops only at whitespace -- never at NAME_SIZE. Unlike
 * create_account(), this never touches balance/audit, so a long enough
 * name silently overflows past this account's own fields and into
 * whatever the allocator placed right after it on the heap -- typically
 * the next account created after this one.
 */
static void rename_account(void)
{
	int idx;

	printf("Slot (0-%d): ", MAX_ACCOUNTS - 1);
	fflush(stdout);
	if (scanf("%d", &idx) != 1)
		exit(0);

	if (idx < 0 || idx >= MAX_ACCOUNTS || accounts[idx] == NULL) {
		printf("Invalid slot\n");
		fflush(stdout);
		return;
	}

	printf("New name: ");
	fflush(stdout);
	scanf("%s", accounts[idx]->name);
}

static void list_accounts(void)
{
	int i;

	printf("[*] idx  address       name                      balance    audit\n");
	for (i = 0; i < MAX_ACCOUNTS; i++) {
		if (accounts[i] == NULL)
			continue;
		printf("[*] %-4d %p  %-24s  %-9ld  %p\n", i, (void *)accounts[i],
		       accounts[i]->name, accounts[i]->balance,
		       (void *)accounts[i]->audit);
	}
	fflush(stdout);
}

static void run_audit(void)
{
	int idx;

	printf("Slot (0-%d): ", MAX_ACCOUNTS - 1);
	fflush(stdout);
	if (scanf("%d", &idx) != 1)
		exit(0);

	if (idx < 0 || idx >= MAX_ACCOUNTS || accounts[idx] == NULL) {
		printf("Invalid slot\n");
		fflush(stdout);
		return;
	}

	if (accounts[idx]->audit != NULL)
		accounts[idx]->audit(accounts[idx]);
}

int main(void)
{
	int choice;

	printf("\nWelcome to the account vault.\n");
	printf("Every account gets audited on request -- nothing to worry "
	       "about.\n");
	fflush(stdout);

	while (1) {
		print_menu();

		if (scanf("%d", &choice) != 1)
			exit(0);

		switch (choice) {
		case 1:
			create_account();
			break;
		case 2:
			list_accounts();
			break;
		case 3:
			rename_account();
			break;
		case 4:
			run_audit();
			break;
		case 5:
			return 0;
		default:
			printf("Invalid choice\n");
			fflush(stdout);
		}
	}
}
