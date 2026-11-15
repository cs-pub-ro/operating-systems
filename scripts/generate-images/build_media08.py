#!/usr/bin/env python3
"""Build the lecture 08 figures: the storyline and the nine content figures.

    ./build_media08.py            # into content/lectures/08-concurrency-*/media
    ./build_media08.py out-dir    # somewhere else, to look before overwriting

Each figure is written as an .excalidraw file with its SVG beside it.  With no
argument, the SVGs are also copied into the -live half, which carries the
figures and not their sources.
"""
import os
import shutil
import sys

from exlib import *

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
FULL = os.path.join(ROOT, 'content', 'lectures', '08-concurrency-full', 'media')
LIVE = os.path.join(ROOT, 'content', 'lectures', '08-concurrency-live', 'media')
OUT = sys.argv[1] if len(sys.argv) > 1 else FULL


def padlock(f, cx, cy, s, color):
    """A padlock whose body is centred on (cx, cy)."""
    f.line([(cx - s * 0.28, cy - s * 0.3), (cx - s * 0.28, cy - s * 0.62), (cx, cy - s * 0.85),
            (cx + s * 0.28, cy - s * 0.62), (cx + s * 0.28, cy - s * 0.3)], color, sw=2, curve=True)
    f.rect(cx - s / 2, cy - s * 0.35, s, s * 0.7, color, sw=2)
    f.circle(cx, cy, s * 0.07, color[0], bg=color[0], sw=1)


def tcircle(f, cx, cy, label, color, r=13, size=10):
    f.circle(cx, cy, r, color, sw=1)
    f.ctext(cx, cy, label, size, color)


def p_hook(f, cx, cy, c):
    f.box(cx - 58, cy - 46, 116, 28, '1 thread: right', GREEN, 11, sw=1)
    f.box(cx - 58, cy - 10, 116, 28, '8 threads: wrong', RED, 11, sw=1)
    f.ctext(cx, cy + 38, 'and 3 times slower', 10, GRAY)


def p_switch(f, cx, cy, c):
    f.box(cx - 30, cy + 8, 60, 30, 'CPU', GRAY, 11, sw=1)
    f.box(cx - 56, cy - 46, 40, 26, 'T1', RED, 11, sw=1)
    f.box(cx + 16, cy - 46, 40, 26, 'T2', GREEN, 11, sw=1)
    f.arrow([(cx - 14, cy + 6), (cx - 34, cy - 18)], RED, sw=2)
    f.arrow([(cx + 34, cy - 18), (cx + 14, cy + 6)], GREEN, sw=2)
    f.ctext(cx, cy + 52, 'at any moment', 10, GRAY)


def p_turns(f, cx, cy, c):
    f.text(cx - 30, cy - 56, '1 core: turns', 10, GRAY)
    for i, col in enumerate([BLUE, ORANGE, BLUE, ORANGE]):
        f.rect(cx - 56 + i * 28, cy - 38, 26, 16, col, sw=1, round=False)
    f.text(cx - 56, cy - 8, '2 cores: at once', 10, GRAY)
    for i in range(2):
        f.rect(cx - 56 + i * 28, cy + 10, 26, 16, BLUE, sw=1, round=False)
        f.rect(cx - 56 + i * 28, cy + 30, 26, 16, ORANGE, sw=1, round=False)
    f.arrow([(cx + 6, cy + 54), (cx + 56, cy + 54)], GRAY, sw=1)
    f.text(cx - 40, cy + 47, 'time', 10, GRAY)


def p_shared(f, cx, cy, c):
    tcircle(f, cx - 40, cy - 36, 'T1', BLUE, 15)
    tcircle(f, cx, cy - 44, 'T2', ORANGE, 15)
    tcircle(f, cx + 40, cy - 36, 'T3', VIOLET, 15)
    f.box(cx - 36, cy + 14, 72, 30, 'sum', GREEN, 13, sw=2)
    f.arrow([(cx - 34, cy - 20), (cx - 18, cy + 10)], BLUE, sw=1)
    f.arrow([(cx, cy - 27), (cx, cy + 10)], ORANGE, sw=1)
    f.arrow([(cx + 34, cy - 20), (cx + 18, cy + 10)], VIOLET, sw=1)
    f.ctext(cx, cy + 56, 'read and written', 10, GRAY)


