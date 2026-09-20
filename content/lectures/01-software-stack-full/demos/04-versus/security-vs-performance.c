/*
 * Two hash functions over the same password, timed against each other.
 *
 * `simple_hash()` is djb2: one multiply-add per byte, a 64-bit result, and no
 * security claim of any kind.  `secure_hash()` is SHA-256, a cryptographic
 * hash: it costs far more per byte, and in exchange nobody can work backwards
 * from the digest to the password or find a second password with the same
 * digest.
 *
 * The point is not that one is better.  It is that the two sit at the ends of
 * the same trade-off, and that the right choice depends on what the digest is
 * for -- a hash table bucket index, or a stored credential.
 */

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <time.h>
#include <openssl/evp.h>

#define PASSWORD_LENGTH		12
#define ITERATIONS		1000000

/* djb2 produces a 64-bit value, which is 20 decimal digits plus the NUL. */
#define SIMPLE_HASH_STRING_LENGTH	21
#define SHA256_DIGEST_LENGTH		32
#define SECURE_HASH_STRING_LENGTH	(2 * SHA256_DIGEST_LENGTH + 1)

static void generate_password(char *password)
{
	static const char charset[] = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
	int i;

	for (i = 0; i < PASSWORD_LENGTH; i++)
		password[i] = charset[rand() % (sizeof(charset) - 1)];
	password[PASSWORD_LENGTH] = '\0';
}

/* A fast, non-cryptographic hash: good for a hash table, useless for secrets. */
static void simple_hash(const char *input, char *output)
{
	unsigned long hash = 5381;
	int c;

	while ((c = *input++) != '\0')
		hash = ((hash << 5) + hash) + c;

	snprintf(output, SIMPLE_HASH_STRING_LENGTH, "%lu", hash);
}

/* A cryptographic hash: far more work per byte, and far stronger guarantees. */
static void secure_hash(const char *input, char *output)
{
	unsigned char digest[SHA256_DIGEST_LENGTH];
	unsigned int len = 0;
	unsigned int i;

	if (EVP_Digest(input, strlen(input), digest, &len, EVP_sha256(), NULL) != 1) {
		fprintf(stderr, "EVP_Digest failed\n");
		exit(EXIT_FAILURE);
	}

	for (i = 0; i < len; i++)
		snprintf(output + 2 * i, 3, "%02x", digest[i]);
}

static double time_hashing(void (*hash)(const char *, char *),
			   const char *password, char *result)
{
	clock_t start, end;
	int i;

	start = clock();
	for (i = 0; i < ITERATIONS; i++)
		hash(password, result);
	end = clock();

	return (double)(end - start) / CLOCKS_PER_SEC;
}

int main(void)
{
	char password[PASSWORD_LENGTH + 1];
	char simple_result[SIMPLE_HASH_STRING_LENGTH];
	char secure_result[SECURE_HASH_STRING_LENGTH];
	double simple_time, secure_time;

	srand(time(NULL));
	generate_password(password);
	printf("Generated password: %s\n", password);

	simple_time = time_hashing(simple_hash, password, simple_result);
	secure_time = time_hashing(secure_hash, password, secure_result);

	printf("\n");
	printf("simple hash (djb2)  %10.6f s for %d iterations -> %s\n",
	       simple_time, ITERATIONS, simple_result);
	printf("secure hash (SHA-256) %8.6f s for %d iterations -> %s\n",
	       secure_time, ITERATIONS, secure_result);
	printf("\nSHA-256 costs %.1fx as much per hash.\n",
	       secure_time / simple_time);

	return 0;
}
