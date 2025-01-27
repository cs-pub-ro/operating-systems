# Testing System

A testing system allows building an application that can run on different architectures and platforms (operating systems).
For real testing, the application must run on a system with the appropriate architecture and platform.
The testing system provides configurations that enable local builds followed by deployment of the resulting application (and necessary files - build artifacts) to a dedicated system for testing.
The test result is returned to the local (build) system.

Answer the following questions with "True" or "False" and justify your answer.
Justifications should be simple, 2-3 sentences for each response.

1. The application cannot be compiled on another architecture or platform, it must be compiled on the running system, not locally.
    - **Answer:** False
    - **Justification:** Cross-compiling suites, along with build systems or containers, can be used to create a build environment for testing on another platform or architecture.

1. Testing systems can be virtual machines.
    - **Answer:** True
    - **Justification:** Yes, the application can be tested on a virtual machine.
    While there may be performance penalties, it is possible to test effectively on virtual machines.

1. The testing system will be significantly more performant if written in a compiled language (C, Go, Rust) compared to an interpreted one (Python, JavaScript, Ruby).
    - **Answer:** False
    - **Justification:** The testing system invokes the application (via fork-exec).
    The choice of a compiled or interpreted language does not significantly impact this process.

1. The testing system must run with privileged permissions.
    - **Answer:** False
    - **Justification:** The system performs operations such as compiling, running, and copying files over the network, all of which can be executed by non-privileged users.

1. The build process in the testing system is CPU-intensive.
    - **Answer:** True
    - **Justification:** The build process involves compiling, linking, and other operations that are CPU-intensive.

1. The testing system's runtime process can be CPU-intensive or I/O-intensive depending on the application's nature.
    - **Answer:** True
    - **Justification:** The nature of the application dictates whether the testing system's runtime process will be CPU-intensive or I/O-intensive.

1. The testing system would benefit from a multi-threaded implementation.
    - **Answer:** False
    - **Justification:** The testing system launches other processes (build, application).
    A multi-threaded implementation would not significantly alter the overall behavior or efficiency.

1. The local (build) system and testing systems can communicate using a network file system.
    - **Answer:** True
    - **Justification:** Yes, and it is recommended for efficient and easy transfer of build artifacts and test results.

1. Testing systems can be used by multiple local (build) systems.
    - **Answer:** True
    - **Justification:** This is both possible and recommended to save resources, especially since testing systems may remain idle part of the time.

1. Testing the application runtime is facilitated if the application is compiled into a static executable.
    - **Answer:** True
    - **Justification:** A statically compiled application does not require dependent libraries, making it easier to test by simply copying and running the executable.

1. Applications built for a different architecture can be tested locally in a container without significant performance penalties.
    - **Answer:** False
    - **Justification:** Running an application built for another architecture locally requires an emulator, whether in a container or not.
    Emulators are typically slow, leading to significant performance penalties.
