# Demo: Root Causes

| Demo | What it shows |
| --- | --- |
| [`one-core-many-cores/`](one-core-many-cores) | A shared counter that loses updates on one core, because of preemption, and loses far more on many, because of parallelism; and what one instruction, with and without the `lock` prefix, changes. |
