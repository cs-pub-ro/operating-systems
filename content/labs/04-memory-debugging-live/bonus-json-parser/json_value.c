/*
 * json_value.c -- recursive-descent JSON parser and serializer.
 *
 * This file contains ONE memory bug, planted on purpose. The program
 * builds cleanly with -Wall -Wextra. Your job is to find it using manual
 * inspection, gdb and Valgrind -- see README.md for the debugging workflow
 * and hints.
 */
#include <ctype.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#include "json_value.h"

/* ---------------------------------------------------------------------- */
/* Growable string buffer, used while decoding a JSON string literal.     */
/* ---------------------------------------------------------------------- */

typedef struct {
	char *data;
	size_t len;
	size_t cap;
} strbuf_t;

static void strbuf_init(strbuf_t *sb)
{
	sb->data = NULL;
	sb->len = 0;
	sb->cap = 0;
}

/* Make sure there is room for at least "len + extra" bytes, growing by
 * doubling. Called before every append. */
static void strbuf_reserve(strbuf_t *sb, size_t extra)
{
	size_t needed = sb->len + extra;

	if (needed <= sb->cap)
		return;

	if (sb->cap == 0)
		sb->cap = 16;
	while (sb->cap < needed)
		sb->cap *= 2;

	sb->data = realloc(sb->data, sb->cap);
}

static void strbuf_putc(strbuf_t *sb, char c)
{
	strbuf_reserve(sb, 1);
	sb->data[sb->len++] = c;
}

/* Hand ownership of the finished, NUL-terminated string to the caller. */
static char *strbuf_finish(strbuf_t *sb)
{
	char *result;

	/* Trim the buffer down to exactly the bytes that were written. */
	result = malloc(sb->len);
	if (result != NULL) {
		memcpy(result, sb->data, sb->len);
		result[sb->len] = '\0';
	}

	free(sb->data);

	return result;
}

/* ---------------------------------------------------------------------- */
/* Constructors                                                           */
/* ---------------------------------------------------------------------- */

json_value_t *json_new_null(void)
{
	json_value_t *v = malloc(sizeof(*v));

	if (v != NULL)
		v->type = JSON_NULL;

	return v;
}

json_value_t *json_new_bool(int boolean)
{
	json_value_t *v = malloc(sizeof(*v));

	if (v != NULL) {
		v->type = JSON_BOOL;
		v->as.boolean = boolean ? 1 : 0;
	}

	return v;
}

json_value_t *json_new_number(double number)
{
	json_value_t *v = malloc(sizeof(*v));

	if (v != NULL) {
		v->type = JSON_NUMBER;
		v->as.number = number;
	}

	return v;
}

/* Takes a plain C string and makes its own heap copy. */
json_value_t *json_new_string(const char *str)
{
	json_value_t *v = malloc(sizeof(*v));

	if (v == NULL)
		return NULL;

	v->type = JSON_STRING;
	v->as.string = strdup(str);
	if (v->as.string == NULL) {
		free(v);
		return NULL;
	}

	return v;
}

json_value_t *json_new_array(void)
{
	json_value_t *v = malloc(sizeof(*v));

	if (v != NULL) {
		v->type = JSON_ARRAY;
		v->as.array.items = NULL;
		v->as.array.count = 0;
		v->as.array.capacity = 0;
	}

	return v;
}

json_value_t *json_new_object(void)
{
	json_value_t *v = malloc(sizeof(*v));

	if (v != NULL) {
		v->type = JSON_OBJECT;
		v->as.object.members = NULL;
		v->as.object.count = 0;
		v->as.object.capacity = 0;
	}

	return v;
}

void json_array_append(json_value_t *array, json_value_t *item)
{
	if (array->as.array.count == array->as.array.capacity) {
		size_t new_cap = array->as.array.capacity == 0
					 ? 4 : array->as.array.capacity * 2;

		array->as.array.items = realloc(array->as.array.items,
						 new_cap * sizeof(json_value_t *));
		array->as.array.capacity = new_cap;
	}

	array->as.array.items[array->as.array.count++] = item;
}

