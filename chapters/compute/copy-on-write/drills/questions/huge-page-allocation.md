# Huge Page Allocation

## Question Text

How many page faults are registered between step 1 and step 2 after changing `NUM_PAGES` to 1024?

## Question Answers

- 1024

- 1023

- 0

+ 2

- 512

## Feedback

The code maps 1024 pages of 4 kb each for a total of 4 mb.
The kernel attempts to merge them into 2 huge pages of 2 mb each.
This way, we only need 2 TLB entries (instead of 1024) to manage them.
Those 2 entries are then mapped to physical memory, causing the page faults.
You may read more about THP in these [docs from RedHat](https://docs.redhat.com/en/documentation/red_hat_enterprise_linux/6/html/performance_tuning_guide/s-memory-transhuge) or from the [Linux kernel](https://www.kernel.org/doc/Documentation/vm/transhuge.txt)
