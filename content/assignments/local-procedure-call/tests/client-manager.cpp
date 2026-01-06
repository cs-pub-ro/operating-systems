// SPDX-License-Identifier: BSD-3-Clause

#include <endian.h>
#include <string.h>
#include <unistd.h>

#include <iostream>
#include <fstream>
#include <memory>
#include <string>
// NOLINTNEXTLINE(build/c++11)
#include <mutex>
// NOLINTNEXTLINE(build/c++11)
#include <thread>
#include <vector>

#include "../src/protocol/components.h"

#define CONNECT_PIPE_NAME ".pipes/connect_pipe"
#define ACCESS_PATH "/hello"

static std::mutex printMutex;

auto main(int argc, char *argv[]) -> int {
    auto handleConnectRequest = [&](int32_t clientIdx) {
        std::ofstream reqPipe(".dispatcher/connection_req_pipe", std::ios::binary);

        if (!reqPipe) {
            std::cerr << "Could not open request pipe" << std::endl;
            exit(1);
        }

        std::unique_ptr<ConnectionRequestHeader> request(
            new ConnectionRequestHeader);

        std::string connectPipeName =
            std::string(CONNECT_PIPE_NAME) + std::to_string(clientIdx);

        request->m_RpnLen = htobe32(connectPipeName.length());
        request->m_ApLen = htobe32(strlen(ACCESS_PATH));

        std::unique_ptr<char[]> reqBuf(
            new char[sizeof(ConnectionRequestHeader) +
                     connectPipeName.length() + strlen(ACCESS_PATH)]);

        memcpy(reqBuf.get(), request.get(), sizeof(ConnectionRequestHeader));
        memcpy(reqBuf.get() + sizeof(ConnectionRequestHeader),
               connectPipeName.data(), connectPipeName.length());
        memcpy(reqBuf.get() + sizeof(ConnectionRequestHeader) +
                   connectPipeName.length(),
               ACCESS_PATH, strlen(ACCESS_PATH));

        reqPipe.write(reqBuf.get(), sizeof(ConnectionRequestHeader) +
                                        connectPipeName.length() +
                                        strlen(ACCESS_PATH));

        reqPipe.close();
    };

    auto handleConnect = [&](int32_t clientIdx,
                             std::shared_ptr<std::string> &callPipeName,
                             std::shared_ptr<std::string> &returnPipeName) {
        std::string connectPipeName =
            std::string(CONNECT_PIPE_NAME) + std::to_string(clientIdx);

        std::ifstream connectPipe(connectPipeName, std::ios::binary);
        if (!connectPipe) {
            std::cerr << "Could not open connect response pipe" << std::endl;
            exit(1);
        }

        std::unique_ptr<ConnectHeader> connectHeader(new ConnectHeader);

        if (!connectPipe.read((char *)connectHeader.get(),
                              sizeof(ConnectHeader))) {
            std::cerr << "Could not read connect header" << std::endl;
            exit(1);
        }

        connectHeader->m_CpnLen = be32toh(connectHeader->m_CpnLen);
        connectHeader->m_RpnLen = be32toh(connectHeader->m_RpnLen);

        std::unique_ptr<char[]> connectBuf(
            new char[connectHeader->m_VersionLen + connectHeader->m_CpnLen +
                     connectHeader->m_RpnLen]);

        if (!connectPipe.read(connectBuf.get(), connectHeader->m_VersionLen +
                                                    connectHeader->m_CpnLen +
                                                    connectHeader->m_RpnLen)) {
            std::cerr << "Could not read connect contents" << std::endl;
            exit(1);
        }

        *callPipeName =
            std::string(connectBuf.get() + connectHeader->m_VersionLen,
                        connectHeader->m_CpnLen);
        *returnPipeName =
            std::string(connectBuf.get() + connectHeader->m_VersionLen +
                            connectHeader->m_CpnLen,
                        connectHeader->m_RpnLen);

        connectPipe.close();
    };

    auto handleCall = [&](int32_t clientIdx, int32_t clientsNumber,
                          std::shared_ptr<std::string> &callPipeName,
                          std::shared_ptr<std::string> &returnPipeName) {
        std::ofstream callPipe(*callPipeName, std::ios::binary);
        if (!callPipe) {
            std::cerr << "Could not open call pipe" << std::endl;
            exit(1);
        }

        std::ifstream returnPipe(*returnPipeName, std::ios::binary);
        if (!returnPipe) {
            std::cerr << "Could not open return pipe" << std::endl;
            exit(1);
        }

        std::unique_ptr<CallingHeader> callHeader(new CallingHeader);

        std::string arg1("arg1");
        std::string arg2("arg2");

        static const uint8_t ARGS_CNT =
            clientsNumber < 10
                ? 0
                : (clientsNumber < 200 ? 1 : (clientsNumber < 400 ? 2 : 0));
        static const uint32_t ARGS_LEN = arg1.length() + arg2.length();

        std::string fnName("func");

        callHeader->m_FnLen = fnName.length();
        callHeader->m_ArgsCnt = ARGS_CNT;
        callHeader->m_ArgumentsLen = htobe32(ARGS_LEN);

        std::unique_ptr<char[]> callBuf(
            new char[sizeof(CallingHeader) + fnName.length() +
                     4 * callHeader->m_ArgsCnt + ARGS_LEN]);

        memcpy(callBuf.get(), callHeader.get(), sizeof(CallingHeader));
        memcpy(callBuf.get() + sizeof(CallingHeader), fnName.data(),
               fnName.length());

        // Calling a function with 0 arguments: func()
        // There is no other information that needs to be added to the
        // buffer

        // Call a function with 1 argument: func("arg1")
        for (uint32_t i = 0; i < ARGS_CNT; ++i) {
            uint32_t argSize = htobe32(arg1.length());
            memcpy(callBuf.get() + sizeof(CallingHeader) + fnName.length() +
                       4 * i,
                   &argSize, 4);
        }

        if (ARGS_CNT >= 1) {
            memcpy(callBuf.get() + sizeof(CallingHeader) + fnName.length() +
                       4 * ARGS_CNT,
                   arg1.data(), arg1.length());
        }

        if (ARGS_CNT >= 2) {
            memcpy(callBuf.get() + sizeof(CallingHeader) + fnName.length() +
                       4 * ARGS_CNT + arg1.length(),
                   arg2.data(), arg2.length());
        }

        // Call a function with 2 arguments: func("arg1", "arg2")

        callPipe.write(callBuf.get(), sizeof(CallingHeader) + fnName.length() +
                                          4 * ARGS_CNT + ARGS_LEN);

        callPipe.close();

        // Receive return value
        std::unique_ptr<CallingHeader> returnHeader(new CallingHeader);

        returnPipe.read((char *)returnHeader.get(), sizeof(CallingHeader));

        std::unique_ptr<char[]> returnBuf(
            new char[returnHeader->m_FnLen + 4 * returnHeader->m_ArgsCnt +
                     be32toh(returnHeader->m_ArgumentsLen)]);

        returnPipe.read(returnBuf.get(),
                        returnHeader->m_FnLen + 4 * returnHeader->m_ArgsCnt +
                            be32toh(returnHeader->m_ArgumentsLen));

        returnPipe.close();

        std::string returnFnName(returnBuf.get(), returnHeader->m_FnLen);

        uint32_t argLen;
        memcpy(&argLen, returnBuf.get() + returnHeader->m_FnLen, 4);

        argLen = be32toh(argLen);

        std::string response(returnBuf.get() + returnHeader->m_FnLen + 4,
                             argLen);

        {
            std::lock_guard<std::mutex> lock(printMutex);
            std::cout << response << std::endl;
        }
    };

    int32_t clientsNumber = 1;
    if (argc > 1) {
        clientsNumber = atoi(argv[1]);
    }

    std::vector<std::shared_ptr<std::thread>> clientThreads;
    clientThreads.reserve(clientsNumber);

    for (int32_t clientIdx = 0; clientIdx < clientsNumber; ++clientIdx) {
        auto handleClient = [&](int32_t clientIdx) {
            std::shared_ptr<std::string> callPipeName =
                std::make_shared<std::string>();
            std::shared_ptr<std::string> returnPipeName =
                std::make_shared<std::string>();

            handleConnectRequest(clientIdx);
            sleep(1);
            handleConnect(clientIdx, callPipeName, returnPipeName);
            sleep(1);
            handleCall(clientIdx, clientsNumber, callPipeName, returnPipeName);
        };

        std::shared_ptr<std::thread> client(
            new std::thread(handleClient, clientIdx));
        clientThreads.push_back(client);
    }

    for (auto clientThread : clientThreads) {
        clientThread->join();
    }
}
