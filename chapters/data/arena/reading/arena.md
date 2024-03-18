# Arena

Go through the practice items to hone your skills in working with data and memory.


## Memory Support

**Manual memory management** (MMM) is one of the most difficult tasks.
Even experienced programmers make mistakes when tackling such a complicated endeavor.
As a consequence, the programming world has been migrating towards languages that offer automatic memory management (AMM).
AMM programming languages typically offer a garbage collector that tracks down the usage of objects and frees memory once no references exist to a given object.
As a consequence, garbage collected programming languages are easier to use and safer.
However, this comes with a cost: the garbage collector, in most cases, requires a significant amount of resources to run.
Therefore, for performance-critical systems, MMM is still the preferred solution.

A middle-ground between programming languages that have AMM (Java, Python, Swift, D) and those that do not (C, C++) is represented by those languages that do not have built-in AMM but offer the possibility to implement it as a library solution (C++, D).
Concretely, these languages offer lightweight library solutions to optimally track down the lifetime of an object.
This is done by using reference counted objects.

### Reference Counting

Reference counting is a technique of tracking the lifetime of an object by counting how many references to an object exist.
As long as at least one reference exists, the object cannot be destroyed.
Once no reference to a given object exists, it can be safely destroyed.
Reference counted is typically implemented by storing a count with the actual payload of the object.
Every time a new reference to the object is created, the reference count is incremented.
Every time a reference expires, the reference is decremented.

The operations that trigger a reference increment are:

- initializing an object from another object.
- assigning an object to another object.

The operations that trigger a reference decrement are:

- the lifetime of an object expires

Modern programming languages offer the possibility to specify what code should be run in each of these situations, therefore enabling the implementation of referenced counted data structures.
As such, copy constructors may be used to automatically initialize an object from another object, assignment operators may be used to assign an object to another object and destructors may be used to destroy objects.
