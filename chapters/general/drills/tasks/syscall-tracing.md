# Syscall Tracing

## Scenario

We propose the development of a system call tracing and benchmarking tool, similar to strace.
This tool can attach to an application and capture the system calls made by that application - system call number, parameters, return value, along with information about the duration of the system call.
The tool will create a log with this information, which can later be used to profile the application (create graphs, identify the most frequent system calls, see potential bottlenecks, categorize system calls by received arguments, etc.).

Answer the following questions with "True" or "False" and justify your answer.
The justification should be simple, 2-3 sentences for each answer.

## Questions

1. The tool requires administrative privileges to run.

    - **Answer:**False
    - **Justification:** The tool requires tracing permissions for the application, which generally means that both should belong to the same user.

1. For performance reasons, it is advisable for the tool to store the log information in memory, rather than displaying it in real time on the standard output.

    - **Answer:**True
    - **Justification:** Displaying to the standard output is slow, uses the terminal, and the monitored application will have overhead caused by this.

1. The application's code needs to be modified to be monitored by the tool.

    - **Answer:**False
    - **Justification:** Tracing functionalities are provided by the operating system and are not specific to the application.

1. An application written in Python, an interpreted language, will not generate information that can be monitored by the tool.

    - **Answer:**False
    - **Justification:** Any application, in any language, executes system calls to access system resources.
    If not directly, then through the interpreter.

1. Two consecutive runs of the application will generate the same sequence of system calls, possibly with some timing differences.

    - **Answer:**False
    - **Justification:** This cannot be guaranteed.
    An application may consider certain external parameters (time, input, network) that affect which system calls it makes.

1. Generally, the application will consume more CPU time than the tracing tool.

    - **Answer:**True
    - **Justification:** The tool only captures and writes information to a log, which is minimal consumption.

1. Multiple instances of the tool process can run simultaneously to capture information from different applications.

    - **Answer:**True
    - **Justification:** There is no central point that enforces a single application run.
    The operating system provides the tracing facility used by each instance of the tool.

1. The results displayed by the tool will differ significantly when the application runs on a bare-metal operating system compared to a virtual machine operating system.

    - **Answer:**False
    - **Justification:** The operating system provides the same system call interface, and thus the information displayed will be similar for both types of runs.

1. The tool will capture page faults.

    - **Answer:**False
    - **Justification:** Page faults are not system calls and are not related to the information captured by the tool.

1. The tool cannot be used when the captured application communicates with another application.

    - **Answer:**False
    - **Justification:** The application makes system calls that will be captured, regardless of whether it communicates with another application or not.

1. The analyzed application can be statically or dynamically linked.

    - **Answer:**True
    - **Justification:** The application makes system calls, either directly or through a library, and the tool will capture this.
