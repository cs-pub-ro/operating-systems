# Demo: The Context Switch

| Demo | What it shows |
| --- | --- |
| [`show-context-switches/`](show-context-switches) | The voluntary and involuntary switch counters of one thread: one voluntary per wait, a hundred involuntary per burst. |
| [`buffer-cache/`](buffer-cache) | A `find` from a cold disk against the same `find` from the page cache: 26,865 voluntary switches against 1. |
