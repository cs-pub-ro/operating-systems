/* SPDX-License-Identifier: BSD-3-Clause */

#ifndef COMPONENTS_H
#define COMPONENTS_H

#include <stdint.h>

#define VERSION_LENGTH 8
#define INSTALL_PIPE_NAME_LENGTH 128
#define CONNECT_PIPE_NAME_LENGTH INSTALL_PIPE_NAME_LENGTH
#define ACCESS_PATH_LENGTH 256
#define COMM_PIPE_NAME_LENGTH (INSTALL_PIPE_NAME_LENGTH << 1)
#define PARAMETERS_NUMBER 6
#define FUNCTION_NAME_LENGTH 32
#define ARG_LENGTH 840
#define ARGUMENTS_NUMBER 8 // 840 * 8 -> up to eight arguments with 840 being the LCM(1, 2, 3, 4, 5, 6, 7, 8)
#define CALL_TOKEN_LEN 32

#ifndef __packed
// !!! A define needs to be added here
#endif

#define PACKED __packed

/**
 * Install request
 *
 * Header
 * Install pipe name length (2 bytes)
 *
 * Contents
 * Install pipe name
 */
struct InstallRequestHeader {
	uint16_t m_IpnLen; /* The maximum length of the install pipe name */
} PACKED;

/**
 * Connect request
 *
 * Header
 * Response pipe length (4 bytes) | Access path length (4 bytes)
 *
 * Contents
 * Connect pipe name | Access path
 */
struct ConnectionRequestHeader {
	uint32_t m_RpnLen; /* The maximum length of the response pipe name */
	uint32_t m_ApLen; /* The maximum length of the access path */
} PACKED;

struct ParameterInfo {
	char m_Type;
	uint64_t m_Length;
} PACKED;

struct ArgumentInfo {
	char m_Data[ARG_LENGTH];
} PACKED;

struct ResponseInfo {
	char m_Data[ARG_LENGTH];
} PACKED;

/**
 * Install packet
 *
 * Header
 * \t Version length (1 byte)
 * \t Number of parameters (1 byte) - Not used in current version of the protocol
 * \t Call pipe name length (2 bytes)
 * \t Return pipe name length (2 bytes)
 * \t Access path length (2 bytes)
 *
 * Contents
 * \t Version (max 255 bytes)
 * \t Call pipe name (max 65_535 bytes)
 * \t Return pipe name (max 65_535 bytes)
 * \t Access path (max 65_535 bytes)
 * \t Parameters definition (max 255 * sizeof(ParameterInfo) bytes) - Not used in current version of the protocol
 */
struct InstallHeader {
	uint8_t m_VersionLen; /* The maximum length of the version */
	// uint8_t m_ParamDefLen; /* The maximum number of parameters definitions. */
	uint16_t m_CpnLen; /* The maximum length of the call pipe name */
	uint16_t m_RpnLen; /* The maximum length of the return pipe name */
	uint16_t m_ApLen; /* The maximum length of the access path */
} PACKED;

/**
 * Connect packet
 *
 * Header
 * \t Version length (1 byte)
 * \t Call pipe name length (4 bytes)
 * \t Return pipe name length (4 bytes)
 *
 * Contents
 * \t Version (max 255 bytes)
 * \t Call pipe name (max 4_294_967_295 bytes)
 * \t Return pipe name (max 4_294_967_295 bytes)
 */
struct ConnectHeader {
	uint8_t m_VersionLen; /* The maximum length of the version */
	uint32_t m_CpnLen; /* The maximum length of the call pipe name */
	uint32_t m_RpnLen; /* The maximum length of the return pipe name */
} PACKED;

/**
 * Calling / Returning packet - used for both calling a function and returning a result
 *
 * Header
 * \t Function name length (1 byte)
 * \t Number of arguments (1 byte)
 * \t Arguments length (4 bytes)
 *
 * Contents
 * \t Function name (max 255 bytes)
 * \t Arguments sizes (4 * nr_of_arguments bytes)
 * \t Arguments information (255 * sizeof(ArgumentInfo))
 */
struct CallingHeader {
	uint8_t m_FnLen; /* The maximum length of the function name */
	uint8_t m_ArgsCnt; /* The maximum number of arguments / returned variables for the function */
	uint32_t m_ArgumentsLen; /* The maximum length of all the arguments in bytes */
	char m_Token[CALL_TOKEN_LEN]; /* Token used for matching caller and response */
} PACKED;

#endif //COMPONENTS_H