def p_lost(f, cx, cy, c):
    f.ctext(cx - 20, cy - 52, 'T1', 11, BLUE)
    f.ctext(cx + 32, cy - 52, 'T2', 11, ORANGE)
    f.box(cx - 58, cy - 40, 54, 20, 'load 5', BLUE, 10, sw=1)
    f.box(cx + 4, cy - 16, 54, 20, 'load 5', ORANGE, 10, sw=1)
    f.box(cx + 4, cy + 8, 54, 20, 'store 6', ORANGE, 10, sw=1)
    f.box(cx - 58, cy + 32, 54, 20, 'store 6', BLUE, 10, sw=1)
    f.ctext(cx + 30, cy + 46, '6, not 7', 11, RED)


def p_culprits(f, cx, cy, c):
    f.circle(cx - 32, cy - 12, 22, GRAY, sw=2)
    f.line([(cx - 32, cy - 12), (cx - 32, cy - 26)], GRAY, sw=2)
    f.line([(cx - 32, cy - 12), (cx - 22, cy - 6)], GRAY, sw=2)
    f.ctext(cx - 32, cy + 24, 'the timer', 10, GRAY)
    f.box(cx + 12, cy - 36, 44, 22, 'CPU 0', VIOLET, 10, sw=1)
    f.box(cx + 12, cy - 10, 44, 22, 'CPU 1', VIOLET, 10, sw=1)
    f.ctext(cx + 34, cy + 24, 'the cores', 10, VIOLET)
    f.ctext(cx, cy + 48, 'either is enough', 10, GRAY)


def p_partition(f, cx, cy, c):
    cols = [BLUE, ORANGE, VIOLET, TEAL]
    for i, col in enumerate(cols):
        x = cx - 58 + i * 30
        tcircle(f, x + 13, cy - 40, 'T%d' % (i + 1), col, 12, 9)
        f.arrow([(x + 13, cy - 26), (x + 13, cy - 8)], col, sw=1)
        f.rect(x, cy - 4, 26, 22, col, sw=1, round=False)
    f.ctext(cx, cy + 36, 'a piece each,', 10, GRAY)
    f.ctext(cx, cy + 50, 'added up at the end', 10, GRAY)


def p_lock(f, cx, cy, c):
    padlock(f, cx, cy - 22, 40, BLUE)
    for i in range(3):
        f.rect(cx - 54 + i * 40, cy + 14, 28, 20, GREEN, sw=1)
        if i < 2:
            f.arrow([(cx - 26 + i * 40, cy + 24), (cx - 14 + i * 40, cy + 24)], GREEN, sw=1)
    f.ctext(cx, cy + 50, 'one thread at a time', 10, GRAY)


def p_kernel(f, cx, cy, c):
    tcircle(f, cx - 26, cy - 40, 'T1', BLUE, 13)
    tcircle(f, cx + 26, cy - 40, 'T2', ORANGE, 13)
    f.line([(cx - 72, cy - 6), (cx + 72, cy - 6)], GRAY, sw=1, style='dashed')
    f.text(cx - 70, cy - 22, 'user', 9, GRAY)
    f.text(cx - 70, cy - 2, 'kernel', 9, GRAY)
    padlock(f, cx + 4, cy + 34, 34, TEAL)
    f.arrow([(cx - 22, cy - 26), (cx - 4, cy + 8)], BLUE, sw=1)
    f.arrow([(cx + 24, cy - 26), (cx + 10, cy + 8)], ORANGE, sw=1)


def p_cost(f, cx, cy, c):
    for i, col in enumerate([VIOLET, ORANGE, BLUE]):
        tcircle(f, cx - 54 + i * 28, cy - 14, 'T', col, 12)
    f.arrow([(cx + 18, cy - 14), (cx + 34, cy - 14)], GRAY, sw=1)
    padlock(f, cx + 52, cy - 10, 30, YELLOW)
    f.ctext(cx, cy + 24, 'waiting,', 11, GRAY)
    f.ctext(cx, cy + 40, 'not working', 11, GRAY)


