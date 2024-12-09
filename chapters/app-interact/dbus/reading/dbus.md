# D-Bus

D-Bus is an Inter-Process Communication (IPC) mechanism that is commonly present on Linux.
It is particularly used by various components of the desktop environment (like GNOME) to communicate between one another, although the system itself is general-purpose and can be used in any other situations.

As the name suggests, the communication model is that of a bus: processes connect to the bus, then exchange messages with other processes through the bus.
The bus itself is implemented by the dbus-daemon, and there are in fact multiple buses: one system bus, accessible system-wide, and one or more session buses, each one corresponding to one user login session.

Every process that connects to D-Bus receives a unique connection name.
This name can be something human-readable, like `org.freedesktop.Notifications`, or some generated ID, like `:1.63`.
Once a process is connected, it can expose one or multiple `objects`.
An object has a path-like name, consisting of strings separated by a slash character (for example, `/org/freedesktop/Notifications`).
Each object contains one or more `interfaces`, which have the methods that can be called on that object.
