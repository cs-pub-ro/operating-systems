# Stack Protector

Comment the `-fno-stack-protector` switch from the `chapters/data/memory-security/drills/tasks/stack-protector/support/Makefile`, recompile and run the `bo_practice_write` executable.
Examine the binary with `objdump` and identify the instructions that set and test the canary.
Observe what happens when a buffer overflow occurs.

If you're having difficulties solving this exercise, go through [this](../../../reading/memory-security.md) reading material.
