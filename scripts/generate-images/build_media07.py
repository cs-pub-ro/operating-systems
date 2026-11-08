#!/usr/bin/env python3
"""Build the lecture 07 figures as .excalidraw files (hand-drawn style)."""
import json, math, random, sys, os

OUT = sys.argv[1]
random.seed(7)

# Excalidraw palette: (stroke, fill)
GRAY = ('#495057', '#dee2e6'); ORANGE = ('#e8590c', '#ffe8cc'); BLUE = ('#1971c2', '#a5d8ff')
TEAL = ('#0c8599', '#99e9f2'); GREEN = ('#2f9e44', '#b2f2bb'); VIOLET = ('#7048e8', '#e5dbff')
YELLOW = ('#f08c00', '#ffec99'); RED = ('#e03131', '#ffc9c9'); PINK = ('#c2255c', '#fcc2d7')
GRAPE = ('#9c36b5', '#eebefa'); INK = '#1e1e1e'; NOTE = '#495057'
CW = 0.6  # Excalifont average advance, in em


def rid():
    return ''.join(random.choice('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789') for _ in range(20))


class Draw:
    def __init__(self):
        self.els = []

    def _base(self, type_, x, y, w, h, stroke=INK, fill='transparent', sw=2, style='solid', rough=1, roundness=None, opacity=100):
        return {
            'id': rid(), 'type': type_, 'x': x, 'y': y, 'width': w, 'height': h, 'angle': 0,
            'strokeColor': stroke, 'backgroundColor': fill, 'fillStyle': 'solid', 'strokeWidth': sw,
            'strokeStyle': style, 'roughness': rough, 'opacity': opacity, 'groupIds': [], 'frameId': None,
            'index': None, 'roundness': roundness, 'seed': random.randint(1, 2**31 - 1), 'version': 1,
            'versionNonce': random.randint(1, 2**31 - 1), 'isDeleted': False, 'boundElements': None,
            'updated': 1, 'link': None, 'locked': False,
        }

    def rect(self, x, y, w, h, color=GRAY, sw=2, rounded=True, style='solid', fill=None, stroke=None, rough=1):
        e = self._base('rectangle', x, y, w, h, stroke or color[0], fill if fill is not None else color[1], sw, style, rough,
                       {'type': 3} if rounded else None)
        self.els.append(e)
        return e

    def ellipse(self, x, y, w, h, color=GRAY, sw=2, style='solid', fill=None, stroke=None, rough=1):
        e = self._base('ellipse', x, y, w, h, stroke or color[0], fill if fill is not None else color[1], sw, style, rough, {'type': 2})
        self.els.append(e)
        return e

    def diamond(self, x, y, w, h, color=GRAY, sw=2):
        e = self._base('diamond', x, y, w, h, color[0], color[1], sw, 'solid', 1, {'type': 2})
        self.els.append(e)
        return e

    def text(self, x, y, s, size=13, color=INK, align='left', w=None, lh=1.25, family=5):
        lines = s.split('\n')
        if w is None:
            w = max(len(l) for l in lines) * size * CW
        h = len(lines) * size * lh
        if align == 'center':
            x = x - w / 2
        elif align == 'right':
            x = x - w
        e = self._base('text', x, y, w, h, color, 'transparent', 2, 'solid', 1, None)
        e.update({'text': s, 'fontSize': size, 'fontFamily': family, 'textAlign': align, 'verticalAlign': 'top',
                  'containerId': None, 'originalText': s, 'autoResize': True, 'lineHeight': lh})
        self.els.append(e)
        return e

    def ctext(self, cx, cy, s, size=13, color=INK, lh=1.25, family=5):
        lines = s.split('\n')
        h = len(lines) * size * lh
        return self.text(cx, cy - h / 2, s, size, color, 'center', None, lh, family)

    def box(self, x, y, w, h, label, color=GRAY, size=13, sw=2, rounded=True, style='solid', tcolor=None):
        self.rect(x, y, w, h, color, sw, rounded, style)
        self.ctext(x + w / 2, y + h / 2, label, size, tcolor or color[0])

    def obox(self, x, y, w, h, label, color=GRAY, size=13, sw=2, tcolor=None):
        self.ellipse(x, y, w, h, color, sw)
        self.ctext(x + w / 2, y + h / 2, label, size, tcolor or color[0])

    def _linear(self, type_, pts, color, sw, style, round_, start, end):
        x0, y0 = pts[0]
        rel = [[px - x0, py - y0] for px, py in pts]
        xs = [p[0] for p in rel]; ys = [p[1] for p in rel]
        e = self._base(type_, x0, y0, max(xs) - min(xs), max(ys) - min(ys), color, 'transparent', sw, style, 1,
                       {'type': 2} if round_ else None)
        e.update({'points': rel, 'lastCommittedPoint': None, 'startBinding': None, 'endBinding': None,
                  'startArrowhead': 'arrow' if start else None, 'endArrowhead': 'arrow' if end else None, 'elbowed': False})
        self.els.append(e)
        return e

    def arrow(self, pts, color=INK, sw=2, style='solid', round_=False, start=False, end=True):
        return self._linear('arrow', pts, color, sw, style, round_, start, end)

    def line(self, pts, color=INK, sw=2, style='solid', round_=False):
        return self._linear('line', pts, color, sw, style, round_, False, False)

    def save(self, path):
        doc = {'type': 'excalidraw', 'version': 2, 'source': 'https://excalidraw.com',
               'elements': self.els, 'appState': {'gridSize': 20, 'gridStep': 5, 'gridModeEnabled': False, 'viewBackgroundColor': '#ffffff'}, 'files': {}}
        os.makedirs(os.path.dirname(path), exist_ok=True)
        with open(path, 'w') as fh:
            json.dump(doc, fh, indent=1)
        print(path)


