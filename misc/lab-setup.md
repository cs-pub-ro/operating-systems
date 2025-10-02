# Setting up the Lab Environment

## Prerequisites

You can work on any Linux setup (native install, `WSL`, `VM`), but we strongly recommend you use the [`operating-systems` class VMs](https://cs-pub-ro.github.io/operating-systems/resources#virtual-machine).

## Laboratory archives

All the laboratories have archives with the work items.
**We recommend working with the provided archives instead of using the repository.**
If, however, you want to use the repository directly, you can find instructions below.

## Cloning the repository

If you haven't already cloned the repository, do so and you are ready to go:

```console
student@os:~$ git clone https://github.com/cs-pub-ro/operating-systems.git
student@os:~$ cd operating-systems
```

## Getting the latest changes

Each time you start a new laboratory, you should ensure you have the latest changes.
If you have no local changes, you can simply run `git pull` and you are ready to go:

```console
student@os:~$ cd operating-systems
student@os:~/operating-systems$ git status  # Check if you have unstaged changes
On branch <not-important>
nothing to commit, working tree clean

# "working tree clean" means that you have no changes
student@os:~/operating-systems$ git pull --rebase
```

If the `git status` output differs, follow the [instructions to save your progress](#save-progress-and-prepare-next-lab).

## Save Progress and Prepare next lab

1. Check if you have unstaged changes that might be lost:

    ```console
    student@os:~$ cd operating-systems
    student@os:~/operating-systems$ git status
    On branch <not-important>
    Changes not staged for commit:
    (use "git add <file>..." to update what will be committed)
    (use "git restore <file>..." to discard changes in working directory)
            modified:   main.c
    ```

    If `git status` states "work tree clean", you should follow the [instructions to pull latest changes](#getting-the-latest-changes) instead.

1. Create a commit to store your changes:

    ```console
    student@os:~/operating-systems$ git add -f .  # Use -f as `support/` directories are ignored
    student@os:~/operating-systems$ git commit -m "Store progress for lab X"
    student@os:~/operating-systems$ git status    # double check that everything was committed
    On branch <not-important>
    nothing to commit, working tree clean
    ```

1. Create a new branch for lab Y:

    ```console
    student@os:~/operating-systems$ git checkout -b lab-Y main  # Replace Y with lab number
    student@os:~/operating-systems$ git pull origin main        # Get latest changes from origin/main
    ```

1. (Optional) Finding previous labs

    Assuming you followed the instructions in this section, you can find your previous work on other branches:

    ```console
    student@os:~/operating-systems$ git branch
    main
    lab-1
    lab-2
    * lab-3
    student@os:~/operating-systems$ git checkout lab-2
    Switched to branch 'lab-2'
    ```