void json_object_set(json_value_t *object, const char *key,
		      json_value_t *value)
{
	size_t i;

	/* Replace an existing member with the same key, if any. */
	for (i = 0; i < object->as.object.count; i++) {
		if (strcmp(object->as.object.members[i].key, key) == 0) {
			json_free(object->as.object.members[i].value);
			object->as.object.members[i].value = value;
			return;
		}
	}

	if (object->as.object.count == object->as.object.capacity) {
		size_t new_cap = object->as.object.capacity == 0
					  ? 4 : object->as.object.capacity * 2;

		object->as.object.members = realloc(
			object->as.object.members,
			new_cap * sizeof(json_member_t));
		object->as.object.capacity = new_cap;
	}

	object->as.object.members[object->as.object.count].key = strdup(key);
	object->as.object.members[object->as.object.count].value = value;
	object->as.object.count++;
}

/* ---------------------------------------------------------------------- */
/* Freeing                                                                */
/* ---------------------------------------------------------------------- */

void json_free(json_value_t *value)
{
	size_t i;

	if (value == NULL)
		return;

	switch (value->type) {
	case JSON_STRING:
		free(value->as.string);
		break;

	case JSON_ARRAY:
		for (i = 0; i < value->as.array.count; i++)
			json_free(value->as.array.items[i]);
		free(value->as.array.items);
		break;

	case JSON_OBJECT:
		for (i = 0; i < value->as.object.count; i++) {
			free(value->as.object.members[i].key);
			json_free(value->as.object.members[i].value);
		}
		free(value->as.object.members);
		break;

	default:
		break;
	}

	free(value);
}

/* ---------------------------------------------------------------------- */
/* Parsing                                                                */
/* ---------------------------------------------------------------------- */

typedef struct {
	const char *p;		/* current position   */
	const char *begin;	/* start of the input, for offsets in errors */
} cursor_t;

static void set_error(char **error_out, const cursor_t *cur, const char *msg)
{
	if (error_out == NULL)
		return;

	free(*error_out);
	*error_out = malloc(128);
	if (*error_out != NULL)
		snprintf(*error_out, 128, "%s at offset %ld",
			 msg, (long)(cur->p - cur->begin));
}

static void skip_ws(cursor_t *cur)
{
	while (isspace((unsigned char)*cur->p))
		cur->p++;
}

static json_value_t *parse_value(cursor_t *cur, char **error_out);

static json_value_t *parse_literal(cursor_t *cur, const char *literal,
				    json_value_t *(*make)(void), char **error_out)
{
	size_t len = strlen(literal);

	if (strncmp(cur->p, literal, len) != 0) {
		set_error(error_out, cur, "invalid literal");
		return NULL;
	}

	cur->p += len;

	return make();
}

static json_value_t *make_true(void) { return json_new_bool(1); }
static json_value_t *make_false(void) { return json_new_bool(0); }
static json_value_t *make_null(void) { return json_new_null(); }

static json_value_t *parse_number(cursor_t *cur, char **error_out)
{
	char *end;
	double number = strtod(cur->p, &end);

	if (end == cur->p) {
		set_error(error_out, cur, "invalid number");
		return NULL;
	}

	cur->p = end;

	return json_new_number(number);
}

/* Decode one \uXXXX escape into a UTF-8 sequence appended to sb.
 * Only the basic multilingual plane is supported (no surrogate pairs),
 * which is enough for this demo. */
static int decode_unicode_escape(cursor_t *cur, strbuf_t *sb)
{
	unsigned int code = 0;
	int i;

	for (i = 0; i < 4; i++) {
		char c = *cur->p;
		int digit;

		if (c >= '0' && c <= '9')
			digit = c - '0';
		else if (c >= 'a' && c <= 'f')
			digit = c - 'a' + 10;
		else if (c >= 'A' && c <= 'F')
			digit = c - 'A' + 10;
		else
			return -1;

		code = code * 16 + (unsigned int)digit;
		cur->p++;
	}

	if (code < 0x80) {
		strbuf_putc(sb, (char)code);
	} else if (code < 0x800) {
		strbuf_putc(sb, (char)(0xC0 | (code >> 6)));
		strbuf_putc(sb, (char)(0x80 | (code & 0x3F)));
	} else {
		strbuf_putc(sb, (char)(0xE0 | (code >> 12)));
		strbuf_putc(sb, (char)(0x80 | ((code >> 6) & 0x3F)));
		strbuf_putc(sb, (char)(0x80 | (code & 0x3F)));
	}

	return 0;
}

