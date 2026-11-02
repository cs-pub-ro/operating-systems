# Demo: Threads

| Demo | What it shows |
| --- | --- |
| [`ip-sp/`](ip-sp) | Threads in the same function share an instruction pointer; every thread has its own stack pointer. |
| [`new-stack-area/`](new-stack-area) | Each new thread adds its own ~8 MB stack zone to the shared address space. |