def p_wrong(f, cx, cy, c):
    tcircle(f, cx - 46, cy - 6, 'T1', BLUE, 15)
    tcircle(f, cx + 46, cy - 6, 'T2', ORANGE, 15)
    f.box(cx - 15, cy - 50, 30, 24, 'A', GRAPE, 12, sw=1)
    f.box(cx - 15, cy + 14, 30, 24, 'B', GRAPE, 12, sw=1)
    f.arrow([(cx - 18, cy - 38), (cx - 38, cy - 22)], BLUE, sw=2)
    f.arrow([(cx - 38, cy + 10), (cx - 18, cy + 24)], BLUE, sw=1, style='dashed')
    f.arrow([(cx + 18, cy + 26), (cx + 38, cy + 10)], ORANGE, sw=2)
    f.arrow([(cx + 38, cy - 22), (cx + 18, cy - 38)], ORANGE, sw=1, style='dashed')
    f.ctext(cx, cy + 54, 'each waits', 10, GRAY)


def p_flag(f, cx, cy, c):
    f.line([(cx - 20, cy - 50), (cx - 20, cy + 50)], GRAY, sw=3)
    f.poly([(cx - 20, cy - 48), (cx + 40, cy - 30), (cx - 20, cy - 10)], c)
    f.ctext(cx + 14, cy + 22, 'share less', 11, c)


STATIONS = [
    ('THE HOOK', 'one sum, six programs, one wrong answer', ORANGE, p_hook),
    ('FLASHBACK: THE SWITCH', 'a thread can lose the CPU at any moment', BLUE, p_switch),
    ('TAKING TURNS, OR AT ONCE', 'concurrent is not always parallel', TEAL, p_turns),
    ('SHARED DATA', 'one value, many writers', GREEN, p_shared),
    ('THE LOST UPDATE', 'load, add, store: three steps, not one', RED, p_lost),
    ('TWO CULPRITS', 'the timer on one core, the bus on many', VIOLET, p_culprits),
    ("DON'T SHARE", 'partition: a piece for every thread', GREEN, p_partition),
    ('SHARE WITH A LOCK', 'synchronize: one thread at a time', BLUE, p_lock),
    ('THE KERNEL SHARES TOO', 'locks you never wrote, and still wait for', TEAL, p_kernel),
    ('LOCKS COST', 'threads that wait are not working', YELLOW, p_cost),
    ('LOCKS GO WRONG', 'deadlock, and checking too early', GRAPE, p_wrong),
    ('THE TAKEAWAY', 'share less, lock little, lock right', ORANGE, p_flag),
]


def storyline():
    f = Fig('storyline-08')
    cxs = [170, 510, 850, 1190]
    cys = [200, 570, 940]
    R = 80
    f.text(680, 10, 'Concurrency -- the story', 34, INK, 'center')
    pos = []
    for i in range(12):
        row, k = divmod(i, 4)
        col = k if row != 1 else 3 - k
        pos.append((cxs[col], cys[row]))
    for i, (cx, cy) in enumerate(pos):
        title, sub, c, pic = STATIONS[i]
        f.circle(cx, cy, R, c[0], bg='#ffffff', sw=3)
        pic(f, cx, cy, c)
        f.circle(cx - 60, cy - 66, 22, c, sw=3)
        f.ctext(cx - 60, cy - 66, str(i + 1), 22, c)
        f.text(cx, cy + 98, title, 21, c, 'center')
        f.text(cx, cy + 130, sub, 15, GRAY, 'center')
    for i in range(11):
        (x0, y0), (x1, y1) = pos[i], pos[i + 1]
        if y0 == y1:
            d = 1 if x1 > x0 else -1
            f.arrow([(x0 + d * 92, y0), (x1 - d * 92, y1)], INK, sw=3)
        else:
            side = 1 if x0 > 600 else -1
            f.arrow([(x0 + side * 88, y0 + 30), (x0 + side * 165, (y0 + y1) / 2 - 10),
                     (x1 + side * 96, y1 - 20)], INK, sw=3, curve=True)
    f.save(OUT + '/00-pitch/storyline')


def panel(f, x, y, w, h, title, color, sub=None):
    f.rect(x, y, w, h, color[0], sw=1, style='dashed')
    f.text(x + 20, y + 14, title, 18, color)
    if sub:
        f.text(x + 20, y + 42, sub, 13, GRAY)