/* Assumes *cur->p == '"'. Returns a freshly allocated C string. */
static char *parse_string_raw(cursor_t *cur, char **error_out)
{
	strbuf_t sb;

	strbuf_init(&sb);
	cur->p++;	/* consume opening quote */

	while (*cur->p != '"') {
		if (*cur->p == '\0') {
			set_error(error_out, cur, "unterminated string");
			free(sb.data);
			return NULL;
		}

		if (*cur->p == '\\') {
			cur->p++;
			switch (*cur->p) {
			case '"':  strbuf_putc(&sb, '"');  cur->p++; break;
			case '\\': strbuf_putc(&sb, '\\'); cur->p++; break;
			case '/':  strbuf_putc(&sb, '/');  cur->p++; break;
			case 'b':  strbuf_putc(&sb, '\b'); cur->p++; break;
			case 'f':  strbuf_putc(&sb, '\f'); cur->p++; break;
			case 'n':  strbuf_putc(&sb, '\n'); cur->p++; break;
			case 'r':  strbuf_putc(&sb, '\r'); cur->p++; break;
			case 't':  strbuf_putc(&sb, '\t'); cur->p++; break;
			case 'u':
				cur->p++;
				if (decode_unicode_escape(cur, &sb) != 0) {
					set_error(error_out, cur,
						  "invalid \\u escape");
					free(sb.data);
					return NULL;
				}
				break;
			default:
				set_error(error_out, cur, "invalid escape");
				free(sb.data);
				return NULL;
			}
		} else {
			strbuf_putc(&sb, *cur->p);
			cur->p++;
		}
	}

	cur->p++;	/* consume closing quote */

	return strbuf_finish(&sb);
}

static json_value_t *parse_string(cursor_t *cur, char **error_out)
{
	char *s = parse_string_raw(cur, error_out);

	if (s == NULL)
		return NULL;

	json_value_t *v = malloc(sizeof(*v));

	if (v == NULL) {
		free(s);
		return NULL;
	}

	v->type = JSON_STRING;
	v->as.string = s;

	return v;
}

static json_value_t *parse_array(cursor_t *cur, char **error_out)
{
	json_value_t *arr = json_new_array();

	cur->p++;	/* consume '[' */
	skip_ws(cur);

	if (*cur->p == ']') {
		cur->p++;
		return arr;
	}

	for (;;) {
		json_value_t *item;

		skip_ws(cur);
		item = parse_value(cur, error_out);
		if (item == NULL) {
			json_free(arr);
			return NULL;
		}

		json_array_append(arr, item);

		skip_ws(cur);
		if (*cur->p == ',') {
			cur->p++;
			continue;
		}

		if (*cur->p == ']') {
			cur->p++;
			break;
		}

		set_error(error_out, cur, "expected ',' or ']' in array");
		json_free(arr);
		return NULL;
	}

	return arr;
}

static json_value_t *parse_object(cursor_t *cur, char **error_out)
{
	json_value_t *obj = json_new_object();

	cur->p++;	/* consume '{' */
	skip_ws(cur);

	if (*cur->p == '}') {
		cur->p++;
		return obj;
	}

	for (;;) {
		char *key;
		json_value_t *value;

		skip_ws(cur);
		if (*cur->p != '"') {
			set_error(error_out, cur, "expected string key");
			json_free(obj);
			return NULL;
		}

		key = parse_string_raw(cur, error_out);
		if (key == NULL) {
			json_free(obj);
			return NULL;
		}

		skip_ws(cur);
		if (*cur->p != ':') {
			set_error(error_out, cur, "expected ':' after key");
			free(key);
			json_free(obj);
			return NULL;
		}
		cur->p++;

		skip_ws(cur);
		value = parse_value(cur, error_out);
		if (value == NULL) {
			free(key);
			json_free(obj);
			return NULL;
		}

		json_object_set(obj, key, value);
		free(key);	/* json_object_set() made its own copy */

		skip_ws(cur);
		if (*cur->p == ',') {
			cur->p++;
			continue;
		}

		if (*cur->p == '}') {
			cur->p++;
			break;
		}

		set_error(error_out, cur, "expected ',' or '}' in object");
		json_free(obj);
		return NULL;
	}

	return obj;
}