# ---------------------------------------------------------------- storyline
def storyline():
    d = Draw()
    d.ctext(540, 25, 'Scheduling -- the story', 34, INK, lh=1.2)
    cols = [74, 364, 654, 944]
    rows = [104, 424, 744]
    stations = [
        # (title, subtitle, colour, pictogram)
        ('THE HOOK', '4,614 threads, 24 CPUs, 6 running', ORANGE, 'hook'),
        ('WHERE THREADS COME FROM', 'fork, exec, wait -- a recap', BLUE, 'recap'),
        ('WHAT A FORK COSTS', 'copy on write, paid per page', BLUE, 'cow'),
        ('ONE FUNCTION DECIDES', 'schedule(): threads in, one per CPU out', TEAL, 'funnel'),
        ('THREE STATES', 'running, ready, blocked', TEAL, 'states'),
        ('THE SWITCH', 'one thread out, another in', GREEN, 'switch'),
        ('WHY A THREAD LEAVES', 'it blocks, yields, is bumped, or times out', GREEN, 'leave'),
        ('WAITING IN LINE', 'the ready queue, and the load', VIOLET, 'queue'),
        ('WHAT A SWITCH COSTS', '26,865 switches against 1', YELLOW, 'cost'),
        ('THE KNOBS', 'behaviour and nice set the priority', YELLOW, 'knobs'),
        ('FAIR OR FAST', 'small slices, or large ones', GRAPE, 'scale'),
        ('THE TAKEAWAY', 'the scheduler is a function the OS calls', RED, 'flag'),
    ]
    order = [(0, c) for c in range(4)] + [(1, c) for c in (3, 2, 1, 0)] + [(2, c) for c in range(4)]
    for i, (title, sub, col, pic) in enumerate(stations):
        r, c = order[i]
        x, y = cols[c], rows[r]
        cx, cy = x + 66, y + 66
        d.ellipse(x, y, 132, 132, col, sw=3, fill='#ffffff')
        d.ellipse(x - 5, y - 17, 40, 40, col, sw=3)
        d.ctext(x + 15, y + 3, str(i + 1), 22, col[0], lh=1.2)
        d.text(cx, y + 146, title, 19, col[0], 'center', 280, 1.2)
        d.text(cx, y + 174, sub, 15, NOTE, 'center', 300, 1.2)
        globals()['pic_' + pic](d, cx, cy, col)
    # the walk: row 1 left to right, down, row 2 right to left, down, row 3 left to right
    for r, y in enumerate(rows):
        ay = y + 66
        for c in range(3):
            x1, x2 = cols[c] + 138, cols[c + 1] - 6
            if r == 1:
                d.arrow([(x2, ay), (x1, ay)], INK, 3)
            else:
                d.arrow([(x1, ay), (x2, ay)], INK, 3)
    d.arrow([(1082, 186), (1126, 330), (1082, 474)], INK, 3, round_=True)
    d.arrow([(66, 506), (22, 650), (66, 794)], INK, 3, round_=True)
    return d


