/*
 * main.c -- exercise the mini JSON library: parse, print, serialize,
 * build a tree by hand, and check that malformed input is rejected
 * cleanly (no crash, no leak).
 *
 * Build:  make
 * Run:    ./jsontool
 */
#include <stdio.h>
#include <stdlib.h>

#include "json_value.h"

static void section(const char *title)
{
	printf("\n== %s ==\n", title);
}

int main(void)
{
	const char *good_doc =
		"{"
		"  \"name\": \"Ada Lovelace\","
		"  \"born\": 1815,"
		"  \"tags\": [\"mathematician\", \"programmer\", \"countess\"],"
		"  \"active\": false,"
		"  \"notes\": \"first \\\"algorithm\\\" ever published\","
		"  \"nickname\": \"Enchantress of N\\u00fcmbers\","
		"  \"metadata\": null"
		"}";

	const char *bad_doc_1 =
		"[1, 2, 3,]";		/* trailing comma, no element after it */

	const char *bad_doc_2 =
		"{\"a\": 1, \"b\": [1, 2}";	/* array closed with '}' */

	json_value_t *doc;
	char *error;
	char *serialized;
	json_value_t *manual;

	section("parsing a well-formed document");
	doc = json_parse(good_doc, &error);
	if (doc == NULL) {
		fprintf(stderr, "unexpected parse error: %s\n", error);
		free(error);
		return 1;
	}

	printf("parsed ok. ");
	json_print(doc);

	section("round-tripping through serialize()");
	serialized = json_serialize(doc);
	printf("%s\n", serialized);
	free(serialized);

	json_free(doc);

	section("rejecting malformed input (trailing comma)");
	doc = json_parse(bad_doc_1, &error);
	if (doc != NULL) {
		printf("BUG: parser accepted invalid input!\n");
		json_free(doc);
	} else {
		printf("rejected as expected: %s\n", error);
		free(error);
	}

	section("rejecting malformed input (mismatched brackets)");
	doc = json_parse(bad_doc_2, &error);
	if (doc != NULL) {
		printf("BUG: parser accepted invalid input!\n");
		json_free(doc);
	} else {
		printf("rejected as expected: %s\n", error);
		free(error);
	}

	section("building a tree by hand with the constructor API");
	manual = json_new_object();
	json_object_set(manual, "id", json_new_number(42));
	json_object_set(manual, "label", json_new_string("hand-built"));

	json_value_t *list = json_new_array();
	json_array_append(list, json_new_bool(1));
	json_array_append(list, json_new_bool(0));
	json_array_append(list, json_new_null());
	json_object_set(manual, "flags", list);

	json_print(manual);
	json_free(manual);

	section("done");
	printf("all good.\n");

	return 0;
}
