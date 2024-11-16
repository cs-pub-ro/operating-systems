# D-Bus - Battery level

Navigate to `chapters/app-interact/dbus/drills/tasks/dbus/support`.
Use D-Bus to find out the computer's battery level.
There is the `org.freedesktop.UPower` interface on the system bus that can provide this information.
<!-- markdownlint-disable MD101 -->
The method you need to call is `org.freedesktop.DBus.Properties.Get` from the `/org/freedesktop/UPower/devices/DisplayDevice` object.
<!-- markdownlint-enable MD101 -->

This method needs 2 arguments: an interface name and a property name.
<!-- markdownlint-disable MD101 -->
Those should be `org.freedesktop.UPower.Device` and `Percentage` respectively.
<!-- markdownlint-enable MD101 -->

Then input all of the above into a `gdbus` call, which, if everything is correct, should output the battery percentage level as a number between 0 and 100.

Note: if you are running on a desktop computer or inside a virtual machine, you will get the value `0.0`, because those systems don't have a battery.

If you're having difficulties solving this exercise, go through [this](../../../reading/dbus.md) reading material.