def six_sums():
    f = Fig('six-sums')
    f.text(40, 20, 'One sum, six programs', 26)
    f.text(40, 62, 'Add the numbers 1 to 1,000, 40,000 times over: 40 million additions. The answer is 20,020,000,000.', 14, GRAY)
    f.text(40, 104, 'program', 13, GRAY)
    f.text(180, 104, 'how it adds', 13, GRAY)
    f.text(560, 104, 'answer', 13, GRAY)
    f.text(680, 104, 'time', 13, GRAY)
    rows = [
        ('serial', 'one thread, one sum', True, 15, '15 ms', GRAY),
        ('threads', '8 threads, one shared sum, nothing else', False, 50, '50 ms: 3 times slower', RED),
        ('partition', '8 threads, a sum each, added up at the end', True, 2, '2 ms: 8 times faster', GREEN),
        ('atomic', '8 threads, one shared sum, atomic additions', True, 255, '255 ms: 17 times slower', BLUE),
        ('mutex', '8 threads, one shared sum, a mutex around each', True, 1215, '1,215 ms: 80 times slower', VIOLET),
        ('spinlock', '8 threads, one shared sum, a spinlock around each', True, 3700, '3,700 ms: 250 times slower', YELLOW),
    ]
    y = 134
    for name, how, ok, ms, label, c in rows:
        f.text(40, y + 6, name, 17, c)
        f.text(180, y + 8, how, 14, INK)
        f.box(560, y, 84, 32, 'right' if ok else 'WRONG', GREEN if ok else RED, 14, sw=2 if ok else 3)
        w = max(6, (ms ** 0.5) * 5)
        f.rect(680, y + 2, w, 28, c, sw=1, round=False)
        f.text(680 + w + 12, y + 8, label, 14, c)
        y += 52
    f.text(40, y + 16, 'Sharing made it wrong. Locking made it right, and slow. Not sharing made it right, and fast.', 16)
    f.text(40, y + 44, '(bars grow with the square root of the time, or the last one would not fit)', 12, GRAY)
    f.save(OUT + '/00-pitch/six-sums')


def thread_states():
    f = Fig('thread-states-08')
    f.text(40, 20, 'Leaving the CPU: four triggers', 26)
    f.ellipse(360, 90, 240, 100, GREEN)
    f.ctext(480, 140, 'RUNNING\non a CPU', 16, GREEN)
    f.ellipse(60, 400, 240, 100, BLUE)
    f.ctext(180, 450, 'READY\nwaiting for a CPU', 16, BLUE)
    f.ellipse(660, 400, 240, 100, RED)
    f.ctext(780, 450, 'BLOCKED\nwaiting for an event', 16, RED)
    # running -> blocked
    f.arrow([(590, 170), (760, 396)], RED)
    f.text(700, 230, '1. it blocks', 15, RED)
    f.text(700, 252, 'read(), sleep(), a lock that is taken', 12, RED)
    f.text(700, 270, 'voluntary', 12, GRAY)
    # running -> ready
    f.arrow([(380, 176), (210, 396)], BLUE)
    f.text(275, 214, '2. it yields', 15, BLUE, 'right')
    f.text(275, 236, 'voluntary', 12, GRAY, 'right')
    f.text(250, 266, '3. its time slice ends', 15, ORANGE, 'right')
    f.text(250, 288, 'involuntary', 12, GRAY, 'right')
    f.text(225, 318, '4. a higher-priority thread is ready', 15, VIOLET, 'right')
    f.text(225, 340, 'involuntary', 12, GRAY, 'right')
    # ready -> running
    f.arrow([(270, 404), (430, 192)], GREEN, style='dashed')
    f.text(372, 300, 'picked by', 12, GREEN)
    f.text(372, 316, 'the scheduler', 12, GREEN)
    # blocked -> ready
    f.arrow([(656, 450), (304, 450)], BLUE, style='dashed')
    f.ctext(480, 434, 'the event happened', 12, BLUE)
    f.rect(40, 540, 880, 86, YELLOW, sw=1)
    f.text(60, 552, 'Triggers 3 and 4 come from the timer interrupt, not from the thread.', 15, INK)
    f.text(60, 576, 'The thread does not choose the moment: it can lose the CPU between any two instructions,', 15, INK)
    f.text(60, 598, 'and it does not notice that it did.', 15, INK)
    f.save(OUT + '/01-reminder/thread-states')


def lane(f, x, y, label, blocks, w=44, h=30):
    """A CPU lane: blocks are (name, color, units) or None for a gap."""
    f.text(x - 12, y + 6, label, 13, GRAY, 'right')
    cx = x
    for b in blocks:
        if b is None:
            cx += w
            continue
        name, c, n = b
        f.rect(cx, y, w * n - 2, h, c, sw=1, round=False)
        f.ctext(cx + (w * n - 2) / 2, y + h / 2, name, 12, c)
        cx += w * n


def concurrency_parallelism():
    f = Fig('concurrency-parallelism')
    f.text(40, 20, 'Concurrent, and sometimes parallel', 26)
    T1 = ('T1', BLUE, 1)
    T2 = ('T2', ORANGE, 1)
    panel(f, 40, 80, 440, 300, 'One core: the threads take turns', TEAL)
    lane(f, 120, 160, 'CPU 0', [T1, T2, T1, T2, T1, T2, T1])
    f.arrow([(120, 220), (440, 220)], GRAY, sw=1)
    f.text(440, 226, 'time', 12, GRAY, 'right')
    f.text(60, 262, 'concurrent: yes', 16, GREEN)
    f.text(60, 290, 'parallel: no', 16, RED)
    f.text(60, 326, 'the scheduler decides where each turn ends', 13, GRAY)
    f.text(60, 346, 'the threads interleave', 13, GRAY)
    panel(f, 520, 80, 440, 300, 'Two cores: the threads run at once', VIOLET)
    lane(f, 600, 140, 'CPU 0', [('T1', BLUE, 7)])
    lane(f, 600, 178, 'CPU 1', [('T2', ORANGE, 7)])
    f.arrow([(600, 226), (920, 226)], GRAY, sw=1)
    f.text(920, 232, 'time', 12, GRAY, 'right')
    f.text(540, 262, 'concurrent: yes', 16, GREEN)
    f.text(540, 290, 'parallel: yes', 16, GREEN)
    f.text(540, 326, 'nobody decides anything: both run', 13, GRAY)
    f.text(540, 346, 'the threads overlap', 13, GRAY)
    f.text(40, 404, 'Concurrent: the two threads are alive over the same period, and may touch the same things.', 16)
    f.text(40, 430, 'Parallel: at some instant, both are actually running. Parallelism needs cores; concurrency does not.', 16)
    f.save(OUT + '/02-concurrency/concurrency-parallelism')


def coherence_consistency():
    f = Fig('coherence-consistency')
    f.text(40, 20, 'Two things shared data can lose', 26)
    panel(f, 40, 80, 440, 330, 'COHERENCE', BLUE, 'every thread sees the same value')
    f.box(190, 160, 140, 44, 'sum: 7', GREEN, 18)
    f.text(260, 210, 'in memory', 12, GRAY, 'center')
    tcircle(f, 120, 290, 'T1', BLUE, 24, 14)
    tcircle(f, 400, 290, 'T2', ORANGE, 24, 14)
    f.arrow([(200, 206), (138, 268)], BLUE)
    f.text(96, 322, 'reads 7', 14, BLUE)
    f.box(300, 250, 60, 30, '5', RED, 15, sw=1)
    f.text(330, 232, 'its copy', 11, RED, 'center')
    f.arrow([(376, 286), (362, 274)], RED, sw=1, end=None)
    f.text(340, 322, 'still works with 5', 14, RED)
    f.text(60, 366, 'Lost when a thread computes with a copy that is out of date:', 13, GRAY)
    f.text(60, 384, 'a value in a register, a size read before the lock was taken.', 13, GRAY)
    panel(f, 520, 80, 440, 330, 'CONSISTENCY', VIOLET, 'the operations take effect in a correct order')
    f.text(540, 156, 'the same program, run three times:', 13, INK)
    for i, v in enumerate(['2,960,207,722', '3,332,115,672', '2,706,355,573']):
        f.text(560, 184 + i * 34, 'run %d' % (i + 1), 14, GRAY)
        f.box(620, 178 + i * 34, 180, 28, v, RED, 15, sw=1)
    f.text(560, 292, 'right', 14, GRAY)
    f.box(620, 286, 180, 28, '20,020,000,000', GREEN, 15, sw=1)
    f.text(540, 366, 'Lost when the result depends on how the threads interleave:', 13, GRAY)
    f.text(540, 384, 'a different order every run, so a different result every run.', 13, GRAY)
    f.save(OUT + '/02-concurrency/coherence-consistency')


def step(f, x, y, s, c, w=150):
    f.box(x, y, w, 28, s, c, 13, sw=1)


def lost_update():
    f = Fig('lost-update')
    f.text(40, 20, 'The lost update', 26)
    f.text(40, 66, 'sum = sum + 1   is three steps:', 16)
    step(f, 300, 60, 'load sum', GRAY, 110)
    f.arrow([(414, 74), (436, 74)], GRAY, sw=1)
    step(f, 440, 60, 'add 1', GRAY, 80)
    f.arrow([(524, 74), (546, 74)], GRAY, sw=1)
    step(f, 550, 60, 'store sum', GRAY, 110)
    f.text(680, 66, 'and a thread can stop between any two.', 16)

    # Panel A
    panel(f, 40, 110, 470, 400, 'A. One core: preempted between the steps', ORANGE)
    f.ctext(140, 172, 'T1', 15, BLUE)
    f.ctext(310, 172, 'T2', 15, ORANGE)
    f.ctext(450, 172, 'sum', 15, GREEN)
    ya = 190
    step(f, 65, ya, 'load: gets 5', BLUE)
    f.ctext(450, ya + 14, '5', 15, GREEN)
    step(f, 65, ya + 36, 'add: has 6', BLUE)
    f.line([(60, ya + 80), (490, ya + 80)], RED, sw=1, style='dashed')
    f.text(488, ya + 62, 'time slice ends: context switch', 11, RED, 'right')
    step(f, 235, ya + 92, 'load: gets 5', ORANGE)
    f.ctext(450, ya + 106, '5', 15, GREEN)
    step(f, 235, ya + 128, 'add: has 6', ORANGE)
    step(f, 235, ya + 164, 'store 6', ORANGE)
    f.ctext(450, ya + 178, '6', 15, GREEN)
    f.line([(60, ya + 208), (490, ya + 208)], RED, sw=1, style='dashed')
    f.text(65, ya + 190, 'context switch', 11, RED)
    step(f, 65, ya + 220, 'store 6', BLUE)
    f.ctext(450, ya + 234, '6', 15, RED)
    f.text(275, ya + 272, 'two additions, and sum went from 5 to 6', 14, RED, 'center')

    # Panel B
    panel(f, 540, 110, 470, 400, 'B. Several cores: at the same time', VIOLET)
    f.ctext(640, 172, 'T1 on CPU 0', 15, BLUE)
    f.ctext(810, 172, 'T2 on CPU 1', 15, ORANGE)
    f.ctext(950, 172, 'sum', 15, GREEN)
    yb = 190
    step(f, 565, yb, 'load: gets 5', BLUE)
    step(f, 735, yb, 'load: gets 5', ORANGE)
    f.ctext(950, yb + 14, '5', 15, GREEN)
    step(f, 565, yb + 36, 'add: has 6', BLUE)
    step(f, 735, yb + 36, 'add: has 6', ORANGE)
    step(f, 565, yb + 72, 'store 6', BLUE)
    step(f, 735, yb + 72, 'store 6', ORANGE)
    f.ctext(950, yb + 86, '6', 15, RED)
    f.text(775, yb + 124, 'no scheduler involved: the two cores', 14, GRAY, 'center')
    f.text(775, yb + 144, 'interleave on the memory bus', 14, GRAY, 'center')
    f.text(775, yb + 272, 'two additions, and sum went from 5 to 6', 14, RED, 'center')

    f.box(40, 534, 220, 44, 'shared data', GREEN, 17)
    f.ctext(290, 556, 'and', 17)
    f.box(320, 534, 250, 44, 'preemption (A)', ORANGE, 17)
    f.ctext(600, 556, 'or', 17)
    f.box(630, 534, 250, 44, 'several cores (B)', VIOLET, 17)
    f.ctext(945, 556, '= a race', 19, RED)
    f.save(OUT + '/03-root-causes/lost-update')


def partition_synchronize():
    f = Fig('partition-synchronize')
    f.text(40, 20, 'Two answers to shared data', 26)
    panel(f, 40, 80, 460, 420, 'PARTITION', GREEN, 'remove the sharing')
    cols = [BLUE, ORANGE, VIOLET, TEAL]
    for i, c in enumerate(cols):
        x = 80 + i * 96
        tcircle(f, x + 44, 176, 'T%d' % (i + 1), c, 20, 13)
        f.arrow([(x + 44, 198), (x + 44, 226)], c, sw=1)
        f.rect(x, 230, 44, 34, c, sw=1, round=False)
        f.rect(x + 44, 230, 44, 34, c, sw=1, round=False)
        f.arrow([(x + 44, 266), (x + 44, 294)], c, sw=1)
        f.box(x + 6, 298, 76, 28, 'partial %d' % (i + 1), c, 12, sw=1)
        f.arrow([(x + 44, 328), (190 + (i - 1.5) * 20, 372)], GRAY, sw=1)
    f.box(140, 376, 100, 34, 'sum', GREEN, 16)
    f.text(254, 384, 'added up once, by one thread', 12, GRAY)
    f.text(60, 432, 'No shared writes, so no lock and no waiting.', 14)
    f.text(60, 454, 'Works when the data splits: arrays, ranges, independent requests.', 13, GRAY)

    panel(f, 540, 80, 460, 420, 'SYNCHRONIZE', BLUE, 'keep the sharing, take turns')
    f.rect(720, 180, 250, 150, BLUE[0], sw=2, style='dashed')
    f.text(845, 188, 'critical section', 12, BLUE, 'center')
    padlock(f, 720, 255, 40, BLUE)
    for i in range(3):
        f.rect(752 + i * 70, 240, 50, 30, GREEN, sw=1)
        if i < 2:
            f.arrow([(804 + i * 70, 250), (820 + i * 70, 250)], GREEN, sw=1)
            f.arrow([(820 + i * 70, 262), (804 + i * 70, 262)], GREEN, sw=1)
    f.text(845, 284, 'a list: every node points at two others', 11, GRAY, 'center')
    tcircle(f, 845, 218, 'T1', BLUE, 15, 12)
    for i, c in enumerate([VIOLET, ORANGE, TEAL]):
        tcircle(f, 580 + i * 44, 255, 'T%d' % (4 - i), c, 17, 12)
    f.arrow([(690 - 2, 255), (698, 255)], GRAY, sw=1)
    f.text(624, 284, 'waiting for the lock', 12, GRAY, 'center')
    f.text(845, 340, 'T1 holds the lock', 12, BLUE, 'center')
    f.text(560, 384, 'lock();  change the list;  unlock();', 15)
    f.text(560, 432, 'One thread at a time between lock and unlock.', 14)
    f.text(560, 454, 'Needed when the data does not split: lists, trees, graphs, counters.', 13, GRAY)
    f.text(40, 522, 'Partition what you can; synchronize what is left. The kernel does the same with its own shared data, on your behalf.', 16)
    f.save(OUT + '/04-partitioning-synchronization/partition-synchronize')


def the_chain():
    f = Fig('the-chain')
    f.text(40, 20, 'Each answer brings the next problem', 26)
    boxes = [
        ('PARALLELISM,\nCONCURRENCY', GREEN, ['more cores, more threads,', 'more work in the same time']),
        ('CONCURRENCY\nPROBLEMS', RED, ['lost updates, stale values,', 'broken lists, crashes']),
        ('SYNCHRONIZATION', BLUE, ['atomic operations,', 'spinlocks, mutexes']),
        ('SYNCHRONIZATION\nPROBLEMS', YELLOW, ['overhead and contention,', 'deadlock, races that remain']),
    ]
    labels = ['shared data', 'answered by', 'costs, and\ncan go wrong']
    for i, (t, c, sub) in enumerate(boxes):
        x = 40 + i * 300
        f.box(x, 100, 200, 90, t, c, 16)
        for j, s in enumerate(sub):
            f.text(x + 100, 200 + j * 18, s, 12, GRAY, 'center')
        if i < 3:
            f.arrow([(x + 206, 145), (x + 294, 145)], INK, sw=3)
            f.text(x + 250, 100 if i == 2 else 114, labels[i], 11, GRAY, 'center')
    f.arrow([(1040, 250), (880, 318), (300, 318), (140, 250)], GREEN, sw=2, curve=True, style='dashed')
    f.text(590, 286, 'the way out: share less, and lock only what is left', 16, GREEN, 'center')
    f.save(OUT + '/05-synchronization-problems/the-chain')


