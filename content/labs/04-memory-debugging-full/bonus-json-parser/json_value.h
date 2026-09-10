/*
 * json_value.h -- a small in-memory JSON tree: parser, serializer, printer.
 *
 * A json_value_t is a tagged union representing one JSON value: null, a
 * bool, a number, a string, an array of json_value_t*, or an object
 * (an ordered list of key/value members).
 *
 * Ownership rule used throughout this library: a container (array or
 * object) OWNS every child value stored in it. Freeing the container
 * recursively frees every child. Once you have added a value to an array or
 * an object, do not free it yourself and do not add the same value to a
 * second container.
 */
#ifndef JSON_VALUE_H
#define JSON_VALUE_H

#include <stddef.h>

typedef enum {
	JSON_NULL,
	JSON_BOOL,
	JSON_NUMBER,
	JSON_STRING,
	JSON_ARRAY,
	JSON_OBJECT,
} json_type_t;

typedef struct json_value json_value_t;

/* One key/value pair inside a JSON object. */
typedef struct {
	char *key;		/* heap copy of the member name */
	json_value_t *value;	/* owned by this member */
} json_member_t;

struct json_value {
	json_type_t type;
	union {
		int boolean;			/* JSON_BOOL   */
		double number;			/* JSON_NUMBER */
		char *string;			/* JSON_STRING: heap copy */
		struct {			/* JSON_ARRAY  */
			json_value_t **items;
			size_t count;
			size_t capacity;
		} array;
		struct {			/* JSON_OBJECT */
			json_member_t *members;
			size_t count;
			size_t capacity;
		} object;
	} as;
};

/*
 * Parse a NUL-terminated JSON document.
 *
 * On success, returns a newly allocated json_value_t tree (release it with
 * json_free()) and, if error_out is non-NULL, sets *error_out to NULL.
 *
 * On failure, returns NULL and, if error_out is non-NULL, sets *error_out to
 * a newly allocated (caller must free()) description of what went wrong.
 */
json_value_t *json_parse(const char *text, char **error_out);

/* Recursively free a value and, if it is a container, every child in it. */
void json_free(json_value_t *value);

/* Pretty-print a value to stdout, indented, followed by a newline. */
void json_print(const json_value_t *value);

/*
 * Serialize a value to a single-line, heap-allocated string. The caller
 * must free() the returned pointer.
 */
char *json_serialize(const json_value_t *value);

/* Convenience constructors, mostly useful for tests. Each takes ownership
 * of any json_value_t* / string arguments it is handed, per the rule above.
 */
json_value_t *json_new_null(void);
json_value_t *json_new_bool(int boolean);
json_value_t *json_new_number(double number);
json_value_t *json_new_string(const char *str);
json_value_t *json_new_array(void);
json_value_t *json_new_object(void);

/* Append to an array (array takes ownership of item). */
void json_array_append(json_value_t *array, json_value_t *item);

/* Add/replace a member in an object (object takes ownership of value and
 * copies key itself). */
void json_object_set(json_value_t *object, const char *key,
		      json_value_t *value);

#endif /* JSON_VALUE_H */