def pill(d, cx, cy, w, h, label, col, size=10):
    d.rect(cx - w / 2, cy - h / 2, w, h, col, 1)
    d.ctext(cx, cy, label, size, col[0], lh=1.2)


def pic_hook(d, cx, cy, col):
    pill(d, cx, cy - 30, 92, 20, '4,614 threads', ORANGE)
    pill(d, cx, cy - 4, 92, 20, '24 CPUs', GRAY)
    pill(d, cx, cy + 22, 92, 20, '6 running', GREEN)
    d.ctext(cx, cy + 44, 'the rest are waiting', 9, NOTE, lh=1.2)


def pic_recap(d, cx, cy, col):
    pill(d, cx - 28, cy - 28, 30, 24, 'P', BLUE, 11)
    pill(d, cx + 28, cy + 12, 30, 24, 'C', BLUE, 11)
    d.arrow([(cx - 14, cy - 14), (cx + 14, cy)], BLUE[0], 2)
    d.text(cx - 2, cy - 32, 'fork', 9, BLUE[0], 'left', lh=1.2)
    d.text(cx + 5, cy + 2, '+exec', 9, BLUE[0], 'left', lh=1.2)
    d.arrow([(cx + 28, cy + 24), (cx + 28, cy + 36), (cx - 52, cy + 36), (cx - 52, cy - 28), (cx - 44, cy - 28)], BLUE[0], 1, style='dashed')
    d.text(cx - 30, cy + 26, 'wait()', 9, BLUE[0], 'left', lh=1.2)
    d.ctext(cx, cy + 48, 'processes make processes', 9, NOTE, lh=1.2)


def pic_cow(d, cx, cy, col):
    pill(d, cx - 30, cy - 30, 32, 22, 'P', GREEN, 11)
    pill(d, cx + 30, cy - 30, 32, 22, 'C', ORANGE, 11)
    d.rect(cx - 22, cy + 8, 44, 18, VIOLET, 1)
    d.arrow([(cx - 26, cy - 18), (cx - 8, cy + 8)], GREEN[0], 1)
    d.arrow([(cx + 26, cy - 18), (cx + 8, cy + 8)], ORANGE[0], 1)
    d.rect(cx + 32, cy + 8, 36, 18, ORANGE, 1, style='dashed')
    d.arrow([(cx + 40, cy - 18), (cx + 50, cy + 8)], RED[0], 1)
    d.text(cx + 50, cy - 10, 'write', 9, RED[0], 'left', lh=1.2)
    d.ctext(cx, cy + 46, 'one frame until written', 9, NOTE, lh=1.2)


def pic_funnel(d, cx, cy, col):
    for i, dx in enumerate((-30, -10, 10, 30)):
        d.arrow([(cx + dx, cy - 48), (cx + dx * 0.6, cy - 22)], TEAL[0], 1)
    d.line([(cx - 40, cy - 20), (cx + 40, cy - 20), (cx + 8, cy + 12), (cx - 8, cy + 12), (cx - 40, cy - 20)], TEAL[0], 2)
    d.ctext(cx, cy - 8, 'schedule()', 8, TEAL[0], lh=1.2)
    d.arrow([(cx, cy + 12), (cx, cy + 28)], TEAL[0], 2)
    pill(d, cx, cy + 40, 44, 20, 'CPU', GREEN, 10)


