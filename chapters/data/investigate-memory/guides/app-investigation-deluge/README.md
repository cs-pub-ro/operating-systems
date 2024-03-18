# App Investigation: Deluge

[Deluge](https://www.deluge-torrent.org/) is a Bittorrent client written in Python.

We want to locate places that allocate memory in Deluge (in Python).
This generally means locating instantiation of classes.

Let's clone the [source code](https://github.com/deluge-torrent/deluge):

```console
student@os:~/.../app-investigation$ git clone https://github.com/deluge-torrent/deluge
Cloning into 'deluge'...
[...]

student@os:~/.../app-investigation$ cd deluge/

student@os:~/.../app-investigation/deluge$ ls
AUTHORS       deluge      docs             gen_web_gettext.py  MANIFEST.in       msgfmt.py  pyproject.toml  requirements-dev.txt    requirements.txt  setup.py  version.py
CHANGELOG.md  DEPENDS.md  generate_pot.py  LICENSE             minify_web_js.py  packaging  README.md       requirements-tests.txt  setup.cfg         tox.ini
```

And enter the `deluge/core/` subdirectory:

```console
student@os:~/.../app-investigation/deluge$ cd deluge/core/

student@os:~/.../deluge/deluge/core$ ls
alertmanager.py  core.py          daemon.py        filtermanager.py  pluginmanager.py       rpcserver.py       torrent.py
authmanager.py   daemon_entry.py  eventmanager.py  __init__.py       preferencesmanager.py  torrentmanager.py
```

Most files in the subdirectory have a class defined.
We can search for instantiations of that class using `grep`:

```console
student@os:~/.../deluge/deluge/core$ grep -rn 'Torrent('
torrentmanager.py:644:        torrent = Torrent(handle, options, state, filename, magne

student@os:~/.../deluge/deluge/core$ grep -rn 'TorrentManager('
core.py:139:        self.torrentmanager = TorrentManager()
torrentmanager.py:135:class TorrentManager(component.Component):
```

This gives us an overview of when memory is allocated in Deluge / Python.

## Practice

1. Investigate the lines shown to contain instantiations of classes.
   Explore the source code and understand their placements in the source code.

1. Find out other classes and search for their instantiation in the source code.
