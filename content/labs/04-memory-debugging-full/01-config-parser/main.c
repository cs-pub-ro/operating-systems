/*
 * Config parser -- fixed version.
 *
 * Two leaks were removed; each one is marked with a "FIX n" comment below.
 *
 *   FIX 1 (config_free) -- every setting owns two strings, and only one of
 *                          them was freed
 *   FIX 2 (main)        -- config_get() returns a copy the caller owns, and
 *                          main() never freed it
 *
 * Build:  make
 * Run:    ./config config.txt
 */
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define LINE_LEN	256
#define MAX_SETTINGS	64

/* One "key = value" line. Both strings are heap copies owned by the setting. */
struct setting {
	char *key;
	char *value;
};

struct config {
	struct setting settings[MAX_SETTINGS];
	size_t count;
};

/* Strip blanks from both ends of s, in place; returns the first word. */
static char *trim(char *s)
{
	char *end;

	s += strspn(s, " \t");
	end = s + strlen(s);
	while (end > s && strchr(" \t\n", end[-1]) != NULL)
		end--;
	*end = '\0';

	return s;
}

/* Store a copy of one key/value pair. Returns 0 on success, -1 on failure. */
static int config_add(struct config *cfg, const char *key, const char *value)
{
	struct setting *s;

	if (cfg->count == MAX_SETTINGS)
		return -1;

	s = &cfg->settings[cfg->count];
	s->key = strdup(key);
	s->value = strdup(value);
	if (s->key == NULL || s->value == NULL) {
		free(s->key);
		free(s->value);
		return -1;
	}

	cfg->count++;

	return 0;
}

/*
 * Look a key up. Returns a heap copy of its value, which the caller owns
 * and must free, or NULL if the key is not set.
 */
static char *config_get(const struct config *cfg, const char *key)
{
	size_t i;

	for (i = 0; i < cfg->count; i++)
		if (strcmp(cfg->settings[i].key, key) == 0)
			return strdup(cfg->settings[i].value);

	return NULL;
}

/* Release everything the configuration owns. */
static void config_free(struct config *cfg)
{
	size_t i;

	/*
	 * FIX 1: config_add() makes two copies per setting, the key and the
	 * value. The buggy version freed only the key, so every value was
	 * lost: one block per setting, allocated in config_add().
	 */
	for (i = 0; i < cfg->count; i++) {
		free(cfg->settings[i].key);
		free(cfg->settings[i].value);
	}

	cfg->count = 0;
}

/* Read every setting in the file. Returns 0 on success, -1 on failure. */
static int config_load(struct config *cfg, const char *path)
{
	FILE *f = fopen(path, "r");
	char line[LINE_LEN];

	if (f == NULL) {
		perror(path);
		return -1;
	}

	while (fgets(line, sizeof(line), f) != NULL) {
		char *text = trim(line);
		char *eq;

		/* Blank lines and comments carry no setting. */
		if (*text == '\0' || *text == '#')
			continue;

		eq = strchr(text, '=');
		if (eq == NULL) {
			fprintf(stderr, "ignoring malformed line: %s\n", text);
			continue;
		}

		*eq = '\0';
		if (config_add(cfg, trim(text), trim(eq + 1)) != 0) {
			fprintf(stderr, "too many settings\n");
			fclose(f);
			return -1;
		}
	}

	fclose(f);

	return 0;
}

int main(int argc, char *argv[])
{
	struct config cfg = { .count = 0 };
	static const char * const keys[] = {
		"hostname", "port", "log_level", "timeout"
	};
	const char *path = argc > 1 ? argv[1] : "config.txt";
	size_t i;

	if (config_load(&cfg, path) != 0)
		return 1;

	printf("%zu settings loaded\n", cfg.count);

	for (i = 0; i < sizeof(keys) / sizeof(keys[0]); i++) {
		char *value = config_get(&cfg, keys[i]);

		printf("%s = %s\n", keys[i], value != NULL ? value : "(not set)");

		/*
		 * FIX 2: config_get() hands back a copy, and the comment above
		 * it says who owns it: the caller. One block per successful
		 * lookup was lost. free(NULL) is allowed and does nothing, so
		 * the "not set" case needs no special treatment.
		 */
		free(value);
	}

	config_free(&cfg);

	return 0;
}
