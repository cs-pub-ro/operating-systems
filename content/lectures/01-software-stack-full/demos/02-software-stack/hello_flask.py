#!/usr/bin/env python3

"""The same message, one layer higher again: a web framework serves it.

Nothing here opens a socket, parses HTTP or writes to a file descriptor.  Flask
does that, on top of the Python runtime, on top of libc, on top of the kernel.
What is left for the application is the one line that says what to answer.

Run it with `flask --app hello_flask run --port 8080`, then fetch
http://localhost:8080/ with a browser or with `curl`.
"""

from flask import Flask

app = Flask(__name__)


@app.route("/")
def hello():
    return "Hello, World!\n"
