# Working with Memory

As previously stated, from a programmer's perspective, memory is abstracted into variables.
This hides most of the lower level abstractions.
Each variable is characterized by an address (or location in memory), type and access rights.
Some languages require that the developer spells out these attributes explicitly (**statically typed languages** - notable examples: C\C++, D, Java) whereas others deduce them by analyzing the context (**dynamically typed languages** - notable examples: Python, JavaScript).
Nevertheless, the language compiler needs to handle this information and, based on it, generate code that manages memory correctly and efficiently.
