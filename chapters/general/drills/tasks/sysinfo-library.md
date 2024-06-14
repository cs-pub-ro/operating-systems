# Sysinfo Library

## Scenario

We propose the implementation of a library called `sysinfo`, which will provide information about the hardware and software of the system where it is used.
This information is useful for the proper configuration of an application or for inventorying systems within a network.
The library is portable.
Examples of information include: processor type, number of cores, frequency, memory capacity, operating system, distribution version, compiler version(s), standard C library version, virtualization support.

Answer the following questions with "True" or "False" and justify your answer.
The justification should be simple, 2-3 sentences for each answer.

## Questions

1. The information can be fully collected using the library on another system without the inspected system being turned on.

    - **Answer:** False
    - **Justification:** The system needs to be on to obtain information such as the compiler version or kernel version or the distribution used.
    Theoretically, the disk can be mounted without starting the system, but there are still details about the processor or others that need to be obtained either beforehand or "live."

1. The library can be used to investigate a virtualized system.

    - **Answer:** True
    - **Justification:** The information provided is specific to any system.
    Even hardware information is provided by the hypervisor, which is responsible for ensuring information as similar as possible to a real system.

1. The library can be used by programs written in compiled languages (such as C) and programs written in interpreted languages (such as JavaScript/Node or Python).

    - **Answer:** True
    - **Justification:** Each language can create a binding to the respective library, and then programs written in that language can use it.

1. The functions exposed by the library are CPU-intensive.

    - **Answer:** False
    - **Justification:** Generally, the information is obtained by investigating the file system or hardware, with the support of the operating system.
    These operations are simple, not CPU-intensive.

1. The library can be used simultaneously by two or more distinct applications.

    - **Answer:** True
    - **Justification:** The operations performed by the library are reading information or configurations from the system.
    There is no blockage in performing these read operations simultaneously.

1. Using the functions exposed by the library will generate system calls.

    - **Answer:** True
    - **Justification:** Most information requires interaction with the file system or hardware.
    These operations perform system calls.

1. To ensure the portability of the library on different operating systems (Linux, Windows, macOS), the application using the library must be run in a container.

    - **Answer:** False
    - **Justification:** The library must be portable, meaning it should provide mechanisms for informing about the system used through the exposed interface.
    These mechanisms should be implemented and present regardless of running in a container.
    A container offers application isolation and easy deployment by managing dependencies, but it does not help portability.

1. Applications using the library will only be able to run on x86 processor architectures.

    - **Answer:** False
    - **Justification:** The information provided by the library is either generic or universally available on each type of architecture.
    It is irrelevant whether the system running the application uses an x86, ARM, or MIPS architecture.

1. The operating system on which the library runs must provide shared memory mechanisms to deliver the obtained information.

    - **Answer:** False
    - **Justification:** There is no requirement for the application to use shared memory mechanisms.
    The obtained information can be collected in an application's memory area and used from there.

1. If software packages or applications are not installed/uninstalled, then on consecutive runs, the library will provide the same information.

    - **Answer:** True
    - **Justification:** The information does not change in the system on consecutive runs:
    the same hardware, the same functionalities, the same applications with the same versions.
    Here it can be argued that it might investigate the number of processes or occupied disk space.
    Points are also awarded if argued this way and the answer is "False".

1. The library can be provided as both a dynamically linked library and a statically linked library.

    - **Answer:** True
    - **Justification:** The functionalities provided by the library do not depend on its linking mode.
    The linking modes allow a broader range of applications to can use it, so providing it in both ways is advantageous.