static json_value_t *parse_value(cursor_t *cur, char **error_out)
{
	skip_ws(cur);

	switch (*cur->p) {
	case '"':
		return parse_string(cur, error_out);
	case '{':
		return parse_object(cur, error_out);
	case '[':
		return parse_array(cur, error_out);
	case 't':
		return parse_literal(cur, "true", make_true, error_out);
	case 'f':
		return parse_literal(cur, "false", make_false, error_out);
	case 'n':
		return parse_literal(cur, "null", make_null, error_out);
	default:
		if (*cur->p == '-' || isdigit((unsigned char)*cur->p))
			return parse_number(cur, error_out);
		set_error(error_out, cur, "unexpected character");
		return NULL;
	}
}

json_value_t *json_parse(const char *text, char **error_out)
{
	cursor_t cur;
	json_value_t *value;

	if (error_out != NULL)
		*error_out = NULL;

	cur.p = text;
	cur.begin = text;

	value = parse_value(&cur, error_out);
	if (value == NULL)
		return NULL;

	skip_ws(&cur);
	if (*cur.p != '\0') {
		set_error(error_out, &cur, "trailing garbage after value");
		json_free(value);
		return NULL;
	}

	return value;
}

/* ---------------------------------------------------------------------- */
/* Printing / serialization                                               */
/* ---------------------------------------------------------------------- */

static void serialize_to(const json_value_t *value, strbuf_t *sb);

static void serialize_string(const char *s, strbuf_t *sb)
{
	strbuf_putc(sb, '"');
	for (; *s != '\0'; s++) {
		switch (*s) {
		case '"':  strbuf_putc(sb, '\\'); strbuf_putc(sb, '"');  break;
		case '\\': strbuf_putc(sb, '\\'); strbuf_putc(sb, '\\'); break;
		case '\n': strbuf_putc(sb, '\\'); strbuf_putc(sb, 'n');  break;
		case '\t': strbuf_putc(sb, '\\'); strbuf_putc(sb, 't');  break;
		default:   strbuf_putc(sb, *s);
		}
	}
	strbuf_putc(sb, '"');
}

static void strbuf_puts(strbuf_t *sb, const char *s)
{
	for (; *s != '\0'; s++)
		strbuf_putc(sb, *s);
}

static void serialize_to(const json_value_t *value, strbuf_t *sb)
{
	size_t i;
	char numbuf[32];

	switch (value->type) {
	case JSON_NULL:
		strbuf_puts(sb, "null");
		break;
	case JSON_BOOL:
		strbuf_puts(sb, value->as.boolean ? "true" : "false");
		break;
	case JSON_NUMBER:
		snprintf(numbuf, sizeof(numbuf), "%g", value->as.number);
		strbuf_puts(sb, numbuf);
		break;
	case JSON_STRING:
		serialize_string(value->as.string, sb);
		break;
	case JSON_ARRAY:
		strbuf_putc(sb, '[');
		for (i = 0; i < value->as.array.count; i++) {
			if (i > 0)
				strbuf_putc(sb, ',');
			serialize_to(value->as.array.items[i], sb);
		}
		strbuf_putc(sb, ']');
		break;
	case JSON_OBJECT:
		strbuf_putc(sb, '{');
		for (i = 0; i < value->as.object.count; i++) {
			if (i > 0)
				strbuf_putc(sb, ',');
			serialize_string(value->as.object.members[i].key, sb);
			strbuf_putc(sb, ':');
			serialize_to(value->as.object.members[i].value, sb);
		}
		strbuf_putc(sb, '}');
		break;
	}
}

char *json_serialize(const json_value_t *value)
{
	strbuf_t sb;

	strbuf_init(&sb);
	serialize_to(value, &sb);

	return strbuf_finish(&sb);
}

void json_print(const json_value_t *value)
{
	char *s = json_serialize(value);

	if (s != NULL) {
		printf("%s\n", s);
		free(s);
	}
}
