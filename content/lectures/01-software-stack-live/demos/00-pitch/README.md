# Pitch: Four Small Surprises

Four programs whose behaviour their source code does not explain.

Run two of them, not four: after the second surprise the room stops being surprised.

| Demo | The surprise | Run it live? |
| --- | --- | --- |
| [`01-copy-string`](01-copy-string) | Two programs build the identical string; one takes thirty times longer. | Yes --- the best opener |
| [`02-const-char-init`](02-const-char-init) | One character of difference; one program crashes. | If the room is comfortable with C |
| [`03-find-buffer-cache`](03-find-buffer-cache) | The same command, three times, fifteen times faster. | Yes --- needs no build |
| [`04-python-string-edit`](04-python-string-edit) | An assignment that does nothing and changes the complexity. | Show the table |

The point to make at the end of all four: none of them is a question about C or about Python.
Each is a question about the layer *below* the one the program is written in.