def pic_states(d, cx, cy, col):
    d.ellipse(cx - 24, cy - 46, 48, 26, BLUE, 1)
    d.ctext(cx, cy - 33, 'ready', 9, BLUE[0], lh=1.2)
    d.ellipse(cx + 12, cy + 2, 48, 26, GREEN, 1)
    d.ctext(cx + 36, cy + 15, 'running', 9, GREEN[0], lh=1.2)
    d.ellipse(cx - 60, cy + 2, 48, 26, RED, 1)
    d.ctext(cx - 36, cy + 15, 'blocked', 9, RED[0], lh=1.2)
    d.arrow([(cx + 14, cy - 36), (cx + 36, cy)], TEAL[0], 1)
    d.arrow([(cx + 14, cy + 20), (cx - 14, cy + 20)], TEAL[0], 1)
    d.arrow([(cx - 36, cy), (cx - 12, cy - 36)], TEAL[0], 1)
    d.ctext(cx, cy + 44, 'where is a thread?', 9, NOTE, lh=1.2)


def pic_switch(d, cx, cy, col):
    pill(d, cx - 34, cy - 24, 32, 22, 'T1', RED, 11)
    pill(d, cx + 34, cy - 24, 32, 22, 'T2', GREEN, 11)
    pill(d, cx, cy + 24, 46, 24, 'CPU', GRAY, 10)
    d.arrow([(cx - 12, cy + 12), (cx - 30, cy - 10)], RED[0], 2)
    d.arrow([(cx + 30, cy - 10), (cx + 12, cy + 12)], GREEN[0], 2)
    d.text(cx - 52, cy - 2, 'out', 9, RED[0], 'left', lh=1.2)
    d.text(cx + 36, cy - 2, 'in', 9, GREEN[0], 'left', lh=1.2)
    d.ctext(cx, cy + 48, 'save IP, SP; load IP, SP', 9, NOTE, lh=1.2)


def pic_leave(d, cx, cy, col):
    pill(d, cx - 24, cy - 28, 42, 20, 'blocks', RED, 9)
    pill(d, cx + 24, cy - 28, 42, 20, 'yields', BLUE, 9)
    pill(d, cx - 24, cy - 2, 42, 20, 'bumped', VIOLET, 9)
    pill(d, cx + 24, cy - 2, 42, 20, 'slice up', ORANGE, 9)
    d.ctext(cx, cy + 22, 'top: by choice', 9, NOTE, lh=1.2)
    d.ctext(cx, cy + 36, 'bottom: forced', 9, NOTE, lh=1.2)


def pic_queue(d, cx, cy, col):
    for i in range(4):
        d.rect(cx - 56 + i * 20, cy - 12, 16, 22, VIOLET, 1)
    d.arrow([(cx + 26, cy - 1), (cx + 40, cy - 1)], VIOLET[0], 2)
    pill(d, cx + 54, cy - 1, 28, 22, 'CPU', GREEN, 9)
    d.ctext(cx - 16, cy - 28, 'ready queue', 9, VIOLET[0], lh=1.2)
    d.ctext(cx, cy + 30, 'load average:', 9, NOTE, lh=1.2)
    d.ctext(cx, cy + 44, 'running + ready', 9, NOTE, lh=1.2)


def pic_cost(d, cx, cy, col):
    d.text(cx - 50, cy - 46, 'from disk:', 9, RED[0], 'left', lh=1.2)
    d.rect(cx - 50, cy - 32, 100, 14, RED, 1)
    d.ctext(cx, cy - 25, '26,865 switches', 8, RED[0], lh=1.2)
    d.text(cx - 50, cy - 12, 'from the cache:', 9, GREEN[0], 'left', lh=1.2)
    d.rect(cx - 50, cy + 2, 6, 14, GREEN, 1)
    d.text(cx - 40, cy + 3, '1 switch', 9, GREEN[0], 'left', lh=1.2)
    d.ellipse(cx + 20, cy + 20, 26, 26, GRAY, 1)
    d.line([(cx + 33, cy + 33), (cx + 33, cy + 24)], NOTE, 1.5)
    d.line([(cx + 33, cy + 33), (cx + 39, cy + 36)], NOTE, 1.5)
    d.text(cx - 50, cy + 26, 'each one\ntakes time', 8, NOTE, 'left', lh=1.2)


