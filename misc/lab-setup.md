# Setting up the Lab Environment

If you have already cloned the repository, make sure it is updated:

```console
student@os:~$ cd operating-systems

student@os:~/operating-systems$ git pull --rebase
```

The command may fail if you have uncommitted changes.
If that is the case, stash your changes, retry, and pop the stash:

```console
student@os:~/operating-systems$ git stash

student@os:~/operating-systems$ git pull --rebase

student@os:~/operating-systems$ git stash pop
```

If you haven't already cloned the repository, do so and then enter the repository:

```console
student@os:~$ git clone https://github.com/cs-pub-ro/operating-systems

student@os:~$ cd operating-systems
```

Navigate to a chapter's lab directory:

```console
student@os:~/operating-systems$ cd content/chapters/<chapter-name>/lab/
```

The possible options are: `software-stack`, `data`, `compute`, `io` and `app-interact`.

You can work on any Linux setup (native install, `WSL`, `VM`), but we strongly recommend you use the [`operating-systems` class VMs](https://cs-pub-ro.github.io/operating-systems/resources#virtual-machine).
