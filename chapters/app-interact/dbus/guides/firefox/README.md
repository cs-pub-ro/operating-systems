# Firefox

Let's do the following experiment:

- Open the Firefox browser

- From a terminal run `firefox www.google.com`

![firefox-url-open](../media/firefox_url_open.gif)

Notice that the URL we passed in the command-line was opened in the existing Firefox window as a new tab.
Even though we started a separate Firefox process, which should have created a separate new window, this didn't actually happen.
Instead, the process that we started from the command-line exited immediately and the site was opened in the already running Firefox instance.

Without any precise knowledge about Firefox internals, we can guess that something like this happened:

- The newly started Firefox process detected that another instance of Firefox is already running

- The newly started Firefox process sent a message to the existing running process, requesting it to open a URL in a new tab

Since we're talking about message passing between 2 processes, there's a chance that maybe D-Bus was involved.
Let's check: we'll use a tool called `dbus-monitor` that will print all messages passed through D-Bus.

```console
student@os:~$ dbus-monitor
```

Then, in another terminal, we'll run `firefox www.google.com` again.

Going back to the `dbus-monitor` output, we find the following:

```console
...
method call time=1655809062.813923 sender=:1.757 -> destination=org.mozilla.firefox.ZGVmYXVsdC1yZWxlYXNl serial=2 path=/org/mozilla/firefox/Remote; interface=org.mozilla.firefox; member=OpenURL
   array of bytes [
      02 00 00 00 1a 00 00 00 2f 00 00 00 2f 68 6f 6d 65 2f 61 64 72 69 61 6e
      73 00 2f 6f 70 74 2f 66 69 72 65 66 6f 78 2f 66 69 72 65 66 6f 78 00 77
      77 77 2e 67 6f 6f 67 6c 65 2e 63 6f 6d 00
   ]
```

There was a D-Bus call to `org.mozilla.firefox.ZGVmYXVsdC1yZWxlYXNl`, on the object `/org/mozilla/firefox/Remote`, method `OpenURL` from the `org.mozilla.firefox` interface.
Indeed, we see that this object exists in d-feet as well:

![dfeet-firefox](../media/dfeet_firefox.png)

We can try to call the `OpenURL` method ourselves, directly from d-feet.
The method has only one argument of the type `Array of [Byte]`.
Although there's no documentation for it, we can use the same byte array that we saw in `dbus-monitor`:

```console
   array of bytes [
      02 00 00 00 1a 00 00 00 2f 00 00 00 2f 68 6f 6d 65 2f 61 64 72 69 61 6e
      73 00 2f 6f 70 74 2f 66 69 72 65 66 6f 78 2f 66 69 72 65 66 6f 78 00 77
      77 77 2e 67 6f 6f 67 6c 65 2e 63 6f 6d 00
   ]
```

(Note that `77 77 77 2e 67 6f 6f 67 6c 65 2e 63 6f 6d` at the end is the string `www.google.com`, so that's another confirmation that we're on the right track).

![dfeet-url-open](../media/dfeet_url_open.gif)
