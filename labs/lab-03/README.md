---
parent: Labs
nav_order: 3
has_children: true
---

# Lab 3 - Memory

## Getting the Latest Changes

Before starting this lab, ensure you have the latest changes.
If you have no local changes, you can simply run `git pull` and you are ready to go:

```console
student@os:~$ cd hardware-software-interface
student@os:~/hardware-software-interface$ git status         # Check if you have unstaged changes
On branch main
nothing to commit, working tree clean

# "working tree clean" means that you have no changes
student@os:~/hardware-software-interface$ git checkout main  # Change branch to main
student@os:~/hardware-software-interface$ git pull --rebase
```

If the `git status` output differs, follow the [instructions to save your progress](#save-progress-and-prepare-next-lab).

## Save Progress and Prepare Next Lab

1. Check if you have unstaged changes that might be lost:

    ```console
    student@os:~$ cd hardware-software-interface
    student@os:~/hardware-software-interface$ git status
    On branch <not-important>
    Changes not staged for commit:
    (use "git add <file>..." to update what will be committed)
    (use "git restore <file>..." to discard changes in working directory)
            modified:   main.c
    ```

    If `git status` states "work tree clean", you should follow the [instructions to pull latest changes](#getting-the-latest-changes) instead.

1. Create a commit to store your changes:

    ```console
    student@os:~/hardware-software-interface$ git add .
    student@os:~/hardware-software-interface$ git commit -m "Store progress for lab-01"
    student@os:~/hardware-software-interface$ git status    # double check that everything was committed
    On branch <not-important>
    nothing to commit, working tree clean
    ```

1. Create a new branch for lab-02:

    ```console
    student@os:~/hardware-software-interface$ git checkout -b lab-02 main  # Replace lab-02 with lab number
    student@os:~/hardware-software-interface$ git pull origin main        # Get latest changes from origin/main
    ```
