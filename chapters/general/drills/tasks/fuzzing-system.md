# Fuzzing Systems for Embedded Applications

A fuzzer/fuzzing system generates semi-random inputs to send to a target application to discover bugs—inputs that lead to crashes.
We propose building a fuzzing system for binary applications on embedded systems with specific architectures (e.g., ARM/MIPS).
The fuzzing system runs on an x86 system and uses an emulator to run the application.
The fuzzer sends inputs to the application through the emulator and extracts introspection information useful for fuzzing.

Answer the following questions with "True" or "False" and justify your answer.
Justifications should be simple, 2-3 sentences for each response.

1. The fuzzing system is an application that must run with privileged permissions.
    - **Answer:** False
    - **Justification:** The fuzzing system starts the emulator and sends inputs without performing privileged actions.

1. The fuzzing system can run inside a virtual machine.
    - **Answer:** True
    - **Justification:** Since the system uses an emulator, nothing prevents it from running inside a virtual machine.

1. The performance of the fuzzing system (number of inputs sent per second) is comparable to that of a fuzzing system for native applications (running natively on the local x86 system).
    - **Answer:** False
    - **Justification:** Emulating instructions introduces significant overhead compared to running natively.

1. During the execution of the embedded application in the emulator, no system calls are made on the local system.
    - **Answer:** False
    - **Justification:** The emulator performs system calls for tasks such as memory allocation or synchronization.

1. The emulated application must be an ELF (Executable and Linking Format) file, specific to Linux.
    - **Answer:** False
    - **Justification:** The executable format depends on the emulator and can be ELF, PE, COFF, or raw.

1. We can run only one instance of the fuzzing system because we can run only one instance of the emulator.
    - **Answer:** False
    - **Justification:** Multiple emulator instances can run simultaneously, limited only by available resources.

1. The application source code is required to run the application on the emulator.
    - **Answer:** False
    - **Justification:** The emulator runs machine code, so only the binary application is needed, while the source code is optional.

1. The emulator appears as a process in the local system.
    - **Answer:** True
    - **Justification:** Applications run as processes, and the emulator on the local system functions as a process.

1. Using the emulator, the fuzzing system can have direct access to the memory of the running application.
    - **Answer:** True
    - **Justification:** The emulator emulates memory and the processor, allowing direct memory access.

1. If the system is x86 on 32-bit, the emulated application architecture cannot be 64-bit.
    - **Answer:** False
    - **Justification:** Emulation allows any architecture to be simulated, depending on the emulator's capabilities.

1. A crash in the emulated application can lead to a crash of the fuzzing system.
    - **Answer:** False
    - **Justification:** The application crashes inside the emulator, which should not affect the local system if implemented properly.
