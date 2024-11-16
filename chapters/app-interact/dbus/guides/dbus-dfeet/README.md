# D-Bus Inspection with D-Feet

In order to better understand these concepts, we'll use a graphical tool (`D-Feet`) to inspect all the available D-Bus objects on our system.

Run D-Feet and select `Session Bus` from the top button:

![dfeet-session-bus](../media/dfeet_session_bus.png)

On the left panel, we can see all the processes connected to D-Bus with their associated `connection names`.
Scroll down and find `org.freedesktop.Notifications`.
On the right side, expand `/org/freedesktop/Notifications` and then expand the `org.freedesktop.Notifications` interface.
The window should look like this:

![dfeet-notifications](../media/dfeet_notifications.png)

Some observations:

- The bus communication happens over a Unix socket, with the path `/run/user/1000/bus`.

- `org.freedesktop.Notifications` on the left panel is the `connection name`.

- The process that has connected with this name is `/usr/bin/gjs /usr/share/gnome-shell/org.gnome.Shell.Notifications` and has the pid of `4373`.

- This process exposes one object: `/org/freedesktop/Notifications`.
Note that the object name is the same as the connection name, where the dots have been replaced with slashes.
This is not a requirement, as the objects exposed by a process can have any name.

<!-- markdownlint-disable MD101 -->
- The object has 4 interfaces: `org.freedesktop.DBus.Introspectable`, `org.freedesktop.DBus.Peer`, `org.freedesktop.DBus.Properties` and `org.freedesktop.Notifications`.
Note that the last one (`org.freedesktop.Notifications`) is the same as the connection name, but this again is just a coincidence, not a requirement.
<!-- markdownlint-enable MD101 -->

- The interface `org.freedesktop.Notifications` has some methods that can be called, such as `Notify`.
