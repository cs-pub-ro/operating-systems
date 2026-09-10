# Questions

1. How do we integrate external content?
   Do we updated it according to our coding style rules, or do we keep it like that?

   * Smaller files, pieces of code, that we expect students to read and, eventually, modify, we should update to our rules.
   * Larger files, that we expect students to simply use, without much attention to reading then, we should keep the same.
   * Potentially, files that are part of a repository that is frequently updated, we should not modify, since they would have to be updated periodically from the initial source.

1. Bonus exercise: Have them find an issue in the binary file and then fix it.

   * Create a more complex exercise with a not so-obvious memory issue.
     Use the source code + GDB to identify the issue.
   * As a super-bonux exercise, find an issue in a binary file (no source code) and do binary patching to fix the issue.

1. How do we organize content for a session and for an exercise / demo?

   * We use `demo-<name>` for name of demo directories, `<id>-<name>` for exercises, `<bonus>-<name>` for exercises.
   * We use a directory called `solutions/` to store reference solutions.
     The contents of the `solutions/` directory will follow the same convention.
   * We use a directory called `utils/` for additional content.
   * Have each exercise directory be freestanding: if you create an archive of the directory, it can be used as it is.
     There won't be symbolic links or references to common parts of Makefiles or anything like that.
   * Each exercise directory will have at least a README.md, and, potentially, a build file (Makefile), a `.gitignore` file and source code.
   * The solution README.md will present full information on how the program works, how to build and run.
     The exercise README.md will present the goal of the exercise and instructions on solving it.
   * The reference is the solution directory.
     Store a prompt to instruct a human or AI engine to generate the exercise skeleton from the solution.
     This applies to all types of practical content: demos, exercises, bonus exercises.

1. What terms do we use for exercises / drills?
   So we can use the same names in all places.

   * We use the term "demo" / "demos" for practical activities to be showed and solved together at the beginning of each lab session.
     Demos will be only showed (not solved together) during lectures.
   * We use the term "exercise" / "exercises" for practical actvities to be solved individually or in teams during the lab session, with support from the TA.
   * We use the term "bonus exercise" for extra practical activities, with an added level of complexity.

1. What are rules for content?

   * Coding style guidelines and Markdown rules for later
   * How to structure README.md for later