def pic_knobs(d, cx, cy, col):
    d.line([(cx - 48, cy + 6), (cx + 48, cy + 6)], YELLOW[0], 2)
    d.ellipse(cx - 20, cy - 4, 20, 20, YELLOW, 2)
    d.text(cx - 50, cy + 12, '-20', 9, YELLOW[0], 'left', lh=1.2)
    d.text(cx + 32, cy + 12, '+19', 9, YELLOW[0], 'left', lh=1.2)
    d.ctext(cx, cy - 22, 'nice', 10, YELLOW[0], lh=1.2)
    pill(d, cx - 24, cy - 44, 38, 18, 'I/O', TEAL, 9)
    pill(d, cx + 24, cy - 44, 38, 18, 'CPU', ORANGE, 9)
    d.ctext(cx, cy + 40, 'priority + time slice', 9, NOTE, lh=1.2)


def pic_scale(d, cx, cy, col):
    d.line([(cx, cy + 36), (cx, cy - 20)], NOTE, 2)
    d.line([(cx - 18, cy + 36), (cx + 18, cy + 36)], NOTE, 2)
    d.line([(cx - 40, cy - 14), (cx + 40, cy - 26)], NOTE, 2)
    d.line([(cx - 40, cy - 14), (cx - 40, cy + 6)], NOTE, 1)
    d.line([(cx + 40, cy - 26), (cx + 40, cy - 6)], NOTE, 1)
    d.line([(cx - 52, cy + 6), (cx - 28, cy + 6), (cx - 34, cy + 16), (cx - 46, cy + 16), (cx - 52, cy + 6)], GRAPE[0], 1)
    d.line([(cx + 28, cy - 6), (cx + 52, cy - 6), (cx + 46, cy + 4), (cx + 34, cy + 4), (cx + 28, cy - 6)], GRAPE[0], 1)
    d.ctext(cx - 40, cy + 26, 'fair', 9, GRAPE[0], lh=1.2)
    d.ctext(cx + 40, cy + 14, 'fast', 9, GRAPE[0], lh=1.2)
    d.ctext(cx, cy + 50, 'the time slice', 9, NOTE, lh=1.2)


def pic_flag(d, cx, cy, col):
    d.line([(cx - 14, cy + 40), (cx - 14, cy - 40)], NOTE, 3)
    d.line([(cx - 14, cy - 40), (cx + 36, cy - 28), (cx - 14, cy - 10), (cx - 14, cy - 40)], RED[0], 2)
    d.els[-1]['backgroundColor'] = RED[1]


# ------------------------------------------------------------------ figures
def process_times():
    d = Draw()
    d.text(40, 20, 'Where a process\'s time goes', 26, INK, lh=1.25)
    d.text(40, 64, 'one browser process, read 3 days after it was started', 13, NOTE)
    # the bar: 880 px for 262,379 s of elapsed time
    X, Y, W, H = 40, 100, 880, 56
    d.rect(X, Y, W, H, GRAY, 2, rounded=False)
    user = W * 6172.63 / 262379; sys_ = W * 1638.40 / 262379
    d.rect(X, Y, user, H, GREEN, 2, rounded=False)
    d.rect(X + user, Y, sys_, H, RED, 2, rounded=False)
    d.ctext(X + W / 2 + 40, Y + H / 2, 'not on a CPU: blocked or ready -- 2 days, 22 hours (97%)', 13, NOTE)
    d.arrow([(X + 10, Y + 100), (X + 10, Y + H + 4)], GREEN[0], 2)
    d.text(X + 40, Y + 84, 'user time: 1 h 43 min (2.4%)', 13, GREEN[0])
    d.arrow([(X + user + 3, Y + 150), (X + user + 3, Y + H + 4)], RED[0], 2)
    d.text(X + 40, Y + 134, 'system time: 27 min (0.6%)', 13, RED[0])
    d.text(X + 400, Y + 110, 'elapsed (wall-clock) time: 3 days, 0 hours, 52 minutes', 13, NOTE)
    d.text(40, 300, 'elapsed = user + system + time spent waiting.  For almost every process, the last term is nearly all of it.', 14, INK)
    d.text(40, 324, 'This lecture is about that term: where a thread is when it is not on a CPU, and who decides when it gets back on.', 14, INK)
    return d


