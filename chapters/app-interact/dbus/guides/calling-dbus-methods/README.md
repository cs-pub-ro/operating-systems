# Calling D-Bus Methods

The application behind `org.freedesktop.Notifications` is responsible with desktop notifications (the small bubbles of text that appear at the top of the screen when some event happens).
When an application wants to send a notification it needs to connect to D-Bus and call the `Notify` method from the `org.freedesktop.Notifications` interface.

In this example, we want to call the `Notify` method ourselves.
To do this, we must first understand the signature of this method:

`Notify (String arg_0, UInt32 arg_1, String arg_2, String arg_3, String arg_4, Array of [String] arg_5, Dict of {String, Variant} arg_6, Int32 arg_7) ↦ (UInt32 arg_8)`

This doesn't tell us much, but we can find more documentation [here](https://specifications.freedesktop.org/notification-spec/notification-spec-latest.html#basic-design), since `freedesktop` is an open standard.

We'll set the arguments to the following (for our simple case, most of them will be unused):

- `app_name`: `""`

- `replaces_id`: `0`

- `app_icon`: `""`

- `summary`: `"This is the title"`

- `body`: `"This is the content"`

- `actions`: `[]`

- `hints`: `{}`

- `expire_timeout`: `-1`

Now the question is how to actually call the method.
Normally, we would have to write an application that connects to D-Bus and executes the call.
But for demonstrative purposes there are easier ways.

One way is directly from d-feet.
If we double-click on the `Notify` method in the right-side pane of d-feet, a window will open that allows us to call the method with any arguments that we want:

![dfeet-execute-dialog](../media/dfeet_execute.png)

Then we click the `Execute` button and the notification will appear:

![dfeet-execute-](../media/dfeet_execute.gif)

Another way is from the command-line. There's the `gdbus` tool that can do this:
