# Bypassing the Stack Protector

Inspect the `chapters/data/memory-security/drills/tasks/bypassing-stack-protector/support/stack_protector.c` source file.
Compile the program and examine the object code.
Try to identify the canary value.
Using the `addr` variable, write 2 `scanf` instructions: one that overwrites the canary with the correct value and one that overwrites the return address with the address of function `pawned`.
In case of a successful exploit a video will be offered as reward.

If you're having difficulties solving this exercise, go through [this](../../../reading/memory-security.md) reading material.