def cpu_scheduling():
    d = Draw()
    d.text(40, 20, 'The scheduler is a function', 26, INK, lh=1.25)
    d.text(60, 72, 'thousands of threads, each one a TCB, each one wanting a CPU', 13, RED[0])
    xs = [60, 180, 300, 420, 620]
    for i, x in enumerate(xs):
        d.box(x, 100, 90, 54, f'TCB{i + 1}' if i < 4 else 'TCBn', RED)
    d.ctext(565, 127, '...', 20, RED[0])
    # scheduler
    SX, SY, SW, SH = 300, 270, 300, 90
    d.box(SX, SY, SW, SH, 'CPU scheduler\nschedule()', BLUE, 14)
    for i, x in enumerate(xs):
        d.arrow([(x + 45, 154), (SX + 40 + i * 55, SY)], RED[0], 1)
    d.text(740, 100, 'each TCB carries what its thread\nhas been doing: time run, time\nwaited, and its priority', 12, RED[0])
    # trigger
    d.arrow([(110, 315), (SX, 315)], INK, 2)
    d.text(60, 290, 'trigger', 14, INK)
    d.text(60, 334, 'the running thread blocked,\nyielded, used up its time slice,\nor a higher-priority thread woke up', 11, NOTE)
    # output
    d.text(640, 280, 'the output:\none thread per CPU, and for how long', 12, BLUE[0])
    cy = 440
    for i, x in enumerate((100, 300, 500, 700)):
        d.box(x, cy, 110, 60, f'CPU{i}', GREEN)
        d.arrow([(SX + 60 + i * 60, SY + SH), (x + 55, cy)], BLUE[0], 1.5)
    d.text(850, 455, '#threads >> #CPUs', 14, INK)
    d.text(40, 560, 'The scheduler is a function the kernel calls: given every thread and what it has been doing, it picks one per CPU.', 14, INK)
    d.text(40, 584, 'It is called thousands of times a second, each time something changes: a thread blocks, wakes up, or runs out of time.', 14, INK)
    return d


def thread_states():
    d = Draw()
    d.text(40, 20, 'The three states of a thread', 26, INK, lh=1.25)
    d.obox(60, 180, 280, 120, 'READY\nhas everything it needs,\nwaiting for a CPU', BLUE, 13)
    d.obox(660, 180, 280, 120, 'RUNNING\non a CPU, right now', GREEN, 13)
    d.obox(360, 440, 280, 120, 'BLOCKED\nwaiting for an event:\ninput, disk, a child, a timer', RED, 13)
    d.arrow([(344, 212), (656, 212)], GREEN[0], 2)
    d.ctext(500, 186, 'scheduled: a CPU is free, and this thread is picked', 12, GREEN[0])
    d.arrow([(656, 268), (344, 268)], BLUE[0], 2)
    d.ctext(500, 284, 'preempted: time slice over, a higher-priority thread woke up, or it yielded', 12, BLUE[0])
    d.arrow([(760, 302), (570, 440)], RED[0], 2)
    d.text(700, 360, 'blocking call:\nread(), write(), sleep(),\nwait(), pthread_join(), ...', 12, RED[0])
    d.arrow([(430, 440), (240, 302)], BLUE[0], 2)
    d.text(60, 360, 'the event happened:\ndata arrived, the child ended,\nthe timer expired', 12, BLUE[0], 'left')
    d.text(60, 70, 'RUNNING: at most one thread per CPU', 12, GREEN[0])
    d.text(60, 90, 'READY: any number, queued up for a CPU', 12, BLUE[0])
    d.text(60, 110, 'BLOCKED: any number, each in the wait queue of its event', 12, RED[0])
    d.text(600, 70, 'ps shows R for ready or running,\nS for blocked (sleeping), D for blocked on I/O', 12, NOTE)
    d.text(40, 600, 'A thread is always in exactly one of the three. Most threads, most of the time, are blocked: that is why 4,614 threads fit on 24 CPUs.', 14, INK)
    return d