def locks_go_wrong():
    f = Fig('locks-go-wrong')
    f.text(40, 20, 'Two ways to get locking wrong', 26)
    panel(f, 40, 80, 440, 400, 'DEADLOCK', GRAPE, 'each holds what the other wants')
    tcircle(f, 130, 290, 'T1', BLUE, 30, 16)
    tcircle(f, 390, 290, 'T2', ORANGE, 30, 16)
    padlock(f, 260, 212, 44, GRAPE)
    f.text(260, 152, 'lock A', 14, GRAPE, 'center')
    padlock(f, 260, 376, 44, GRAPE)
    f.text(260, 396, 'lock B', 14, GRAPE, 'center')
    f.arrow([(230, 218), (156, 268)], BLUE, sw=3)
    f.text(120, 222, 'holds', 13, BLUE)
    f.arrow([(152, 316), (228, 368)], BLUE, sw=2, style='dashed')
    f.text(96, 344, 'waits for', 13, BLUE)
    f.arrow([(292, 370), (366, 314)], ORANGE, sw=3)
    f.text(350, 344, 'holds', 13, ORANGE)
    f.arrow([(368, 266), (294, 218)], ORANGE, sw=2, style='dashed')
    f.text(350, 222, 'waits for', 13, ORANGE)
    f.text(60, 430, 'Nobody runs, nobody fails: both blocked, 0% CPU, forever.', 13)
    f.text(60, 452, 'Cure: every thread takes the locks in the same order.', 13, GREEN)

    panel(f, 520, 80, 500, 400, 'TOCTOU', RED, 'time of check to time of use: the answer went stale')
    f.text(560, 166, 'T1', 15, BLUE)
    f.text(560, 246, 'T2', 15, ORANGE)
    f.box(600, 156, 110, 36, 'in stock? yes', BLUE, 12, sw=1)
    f.box(880, 156, 110, 36, 'take one', BLUE, 12, sw=1)
    f.line([(714, 174), (876, 174)], BLUE, sw=1, style='dotted')
    f.text(795, 150, 'the gap', 12, RED, 'center')
    f.box(660, 236, 110, 36, 'in stock? yes', ORANGE, 12, sw=1)
    f.box(776, 236, 90, 36, 'take one', ORANGE, 12, sw=1)
    f.text(560, 306, 'stock', 14, GREEN)
    f.arrow([(600, 340), (1000, 340)], GRAY, sw=1)
    f.text(1000, 346, 'time', 12, GRAY, 'right')
    for x, v, c in [(655, '1', GREEN), (715, '1', GREEN), (821, '0', GREEN), (935, '-1', RED)]:
        f.ctext(x, 316, v, 16, c)
    f.text(540, 394, 'Every access is under the lock, and the result is still wrong:', 13)
    f.text(540, 416, 'one item, two buyers, stock at -1.', 13)
    f.text(540, 438, 'Cure: check and act inside one critical section.', 13, GREEN)
    f.save(OUT + '/05-synchronization-problems/locks-go-wrong')


FIGURES = [storyline, six_sums, thread_states, concurrency_parallelism, coherence_consistency,
           lost_update, partition_synchronize, the_chain, locks_go_wrong]


def copy_to_live():
    for part in sorted(os.listdir(FULL)):
        for name in sorted(os.listdir(os.path.join(FULL, part))):
            if name.endswith('.svg'):
                os.makedirs(os.path.join(LIVE, part), exist_ok=True)
                shutil.copy(os.path.join(FULL, part, name), os.path.join(LIVE, part, name))


if __name__ == '__main__':
    for figure in FIGURES:
        figure()
    if OUT == FULL:
        copy_to_live()
