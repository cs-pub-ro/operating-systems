// SPDX-License-Identifier: BSD-3-Clause

#include <endian.h>
#include <string.h>
#include <unistd.h>

#include <iostream>
#include <fstream>
#include <memory>
#include <vector>

#include "../src/protocol/components.h"

#define INSTALL_PIPE_NAME ".pipes/hello_install_pipe"
#define INPUT_PIPE_NAME ".pipes/hello_pipe_in"
#define OUTPUT_PIPE_NAME ".pipes/hello_pipe_out"
#define ACCESS_PATH "/hello"
#define VERSION "v0.0.1"

auto main() -> int {
    auto handleInstallRequest = [&]() {
        std::ofstream reqPipe(".dispatcher/install_req_pipe", std::ios::binary);

        if (!reqPipe) {
            std::cerr << "Could not open request pipe" << std::endl;
            exit(1);
        }

        std::unique_ptr<InstallRequestHeader> request(new InstallRequestHeader);
        request->m_IpnLen = htobe16(strlen(INSTALL_PIPE_NAME));

        std::unique_ptr<char[]> reqBuf(
            new char[sizeof(InstallRequestHeader) + strlen(INSTALL_PIPE_NAME)]);

        memcpy(reqBuf.get(), request.get(), sizeof(InstallRequestHeader));
        memcpy(reqBuf.get() + sizeof(InstallRequestHeader), INSTALL_PIPE_NAME,
               strlen(INSTALL_PIPE_NAME));

        reqPipe.write(reqBuf.get(),
                      sizeof(InstallRequestHeader) + strlen(INSTALL_PIPE_NAME));

        reqPipe.close();
    };

    auto handleInstall = [&]() {
        std::ofstream installPipe(INSTALL_PIPE_NAME, std::ios::binary);

        if (!installPipe) {
            std::cerr << "Could not open install pipe" << std::endl;
            exit(1);
        }

        std::unique_ptr<char[]> installBuf(
            new char[sizeof(InstallHeader) + strlen(VERSION) +
                     strlen(INPUT_PIPE_NAME) + strlen(OUTPUT_PIPE_NAME) +
                     strlen(ACCESS_PATH)]);

        std::unique_ptr<InstallHeader> installHeader(new InstallHeader);

        installHeader->m_VersionLen = strlen(VERSION);
        installHeader->m_CpnLen = htobe16(strlen(INPUT_PIPE_NAME));
        installHeader->m_RpnLen = htobe16(strlen(OUTPUT_PIPE_NAME));
        installHeader->m_ApLen = htobe16(strlen(ACCESS_PATH));

        char *installBufPtr = installBuf.get();

        memcpy(installBufPtr, installHeader.get(), sizeof(InstallHeader));
        installBufPtr += sizeof(InstallHeader);

        memcpy(installBufPtr, VERSION, strlen(VERSION));
        installBufPtr += strlen(VERSION);

        memcpy(installBufPtr, INPUT_PIPE_NAME, strlen(INPUT_PIPE_NAME));
        installBufPtr += strlen(INPUT_PIPE_NAME);

        memcpy(installBufPtr, OUTPUT_PIPE_NAME, strlen(OUTPUT_PIPE_NAME));
        installBufPtr += strlen(OUTPUT_PIPE_NAME);

        memcpy(installBufPtr, ACCESS_PATH, strlen(ACCESS_PATH));

        installPipe.write(installBuf.get(),
                          sizeof(InstallHeader) + strlen(VERSION) +
                              strlen(INPUT_PIPE_NAME) +
                              strlen(OUTPUT_PIPE_NAME) + strlen(ACCESS_PATH));

        installPipe.close();
    };

    auto handleRequests = [&]() {
        std::ifstream callPipe(INPUT_PIPE_NAME, std::ios::binary);
        if (!callPipe) {
            std::cerr << "Could not open call pipe" << std::endl;
            exit(1);
        }

        std::ofstream returnPipe(OUTPUT_PIPE_NAME, std::ios::binary);
        if (!returnPipe) {
            std::cerr << "Could not open return pipe" << std::endl;
            exit(1);
        }

        while (true) {
            std::unique_ptr<CallingHeader> callHeader(new CallingHeader);

            callPipe.read((char *)callHeader.get(), sizeof(CallingHeader));

            std::unique_ptr<char[]> callBuf(
                new char[callHeader->m_FnLen + 4 * callHeader->m_ArgsCnt +
                         be32toh(callHeader->m_ArgumentsLen)]);

            callPipe.read(callBuf.get(),
                          callHeader->m_FnLen + 4 * callHeader->m_ArgsCnt +
                              be32toh(callHeader->m_ArgumentsLen));
            std::string fnName(callBuf.get(), callHeader->m_FnLen);

            std::unique_ptr<uint32_t[]> argSizes(
                new uint32_t[callHeader->m_ArgsCnt]);
            memcpy(argSizes.get(), callBuf.get() + callHeader->m_FnLen,
                   4 * callHeader->m_ArgsCnt);

            uint32_t argsOff = 0;
            std::vector<std::string> args;
            args.reserve(callHeader->m_ArgsCnt);
            for (uint32_t i = 0; i < callHeader->m_ArgsCnt; ++i) {
                std::string arg(callBuf.get() + callHeader->m_FnLen +
                                    4 * callHeader->m_ArgsCnt + argsOff,
                                be32toh(argSizes[i]));

                args.push_back(arg);
                argsOff += be32toh(argSizes[i]);
            }

            std::unique_ptr<CallingHeader> returnHeader(new CallingHeader);

            std::string response =
                std::string("Hello from ") + fnName + std::string("(");

            for (uint32_t i = 0; i < callHeader->m_ArgsCnt; ++i) {
                response += args[i];

                if (i + 1 < args.size())
                    response += ", ";
            }

            response += std::string(")");

            returnHeader->m_FnLen = callHeader->m_FnLen;
            returnHeader->m_ArgsCnt = 1;
            returnHeader->m_ArgumentsLen = htobe32(response.length());
            memcpy(returnHeader->m_Token, callHeader->m_Token, 32);

            std::unique_ptr<char[]> returnBuf(
                new char[sizeof(CallingHeader) + returnHeader->m_FnLen +
                         4 * returnHeader->m_ArgsCnt + response.length()]);

            memcpy(returnBuf.get(), returnHeader.get(), sizeof(CallingHeader));
            memcpy(returnBuf.get() + sizeof(CallingHeader), fnName.data(),
                   fnName.length());

            uint32_t responseSize = htobe32(response.length());
            memcpy(returnBuf.get() + sizeof(CallingHeader) + fnName.length(),
                   &responseSize, 4);

            memcpy(returnBuf.get() + sizeof(CallingHeader) + fnName.length() +
                       4,
                   response.data(), response.length());

            returnPipe.write(returnBuf.get(), sizeof(CallingHeader) +
                                                  fnName.length() + 4 +
                                                  response.length());

            returnPipe.flush();
        }

        callPipe.close();
        returnPipe.close();
    };

    handleInstallRequest();
    sleep(1);
    handleInstall();
    sleep(1);
    handleRequests();
}