def context_switch():
    d = Draw()
    d.text(40, 20, 'A context switch', 26, INK, lh=1.25)
    d.text(130, 70, 'before', 14, NOTE)
    d.box(90, 100, 120, 64, 'TCB1\nRUNNING', GREEN)
    d.box(270, 100, 120, 64, 'TCB2\nREADY', BLUE)
    d.box(90, 240, 120, 64, 'CPU', GRAY)
    d.arrow([(150, 164), (150, 240)], GREEN[0], 2)
    d.text(680, 70, 'after', 14, NOTE)
    d.box(640, 100, 120, 64, 'TCB2\nRUNNING', GREEN)
    d.box(820, 100, 120, 64, 'TCB1\nREADY or\nBLOCKED', BLUE, 12)
    d.box(640, 240, 120, 64, 'CPU', GRAY)
    d.arrow([(700, 164), (700, 240)], GREEN[0], 2)
    d.arrow([(430, 200), (600, 200)], INK, 3)
    d.ctext(515, 170, 'context switch', 16, INK)
    d.ctext(515, 236, 'save TCB1\'s IP, SP and registers\nload TCB2\'s IP, SP and registers\nswitch page tables if needed', 11, NOTE)
    d.text(60, 340, 'why the running thread leaves the CPU', 14, INK)
    d.text(60, 368, '1.  it calls something that blocks: read(), write(), sleep(), wait(), pthread_join()', 12, RED[0])
    d.text(60, 390, '2.  it gives the CPU up: sched_yield()', 12, BLUE[0])
    d.text(60, 412, '3.  a thread with a higher priority became ready', 12, VIOLET[0])
    d.text(60, 434, '4.  its time slice expired', 12, ORANGE[0])
    d.text(620, 368, '--> BLOCKED', 12, RED[0])
    d.text(620, 390, '--> READY', 12, BLUE[0])
    d.text(620, 412, '--> READY', 12, VIOLET[0])
    d.text(620, 434, '--> READY', 12, ORANGE[0])
    d.text(60, 464, '1 and 2 are voluntary: the thread asked for it.   3 and 4 are involuntary: the kernel took the CPU away.', 12, NOTE)
    d.text(40, 530, 'Not a domain switch: a system call takes the same thread from user mode into the kernel and back; nobody else runs.', 14, INK)
    d.text(40, 554, 'A context switch swaps the thread on the CPU; the kernel does it, so it starts with a domain switch.', 14, INK)
    return d


def queues_and_load():
    d = Draw()
    d.text(40, 20, 'Where a thread waits', 26, INK, lh=1.25)
    d.text(60, 76, 'the ready queue: threads that could run now', 13, BLUE[0])
    for i, lbl in enumerate(('T7', 'T3', 'T9', 'T1', 'T5')):
        d.box(60 + i * 64, 100, 54, 40, lbl, BLUE, 12)
    d.arrow([(392, 120), (550, 120)], BLUE[0], 2)
    d.ctext(470, 100, 'schedule()', 10, BLUE[0])
    for i in range(4):
        d.box(560, 70 + i * 50, 120, 40, f'CPU{i}: T{(2, 4, 6, 8)[i]} running', GREEN, 11)
    d.arrow([(620, 262), (620, 310), (360, 310), (360, 150)], BLUE[0], 1.5, style='dashed')
    d.text(372, 290, 'preempted: back in line', 10, BLUE[0])
    d.text(60, 330, 'the wait queues: one per event, threads that cannot run yet', 13, RED[0])
    rows = [('disk read', 3), ('network packet', 2), ('keyboard input', 1), ('timer (sleep)', 4), ('child exit (wait)', 2)]
    for r, (lbl, n) in enumerate(rows):
        y = 360 + r * 44
        d.text(60, y + 8, lbl, 12, RED[0])
        for i in range(n):
            d.rect(220 + i * 44, y, 36, 30, RED, 1.5)
    d.arrow([(410, 375), (470, 375), (470, 220), (300, 220), (300, 150)], RED[0], 1.5, style='dashed')
    d.text(480, 226, 'the event happened:', 10, RED[0])
    d.text(480, 240, 'back to the ready queue', 10, RED[0])
    d.rect(660, 340, 300, 190, YELLOW, 2)
    d.text(680, 356, 'load average', 14, YELLOW[0])
    d.text(680, 384, 'the number of threads running\nor ready, averaged over\n1, 5 and 15 minutes', 12, YELLOW[0])
    d.text(680, 444, '4.00 on 4 CPUs: all busy, nobody waits\n10.3 on 4 CPUs: six threads waiting\n0.6 on 24 CPUs: nearly idle', 11, NOTE)
    d.text(40, 590, 'A ready thread waits for a CPU; a blocked thread waits for an event, and only then joins the ready queue.', 14, INK)
    d.text(40, 614, 'Time in the ready queue is pure waiting, and it grows with the number of threads that want to run.', 14, INK)
    return d


def scheduling_tunables():
    d = Draw()
    d.text(40, 20, 'What the scheduler is given, and what it decides', 26, INK, lh=1.25)
    SX, SY, SW, SH = 370, 230, 260, 110
    d.box(SX, SY, SW, SH, 'CPU scheduler\nschedule()', BLUE, 14)
    # inputs
    d.text(60, 90, 'thread behaviour, measured', 13, TEAL[0])
    d.text(60, 110, 'I/O-bound: short bursts, blocks often\nCPU-bound: uses every slice to the end', 11, NOTE)
    d.arrow([(310, 120), (SX, SY + 20)], TEAL[0], 2)
    d.text(60, 250, 'niceness, set by the user or admin', 13, YELLOW[0])
    d.text(60, 270, 'nice -20 (greedy) ... 0 ... +19 (nice)\nstatic: it does not change on its own', 11, NOTE)
    d.arrow([(310, 275), (SX, SY + 55)], YELLOW[0], 2)
    d.text(60, 400, 'the trigger', 13, INK)
    d.text(60, 420, 'slice expired, thread blocked or yielded,\na higher-priority thread woke up', 11, NOTE)
    d.arrow([(310, 420), (SX, SY + 90)], INK, 2)
    # outputs
    d.arrow([(SX + SW, SY + 20), (690, 120)], GREEN[0], 2)
    d.text(700, 100, 'which thread runs next, on which CPU', 13, GREEN[0])
    d.arrow([(SX + SW, SY + 55), (690, 275)], GREEN[0], 2)
    d.text(700, 255, 'its time slice: how long before it is\nasked to leave', 13, GREEN[0])
    d.arrow([(SX + SW, SY + 90), (690, 420)], GREEN[0], 2)
    d.text(700, 400, 'updated priorities (dynamic):\nthreads that block often go up,\nthreads that hog the CPU go down', 13, GREEN[0])
    d.rect(60, 520, 400, 70, TEAL, 2)
    d.ctext(260, 555, 'small time slice: fast turn-taking, responsive,\nbut many context switches -- interactivity', 12, TEAL[0])
    d.rect(540, 520, 400, 70, ORANGE, 2)
    d.ctext(740, 555, 'large time slice: fewer switches, more work\nper second, but a longer wait in line -- throughput', 12, ORANGE[0])
    d.ctext(500, 500, 'one knob, two goals', 14, INK)
    d.text(40, 630, 'The inputs are what the threads do and what the admin asks for; the outputs are who runs, for how long, and with what priority.', 14, INK)
    return d


base = OUT
storyline().save(f'{base}/00-pitch/storyline.excalidraw')
process_times().save(f'{base}/00-pitch/process-times.excalidraw')
cpu_scheduling().save(f'{base}/03-scheduling-overview/cpu-scheduling.excalidraw')
thread_states().save(f'{base}/04-thread-states/thread-states.excalidraw')
context_switch().save(f'{base}/05-context-switch/context-switch.excalidraw')
queues_and_load().save(f'{base}/06-state-transitions/queues-and-load.excalidraw')
scheduling_tunables().save(f'{base}/07-nuts-and-bolts/scheduling-tunables.excalidraw')
