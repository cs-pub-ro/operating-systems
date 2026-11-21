#!/usr/bin/env python3
"""Build the lecture 09 figures: the storyline and the eleven content figures.

    ./build_media09.py            # into content/lectures/09-io-interface-*/media
    ./build_media09.py out-dir    # somewhere else, to look before overwriting

Each figure is written as an .excalidraw file with its SVG beside it.  With no
argument, both files are also copied into the -live half, so that each half
carries its figures and their sources.
"""
import os
import shutil
import sys

from exlib import *

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
FULL = os.path.join(ROOT, 'content', 'lectures', '09-io-interface-full', 'media')
LIVE = os.path.join(ROOT, 'content', 'lectures', '09-io-interface-live', 'media')
OUT = sys.argv[1] if len(sys.argv) > 1 else FULL


def tcircle(f, cx, cy, label, color, r=13, size=10):
    f.circle(cx, cy, r, color, sw=1)
    f.ctext(cx, cy, label, size, color)


def disk(f, cx, cy, w, h, color, label=None, size=11):
    """A disk: a cylinder centred on (cx, cy)."""
    e = h * 0.28
    f.rect(cx - w / 2, cy - h / 2 + e / 2, w, h - e, color, sw=1, round=False)
    f.ellipse(cx - w / 2, cy + h / 2 - e, w, e, color, sw=1)
    f.ellipse(cx - w / 2, cy - h / 2, w, e, color, sw=1)
    if label:
        f.ctext(cx, cy + e / 4, label, size, color)


def strip(f, x, y, w, h, color, parts=None):
    """A file as a row of bytes: parts are (from, to, colour or None) in 0..1."""
    f.rect(x, y, w, h, GRAY[0], bg='#ffffff', sw=1, round=False)
    for a, b, c in parts or [(0, 1, color)]:
        if c is None:
            f.rect(x + a * w, y, (b - a) * w, h, GRAY[0], bg='#ffffff', sw=1, style='dashed', round=False)
        else:
            f.rect(x + a * w, y, (b - a) * w, h, c, sw=1, round=False)


def pointer(f, x, y, label, color, size=12, up=False):
    """The file pointer: an arrow that ends at (x, y), with a label behind it."""
    if up:
        f.arrow([(x, y + 34), (x, y + 4)], color, sw=2)
        f.text(x, y + 38, label, size, color, 'center')
    else:
        f.arrow([(x, y - 34), (x, y - 4)], color, sw=2)
        f.text(x, y - 38 - size * 1.25, label, size, color, 'center')


# ----------------------------------------------------------------------------
# The storyline
# ----------------------------------------------------------------------------

def p_hook(f, cx, cy, c):
    for i, (w, col) in enumerate([(5, GREEN), (9, BLUE), (26, VIOLET), (108, RED)]):
        f.rect(cx - 54, cy - 40 + i * 17, w, 12, col, sw=1, round=False)
    f.text(cx + 54, cy - 44, '1 MB,', 10, GRAY, 'right')
    f.text(cx + 54, cy - 30, '4 ways', 10, GRAY, 'right')
    f.ctext(cx, cy + 44, '0.3 ms ... 10 s', 11, c)


def p_inside(f, cx, cy, c):
    f.box(cx - 30, cy - 26, 60, 44, 'process', BLUE, 11, sw=2)
    f.arrow([(cx - 64, cy - 4), (cx - 34, cy - 4)], GREEN, sw=2)
    f.arrow([(cx + 34, cy - 4), (cx + 64, cy - 4)], ORANGE, sw=2)
    f.ctext(cx - 48, cy - 20, 'in', 10, GREEN)
    f.ctext(cx + 50, cy - 20, 'out', 10, ORANGE)
    f.ctext(cx, cy + 40, 'CPU and memory', 10, GRAY)
    f.ctext(cx, cy + 54, 'are not enough', 10, GRAY)


def p_channel(f, cx, cy, c):
    tcircle(f, cx - 44, cy - 6, 'P', BLUE, 15, 12)
    f.rect(cx + 28, cy - 22, 30, 32, GRAY, sw=1)
    f.ctext(cx + 43, cy - 6, '?', 14, GRAY)
    f.line([(cx - 28, cy - 12), (cx + 26, cy - 12)], c, sw=2)
    f.line([(cx - 28, cy), (cx + 26, cy)], c, sw=2)
    f.ctext(cx, cy - 30, 'I/O channel', 10, c)
    f.ctext(cx, cy + 34, 'read, write', 11, GRAY)


def p_families(f, cx, cy, c):
    tcircle(f, cx - 44, cy - 28, 'P', BLUE, 12)
    f.arrow([(cx - 30, cy - 28), (cx + 20, cy - 28)], TEAL, sw=2, start='arrow')
    disk(f, cx + 40, cy - 28, 30, 26, TEAL)
    f.ctext(cx, cy - 46, 'file-like', 10, TEAL)
    tcircle(f, cx - 44, cy + 22, 'P', BLUE, 12)
    f.arrow([(cx - 30, cy + 22), (cx + 26, cy + 22)], GRAPE, sw=2, start='arrow')
    tcircle(f, cx + 40, cy + 22, 'P', ORANGE, 12)
    f.ctext(cx, cy + 4, 'socket-like', 10, GRAPE)
    f.ctext(cx, cy + 52, 'device, or process', 10, GRAY)


def p_interface(f, cx, cy, c):
    for i, name in enumerate(['open', 'read', 'write', 'close']):
        f.box(cx - 34, cy - 52 + i * 26, 68, 21, name, c, 11, sw=1)


def p_handle(f, cx, cy, c):
    f.ctext(cx, cy - 34, 'fd = open(...)', 11, GRAY)
    f.box(cx - 30, cy - 18, 60, 48, '3', c, 34, sw=2)
    f.ctext(cx, cy + 48, 'just a number', 10, GRAY)


def p_table(f, cx, cy, c):
    for i in range(5):
        y = cy - 52 + i * 20
        f.rect(cx - 50, y, 34, 20, c, sw=1, round=False)
        f.ctext(cx - 33, y + 10, str(i), 11, c)
    for i, col in [(0, GRAY), (3, ORANGE)]:
        y = cy - 42 + i * 20
        f.arrow([(cx - 14, y), (cx + 18, y)], col, sw=1)
        f.rect(cx + 20, y - 9, 34, 18, col, sw=1)
    f.ctext(cx + 14, cy + 40, 'NULL', 9, GRAY)
    f.ctext(cx, cy + 58, 'one per process', 10, GRAY)


def p_find(f, cx, cy, c):
    f.box(cx - 52, cy - 46, 104, 24, 'a path:  /tmp/f', TEAL, 11, sw=1)
    f.box(cx - 52, cy - 14, 104, 24, 'a port:  :4242', VIOLET, 11, sw=1)
    f.box(cx - 52, cy + 18, 104, 24, 'inheritance', ORANGE, 11, sw=1)
    f.ctext(cx, cy + 56, 'how the ends meet', 10, GRAY)


def p_inside_channel(f, cx, cy, c):
    f.rect(cx - 50, cy - 50, 100, 86, c, sw=2)
    for i, name in enumerate(['permissions', 'file pointer', 'ref. count', '-> the file']):
        f.text(cx - 40, cy - 44 + i * 20, name, 11, c)
    f.ctext(cx, cy + 50, 'one per open()', 10, GRAY)


def p_bytes(f, cx, cy, c):
    for i in range(6):
        f.rect(cx - 54 + i * 18, cy - 8, 18, 22, c, sw=1, round=False)
    f.text(cx - 54, cy + 20, '0', 10, GRAY)
    f.text(cx + 54, cy + 20, 'size', 10, GRAY, 'right')
    f.arrow([(cx - 2, cy - 40), (cx - 2, cy - 12)], RED, sw=2)
    f.ctext(cx - 2, cy - 50, 'pointer', 10, RED)
    f.ctext(cx, cy + 50, 'a row of bytes', 10, GRAY)


def p_ops(f, cx, cy, c):
    f.rect(cx - 54, cy - 30, 36, 20, c, sw=1, round=False)
    f.rect(cx - 18, cy - 30, 48, 20, GRAY[0], sw=1, style='dashed', round=False)
    f.rect(cx + 30, cy - 30, 24, 20, c, sw=1, round=False)
    f.ctext(cx + 6, cy - 20, 'hole', 9, GRAY)
    f.arrow([(cx - 40, cy - 46), (cx + 40, cy - 46)], RED, sw=1)
    f.ctext(cx, cy - 56, 'seek', 9, RED)
    f.ctext(cx, cy + 14, 'read  write', 11, c)
    f.ctext(cx, cy + 32, 'seek  truncate', 11, c)
    f.ctext(cx, cy + 54, 'size is not space', 10, GRAY)


def p_flag(f, cx, cy, c):
    f.line([(cx - 20, cy - 50), (cx - 20, cy + 50)], GRAY, sw=3)
    f.poly([(cx - 20, cy - 48), (cx + 40, cy - 30), (cx - 20, cy - 10)], c)
    f.ctext(cx + 16, cy + 14, 'a number,', 11, c)
    f.ctext(cx + 16, cy + 30, 'a table,', 11, c)
    f.ctext(cx + 16, cy + 46, 'a channel', 11, c)


STATIONS = [
    ('THE HOOK', 'one megabyte, from 0.3 ms to 10 s', ORANGE, p_hook),
    ('INSIDE AND OUTSIDE', 'a process computes inside, and needs the rest', BLUE, p_inside),
    ('CHANNELS', 'every byte crosses on an I/O channel', GREEN, p_channel),
    ('TWO FAMILIES', 'to a device, or to another process', TEAL, p_families),
    ('ONE INTERFACE', 'the same few calls, whatever is at the other end', VIOLET, p_interface),
    ('THE HANDLE', 'a file descriptor is a small number', ORANGE, p_handle),
    ('THE TABLE', 'the number is an index, the kernel has the rest', BLUE, p_table),
    ('MEETING POINTS', 'a path, a port, or a parent', TEAL, p_find),
    ('INSIDE A CHANNEL', 'what open() creates, and close() lets go', GRAPE, p_inside_channel),
    ('A FILE, SEEN FROM HERE', 'bytes, a size, and a pointer', GREEN, p_bytes),
    ('MOVING THE NUMBERS', 'each call changes the pointer, the size, or both', RED, p_ops),
    ('THE TAKEAWAY', 'a number, a table, a channel', ORANGE, p_flag),
]


def storyline():
    f = Fig('storyline-09')
    cxs = [170, 510, 850, 1190]
    cys = [200, 570, 940]
    R = 80
    f.text(680, 10, 'The I/O interface -- the story', 34, INK, 'center')
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


# ----------------------------------------------------------------------------
# 00. Pitch
# ----------------------------------------------------------------------------

def four_writes():
    f = Fig('four-writes')
    f.text(40, 20, 'One megabyte, written four ways', 26)
    f.text(40, 62, '2,048 records of 512 bytes, to the same file on the same disk. '
           'How far has a record gone when the call returns?', 14, GRAY)
    xs = [330, 490, 660, 830, 990]
    names = ['your buffer', "the C library's\nbuffer", "the kernel's\nbuffer cache", 'the disk', 'the disk,\nconfirmed']
    cols = [GRAY, GREEN, BLUE, VIOLET, RED]
    for x, name, c in zip(xs, names, cols):
        f.box(x - 70, 104, 140, 54, name, c, 13, sw=2)
    f.line([(575, 96), (575, 420)], GRAY, sw=1, style='dashed')
    f.text(565, 170, 'user space', 12, GRAY, 'right')
    f.text(585, 170, 'kernel', 12, GRAY)
    f.line([(745, 96), (745, 420)], GRAY, sw=1, style='dashed')
    f.text(755, 170, 'hardware', 12, GRAY)
    rows = [
        ('fwrite()', 1, GREEN, '0.3 ms', '8 records for a system call'),
        ('write()', 2, BLUE, '0.8 ms', 'a system call for each record'),
        ('write(), O_DIRECT', 3, VIOLET, '40 ms', 'past the cache, to the disk'),
        ('write(), O_DIRECT | O_SYNC', 4, RED, '10,500 ms', 'and wait for the disk to confirm'),
    ]
    y = 204
    for name, stop, c, t, note in rows:
        f.text(40, y, name, 15, c)
        f.arrow([(330, y + 30), (xs[stop] - 4, y + 30)], c, sw=3)
        f.circle(330, y + 30, 5, c[0], bg=c[0], sw=1)
        f.text(xs[stop] + 10, y + 6, t, 17, c)
        f.text(40, y + 22, note, 12, GRAY)
        y += 56
    f.rect(40, 440, 1050, 62, YELLOW, sw=1)
    f.text(60, 450, 'The same bytes, the same file, the same disk: 35,000 times between the fastest and the slowest.', 15)
    f.text(60, 474, 'Nothing in the loop changed. What changed is where the data is when the program is told "done".', 15)
    f.save(OUT + '/00-pitch/four-writes')


# ----------------------------------------------------------------------------
# 01. Processes and the outside world
# ----------------------------------------------------------------------------

def process_outside():
    f = Fig('process-outside')
    f.text(40, 20, 'A process and the outside world', 26)
    # the process
    f.rect(360, 110, 300, 300, BLUE, sw=2)
    f.text(510, 120, 'PROCESS', 18, BLUE, 'center')
    f.box(390, 170, 240, 70, 'virtual address space\ncode, data, heap, stacks', GREEN, 13, sw=1)
    for i in range(3):
        tcircle(f, 430 + i * 80, 290, 'T%d' % (i + 1), ORANGE, 22, 13)
    f.text(510, 326, 'threads', 12, ORANGE, 'center')
    f.text(510, 360, 'compute: CPU + memory', 14, GRAY, 'center')
    f.text(510, 382, 'lectures 03 to 08', 12, GRAY, 'center')
    # devices, on the right
    f.text(880, 96, 'devices', 16, TEAL, 'center')
    disk(f, 880, 160, 90, 56, TEAL, 'disk', 13)
    f.box(835, 220, 90, 44, 'terminal', TEAL, 13, sw=1)
    f.box(835, 284, 90, 44, 'network', TEAL, 13, sw=1)
    f.box(835, 348, 90, 44, 'camera', TEAL, 13, sw=1)
    for y in [160, 242, 306, 370]:
        f.arrow([(664, y), (830, y)], TEAL, sw=2, start='arrow')
    f.text(748, 136, 'I/O channel', 12, TEAL, 'center')
    # processes, on the left
    f.text(140, 96, 'other processes', 16, GRAPE, 'center')
    for i, y in enumerate([170, 260, 350]):
        tcircle(f, 140, y, 'P%d' % (i + 1), GRAPE, 30, 15)
        f.arrow([(174, y), (356, y)], GRAPE, sw=2, start='arrow')
    f.text(266, 146, 'I/O channel', 12, GRAPE, 'center')
    f.text(266, 276, 'send / receive', 12, GRAY, 'center')
    f.text(748, 258, 'read / write', 12, GRAY, 'center')
    f.rect(40, 440, 990, 62, YELLOW, sw=1)
    f.text(60, 450, 'Inside: threads and an address space, which is all a process needs to compute.', 15)
    f.text(60, 474, 'Outside: everything it computes on and for. Every byte that crosses does so on an I/O channel.', 15)
    f.save(OUT + '/01-process-outside/process-outside')


def two_families():
    f = Fig('two-families')
    f.text(40, 20, 'Two families of I/O channels', 26)
    panel(f, 40, 80, 480, 400, 'FILE-LIKE', TEAL, 'the other end is a device, with data that stays')
    tcircle(f, 120, 200, 'P', BLUE, 30, 16)
    f.arrow([(154, 200), (366, 200)], TEAL, sw=3, start='arrow')
    f.text(260, 172, 'I/O channel', 13, TEAL, 'center')
    disk(f, 420, 200, 90, 70, TEAL, 'file', 14)
    f.text(60, 270, 'The data is there before and after the process.', 13)
    f.text(60, 294, 'It has a size, and any byte can be read again:', 13)
    f.text(60, 318, 'the channel keeps a position, and it can be moved.', 13)
    f.text(60, 342, 'A read gets what is there, or the end; it does not wait', 13)
    f.text(60, 366, 'for somebody to write.', 13)
    f.text(60, 410, 'a file on a disk, a block device, a directory', 13, TEAL)
    f.text(60, 440, 'this lecture, parts 05 and 06', 12, GRAY)

    panel(f, 550, 80, 480, 400, 'SOCKET-LIKE', GRAPE, 'the other end is a process, and data passes once')
    tcircle(f, 630, 200, 'P1', BLUE, 30, 16)
    f.arrow([(664, 200), (896, 200)], GRAPE, sw=3, start='arrow')
    f.text(780, 172, 'I/O channel', 13, GRAPE, 'center')
    tcircle(f, 930, 200, 'P2', ORANGE, 30, 16)
    f.text(570, 270, 'The data exists only between a write and a read.', 13)
    f.text(570, 294, 'No size, no position: what was read is gone,', 13)
    f.text(570, 318, 'and nothing can be read twice.', 13)
    f.text(570, 342, 'A read waits until the other end writes,', 13)
    f.text(570, 366, 'and ends when the other end closes.', 13)
    f.text(570, 410, 'a pipe, a FIFO, a Unix socket, a network socket', 13, GRAPE)
    f.text(570, 440, 'lectures 10 and 11', 12, GRAY)
    f.text(40, 500, 'A terminal sits in between: it is a device, and it behaves like the second family, because a person is at the other end.', 14, GRAY)
    f.save(OUT + '/01-process-outside/two-families')


# ----------------------------------------------------------------------------
# 02. The process I/O interface
# ----------------------------------------------------------------------------

def operations():
    f = Fig('operations')
    f.text(40, 20, 'The I/O interface: the life of a channel', 26)
    steps = [('CREATE', 'make the thing\nto connect to', GRAY), ('OPEN', 'make a channel\nto it', GREEN),
             ('USE', 'move data,\nask, control', BLUE), ('CLOSE', 'give up\nthe channel', ORANGE),
             ('DELETE', 'remove\nthe thing', GRAY)]
    xs = [150, 340, 590, 840, 1010]
    ws = [150, 150, 270, 150, 150]
    for (name, sub, c), x, w in zip(steps, xs, ws):
        f.rect(x - w / 2, 80, w, 86, c, sw=2)
        f.text(x, 88, name, 17, c, 'center')
        f.text(x, 116, sub, 12, c, 'center')
    for i in range(4):
        f.arrow([(xs[i] + ws[i] / 2 + 4, 123), (xs[i + 1] - ws[i + 1] / 2 - 4, 123)], INK, sw=2)
    rows = [
        ('a file', TEAL, ['open(O_CREAT)', 'open()', 'read()  write()  fstat()  lseek()', 'close()', 'unlink()']),
        ('a FIFO', VIOLET, ['mkfifo()', 'open()', 'read()  write()  fstat()', 'close()', 'unlink()']),
        ('a socket', GRAPE, ['socket()  bind()', 'connect()  accept()', 'recv()  send()  read()  write()', 'close()', '--']),
        ('a terminal', ORANGE, ['--', 'open(), or inherited', 'read()  write()  ioctl()', 'close()', '--']),
    ]
    y = 200
    for name, c, cells in rows:
        f.text(40, y + 8, name, 14, c)
        for cell, x, w in zip(cells, xs, ws):
            if cell == '--':
                f.ctext(x, y + 16, '--', 13, GRAY)
            else:
                f.box(x - w / 2 + (45 if x == 150 else 0), y, w - (45 if x == 150 else 0), 32, cell, c, 11, sw=1)
        y += 48
    f.arrow([(340, 410), (340, 440)], GREEN, sw=2)
    f.box(240, 444, 200, 40, 'returns a file descriptor', GREEN, 13, sw=2)
    f.arrow([(444, 464), (760, 464)], GREEN, sw=2)
    f.line([(590, 396), (590, 462)], GREEN, sw=1, style='dashed')
    f.line([(840, 396), (840, 462)], GREEN, sw=1, style='dashed')
    f.text(770, 454, 'which every later call takes', 13, GREEN)
    f.text(40, 506, 'Creating and deleting concern the thing at the other end; opening and closing concern the channel, and only the process that has it.', 14, GRAY)
    f.save(OUT + '/02-io-interface/operations')


# ----------------------------------------------------------------------------
# 03. The file descriptor table
# ----------------------------------------------------------------------------

def fd_table():
    f = Fig('fd-table')
    f.text(40, 20, 'The file descriptor table', 26)
    f.line([(330, 70), (330, 500)], GRAY, sw=1, style='dashed')
    f.text(318, 74, 'user mode', 13, GRAY, 'right')
    f.text(342, 74, 'kernel mode', 13, GRAY)
    f.line([(830, 70), (830, 500)], GRAY, sw=1, style='dashed')
    f.text(842, 74, 'outside the process', 13, GRAY)
    # the process
    f.rect(40, 130, 250, 250, BLUE, sw=2)
    f.text(165, 140, 'PROCESS', 16, BLUE, 'center')
    f.text(60, 184, 'fd = open("a.txt", ...);', 13)
    f.text(60, 210, '/* fd is 3 */', 13, GRAY)
    f.text(60, 248, 'read(fd, buf, 100);', 13)
    f.text(60, 274, 'write(1, buf, 100);', 13)
    f.text(60, 300, 'close(fd);', 13)
    f.text(60, 340, 'all it holds is a number', 12, GRAY)
    # the table
    f.text(440, 108, 'file descriptor table', 14, ORANGE, 'center')
    f.text(440, 128, 'one per process', 11, GRAY, 'center')
    ty, th = 150, 44
    entries = ['0', '1', '2', '3', '4', '5', '...']
    for i, e in enumerate(entries):
        f.rect(380, ty + i * th, 120, th, ORANGE, sw=1, round=False)
        f.text(392, ty + i * th + 13, e, 14, ORANGE)
    for i in [4, 6]:
        f.text(470, ty + i * th + 14, 'NULL', 12, GRAY, 'center')
    f.arrow([(294, 196), (376, ty + 3 * th + 22)], BLUE, sw=2)
    f.text(322, 176, 'index', 12, BLUE, 'right')
    # channels
    f.text(690, 108, 'I/O channels', 14, GREEN, 'center')
    f.text(690, 128, 'one per open()', 11, GRAY, 'center')
    ch = [(190, 'terminal, read + write'), (304, 'file a.txt, read'), (400, 'socket, read + write')]
    for y, label in ch:
        f.box(600, y - 24, 180, 48, label, GREEN, 12, sw=2)
    for i in [0, 1, 2]:
        f.arrow([(470, ty + i * th + 22), (596, 186 + i * 4)], ORANGE, sw=1)
    f.arrow([(470, ty + 3 * th + 22), (596, 304)], ORANGE, sw=1)
    f.arrow([(470, ty + 5 * th + 22), (596, 400)], ORANGE, sw=1)
    # outside
    f.box(900, 166, 110, 48, 'terminal', TEAL, 13, sw=1)
    disk(f, 955, 304, 90, 60, TEAL, 'a.txt', 13)
    tcircle(f, 955, 400, 'P2', GRAPE, 28, 14)
    for y in [190, 304, 400]:
        f.arrow([(784, y), (896, y)], GREEN, sw=2, start='arrow')
    f.text(380, 470, 'struct io_channel *fdt[1024];', 14, INK)
    f.text(380, 494, 'a file descriptor is an index in fdt', 13, GRAY)
    f.text(40, 410, '0: standard input', 12, GRAY)
    f.text(40, 430, '1: standard output', 12, GRAY)
    f.text(40, 450, '2: standard error', 12, GRAY)
    f.text(40, 478, 'three entries, one channel:', 12, GRAY)
    f.text(40, 496, 'the terminal was opened once', 12, GRAY)
    f.save(OUT + '/03-file-descriptor-table/fd-table')


# ----------------------------------------------------------------------------
# 04. Types of I/O channels
# ----------------------------------------------------------------------------

def channel_types():
    f = Fig('channel-types')
    f.text(40, 20, 'Five channels, and how the two ends meet', 26)
    heads = [(40, 'channel'), (230, 'the other end is'), (430, 'created with'), (640, 'found through'), (840, 'who can be at the other end')]
    for x, h in heads:
        f.text(x, 76, h, 13, GRAY)
    f.line([(40, 100), (1160, 100)], GRAY, sw=1)
    rows = [
        ('file', TEAL, 'a file on a device', 'open(O_CREAT)', ('a path', TEAL), 'nobody: the data stays there'),
        ('pipe', ORANGE, 'a process', 'pipe()', ('inheritance', ORANGE), 'a child, or a sibling'),
        ('FIFO', VIOLET, 'a process', 'mkfifo(), open()', ('a path', TEAL), 'any process on the machine'),
        ('Unix socket', GRAPE, 'a process', 'socket(), bind()', ('a path', TEAL), 'any process on the machine'),
        ('network socket', RED, 'a process', 'socket(), bind()', ('address + port', RED), 'any process, on any machine'),
    ]
    y = 118
    for name, c, other, made, (how, hc), who in rows:
        f.box(40, y, 160, 40, name, c, 15, sw=2)
        f.text(230, y + 11, other, 14)
        f.text(430, y + 11, made, 14)
        f.box(640, y + 4, 160, 32, how, hc, 13, sw=1)
        f.text(840, y + 11, who, 14)
        y += 58
    f.line([(40, 164), (1160, 164)], GRAY, sw=1, style='dashed')
    f.text(1160, 130, 'file-like', 13, TEAL, 'right')
    f.text(1160, 186, 'socket-like', 13, GRAPE, 'right')
    f.rect(40, 420, 1120, 62, YELLOW, sw=1)
    f.text(60, 430, 'A channel has two ends, and the second end has to find the first: by a name in the file system,', 15)
    f.text(60, 454, 'by a port number, or by being handed a file descriptor that is already open.', 15)
    f.save(OUT + '/04-channel-types/channel-types')


# ----------------------------------------------------------------------------
# 05. File channel internals
# ----------------------------------------------------------------------------

def channel_box(f, x, y, perm, ptr, count, color=GREEN, w=250):
    f.rect(x, y, w, 140, color, sw=2)
    f.text(x + w / 2, y + 8, 'file I/O channel', 14, color, 'center')
    f.text(x + 16, y + 36, 'open permissions', 12, GRAY)
    f.text(x + w - 16, y + 36, perm, 12, color, 'right')
    f.text(x + 16, y + 60, 'file pointer', 12, GRAY)
    f.text(x + w - 16, y + 60, ptr, 12, RED, 'right')
    f.text(x + 16, y + 84, 'reference count', 12, GRAY)
    f.text(x + w - 16, y + 84, count, 12, color, 'right')
    f.text(x + 16, y + 108, 'the file', 12, GRAY)


def open_file():
    f = Fig('open-file')
    f.text(40, 20, 'Inside a file I/O channel', 26)
    f.text(40, 62, 'fd = open("a.txt", O_RDONLY);  read(fd, buf, 768);', 15, INK)
    # table
    f.text(110, 110, 'file descriptor table', 13, ORANGE, 'center')
    for i, e in enumerate(['0', '1', '2', '3', '4']):
        f.rect(60, 134 + i * 40, 100, 40, ORANGE, sw=1, round=False)
        f.text(72, 134 + i * 40 + 11, e, 14, ORANGE)
    f.text(110, 344, 'per process', 12, GRAY, 'center')
    f.arrow([(130, 274), (296, 230)], ORANGE, sw=2)
    # channel
    channel_box(f, 300, 150, 'read only', '768', '1')
    f.text(425, 300, 'per open()', 12, GRAY, 'center')
    f.arrow([(554, 266), (676, 236)], GREEN, sw=2)
    # file
    f.rect(680, 150, 250, 140, TEAL, sw=2)
    f.text(805, 158, 'the file (inode)', 14, TEAL, 'center')
    f.text(696, 186, 'size', 12, GRAY)
    f.text(914, 186, '1,024', 12, TEAL, 'right')
    f.text(696, 210, 'owner, permissions', 12, GRAY)
    f.text(914, 210, 'rw-r--r--', 12, TEAL, 'right')
    f.text(696, 234, 'times, link count', 12, GRAY)
    f.text(696, 258, 'where the data is', 12, GRAY)
    f.text(805, 300, 'per file, on the disk', 12, GRAY, 'center')
    f.arrow([(805, 322), (805, 372)], TEAL, sw=2)
    # bytes
    strip(f, 300, 380, 630, 40, TEAL)
    f.text(300, 426, '0', 12, GRAY)
    f.text(930, 426, 'size: 1,024', 12, TEAL, 'right')
    pointer(f, 300 + 630 * 0.75, 420, 'file pointer: 768', RED, 12, up=True)
    f.text(40, 396, 'the data,', 13, GRAY)
    f.text(40, 414, 'as the process sees it', 13, GRAY)
    f.rect(40, 486, 990, 62, YELLOW, sw=1)
    f.text(60, 496, 'The permissions and the pointer belong to the channel: they are set by open(), and another open() gets its own.', 14)
    f.text(60, 520, 'The size and the data belong to the file: every channel to that file sees the same ones.', 14)
    f.save(OUT + '/05-channel-internals/open-file')


def small_table(f, x, y, labels, color=ORANGE, w=50, h=30):
    for i, e in enumerate(labels):
        f.rect(x, y + i * h, w, h, color, sw=1, round=False)
        f.ctext(x + w / 2, y + i * h + h / 2, e, 12, color)


def mini_channel(f, x, y, ptr, count, w=120):
    f.rect(x, y, w, 64, GREEN, sw=2)
    f.text(x + 10, y + 8, 'pointer', 11, GRAY)
    f.text(x + w - 10, y + 8, ptr, 12, RED, 'right')
    f.text(x + 10, y + 34, 'count', 11, GRAY)
    f.text(x + w - 10, y + 34, count, 12, GREEN, 'right')


def open_dup_fork():
    f = Fig('open-dup-fork')
    f.text(40, 20, 'Two descriptors, one file: three ways to get there', 26)
    W = 330
    for k, (title, code, c) in enumerate([
            ('open() twice', 'fd1 = open("a.txt", ...);\nfd2 = open("a.txt", ...);', BLUE),
            ('dup()', 'fd1 = open("a.txt", ...);\nfd2 = dup(fd1);', VIOLET),
            ('fork()', 'fd1 = open("a.txt", ...);\nfork();', ORANGE)]):
        x = 40 + k * (W + 15)
        panel(f, x, 80, W, 420, title, c)
        f.text(x + 20, 126, code, 12, INK)
        disk(f, x + 278, 290, 60, 56, TEAL, 'a.txt', 11)
        if k == 0:
            small_table(f, x + 16, 230, ['3', '4'])
            f.text(x + 41, 296, 'one table', 11, GRAY, 'center')
            mini_channel(f, x + 100, 200, '4', '1')
            mini_channel(f, x + 100, 300, '4', '1')
            f.arrow([(x + 68, 245), (x + 98, 236)], ORANGE, sw=1)
            f.arrow([(x + 68, 275), (x + 98, 326)], ORANGE, sw=1)
            f.arrow([(x + 222, 240), (x + 250, 272)], GREEN, sw=1)
            f.arrow([(x + 222, 330), (x + 250, 306)], GREEN, sw=1)
            f.text(x + 20, 396, 'Two channels, two file pointers.', 13, c)
            f.text(x + 20, 420, 'Each reads from the start:', 13)
            f.text(x + 20, 444, '"0123" and "0123".', 13)
        elif k == 1:
            small_table(f, x + 16, 258, ['3', '4'])
            f.text(x + 41, 324, 'one table', 11, GRAY, 'center')
            mini_channel(f, x + 100, 256, '8', '2')
            f.arrow([(x + 68, 273), (x + 98, 280)], ORANGE, sw=1)
            f.arrow([(x + 68, 303), (x + 98, 296)], ORANGE, sw=1)
            f.arrow([(x + 222, 288), (x + 246, 288)], GREEN, sw=1)
            f.text(x + 20, 396, 'One channel, one file pointer.', 13, c)
            f.text(x + 20, 420, 'The second read goes on where', 13)
            f.text(x + 20, 444, 'the first stopped: "0123", "4567".', 13)
        else:
            small_table(f, x + 16, 196, ['3'])
            f.text(x + 41, 230, 'parent', 11, GRAY, 'center')
            small_table(f, x + 16, 326, ['3'])
            f.text(x + 41, 360, 'child', 11, GRAY, 'center')
            mini_channel(f, x + 100, 256, '8', '2')
            f.arrow([(x + 68, 211), (x + 112, 254)], ORANGE, sw=1)
            f.arrow([(x + 68, 341), (x + 112, 322)], ORANGE, sw=1)
            f.arrow([(x + 222, 288), (x + 246, 288)], GREEN, sw=1)
            f.text(x + 20, 396, 'Two tables, one channel.', 13, c)
            f.text(x + 20, 420, 'What the child reads, the parent', 13)
            f.text(x + 20, 444, 'does not get: "0123", "4567".', 13)
    f.text(40, 520, 'close() removes one reference. The channel goes away when the count reaches zero, and not before.', 15)
    f.save(OUT + '/05-channel-internals/open-dup-fork')


# ----------------------------------------------------------------------------
# 06. File channel operations
# ----------------------------------------------------------------------------

def logical_view():
    f = Fig('logical-view')
    f.text(40, 20, 'A file, as a process sees it', 26)
    strip(f, 60, 130, 640, 44, TEAL)
    for i in range(1, 16):
        f.line([(60 + i * 40, 130), (60 + i * 40, 174)], TEAL, sw=1)
    f.text(60, 182, '0', 13, GRAY)
    f.text(700, 182, 'size', 13, TEAL, 'right')
    pointer(f, 60 + 9 * 40, 126, 'file pointer', RED, 13)
    f.text(380, 182, 'an array of bytes', 13, GRAY, 'center')
    f.text(760, 100, 'size: kept with the file', 14, TEAL)
    f.text(760, 124, 'one for everybody', 12, GRAY)
    f.text(760, 154, 'file pointer: kept with the channel', 14, RED)
    f.text(760, 178, 'one for each open()', 12, GRAY)
    # the table of operations
    f.text(60, 240, 'operation', 13, GRAY)
    f.text(330, 240, 'file pointer', 13, RED, 'center')
    f.text(520, 240, 'size', 13, TEAL, 'center')
    f.line([(60, 262), (620, 262)], GRAY, sw=1)
    rows = [
        ('open()', 'set to 0', 'set to 0 with O_TRUNC'),
        ('read(n)', 'moves forward', '--'),
        ('write(n)', 'moves forward', 'grows, if past the end'),
        ('lseek()', 'set anywhere', '--'),
        ('ftruncate(n)', '--', 'set to n'),
    ]
    y = 272
    for op, p, s in rows:
        f.text(60, y, op, 15, INK)
        f.text(330, y + 2, p, 13, RED if p != '--' else GRAY, 'center')
        f.text(520, y + 2, s, 13, TEAL if s != '--' else GRAY, 'center')
        y += 32
    # open flags
    f.text(700, 240, 'where a channel starts', 13, GRAY)
    f.line([(700, 262), (1040, 262)], GRAY, sw=1)
    f.text(700, 274, 'open(O_RDONLY)', 13)
    strip(f, 700, 300, 200, 18, TEAL)
    f.arrow([(700, 340), (700, 322)], RED, sw=2)
    f.text(712, 326, 'pointer at 0', 11, RED)
    f.text(700, 356, 'open(O_WRONLY | O_APPEND)', 13)
    strip(f, 700, 382, 200, 18, TEAL)
    f.arrow([(900, 422), (900, 404)], RED, sw=2)
    f.text(888, 408, 'at the end, before every write', 11, RED, 'right')
    f.text(700, 438, 'open(O_WRONLY | O_TRUNC)', 13)
    strip(f, 700, 464, 200, 18, TEAL, [(0, 1, None)])
    f.arrow([(700, 504), (700, 486)], RED, sw=2)
    f.text(712, 490, 'pointer at 0, size 0', 11, RED)
    f.text(60, 470, 'No call reads "byte 300". A call reads "the next n bytes",', 14)
    f.text(60, 494, 'and the channel remembers where next is.', 14)
    f.save(OUT + '/06-file-channel-ops/logical-view')


def file_ops_steps():
    f = Fig('file-ops-steps')
    f.text(40, 20, 'Seven calls, two numbers', 26)
    f.text(40, 62, 'The file-ops demo: what each call does to the file pointer and to the size.', 14, GRAY)
    X, W = 330, 512        # one pixel is two bytes
    f.text(40, 100, 'call', 13, GRAY)
    f.text(X + W + 40, 100, 'pointer', 13, RED)
    f.text(X + W + 120, 100, 'size', 13, TEAL)
    for b in [0, 256, 512, 768, 1024]:
        f.text(X + b / 2, 100, str(b), 11, GRAY, 'center')
    steps = [
        ('open(O_CREAT | O_TRUNC)', 0, 0, []),
        ('write(1024)', 1024, 1024, [(0, 1024, TEAL)]),
        ('lseek(-512, SEEK_CUR)', 512, 1024, [(0, 1024, TEAL)]),
        ('read(256)', 768, 1024, [(0, 512, TEAL), (512, 768, YELLOW), (768, 1024, TEAL)]),
        ('ftruncate(256)', 768, 256, [(0, 256, TEAL)]),
        ('read(256), which returns 0', 768, 256, [(0, 256, TEAL)]),
        ('write(16)', 784, 784, [(0, 256, TEAL), (256, 768, None), (768, 784, ORANGE)]),
    ]
    y = 130
    for name, ptr, size, parts in steps:
        f.text(40, y + 6, name, 14, INK)
        f.line([(X, y + 28), (X + W, y + 28)], GRAY, sw=1, style='dotted')
        for a, b, c in parts:
            if c is None:
                f.rect(X + a / 2, y, (b - a) / 2, 28, GRAY[0], bg='#ffffff', sw=1, style='dashed', round=False)
                f.ctext(X + (a + b) / 4, y + 14, 'a hole: reads as zeros', 11, GRAY)
            else:
                f.rect(X + a / 2, y, (b - a) / 2, 28, c, sw=1, round=False)
        f.arrow([(X + ptr / 2, y - 12), (X + ptr / 2, y + 26)], RED, sw=2)
        f.text(X + W + 40, y + 6, str(ptr), 14, RED)
        f.text(X + W + 120, y + 6, str(size), 14, TEAL)
        y += 50
    f.text(40, 486, 'read() and write() move the pointer; lseek() sets it; ftruncate() changes the size and leaves the pointer alone.', 14)
    f.text(40, 510, 'After the truncation the pointer is past the end: reading there gives nothing, and writing there leaves a hole behind.', 14)
    f.save(OUT + '/06-file-channel-ops/file-ops-steps')


def sparse_file():
    f = Fig('sparse-file')
    f.text(40, 20, 'Size is not space', 26)
    f.text(40, 62, 'ftruncate(fd, 20 GiB), then one byte written at 10 GiB.', 15, INK)
    f.text(40, 112, 'what the process sees', 13, GRAY)
    strip(f, 40, 136, 900, 44, TEAL, [(0, 0.495, None), (0.495, 0.505, TEAL), (0.505, 1, None)])
    f.text(40, 188, '0', 12, GRAY)
    f.text(940, 188, '20 GiB', 12, TEAL, 'right')
    f.text(478, 188, '10 GiB', 12, GRAY, 'right')
    f.text(250, 150, 'zeros', 13, GRAY, 'center')
    f.text(730, 150, 'zeros', 13, GRAY, 'center')
    f.text(960, 140, 'size:', 13, GRAY)
    f.text(960, 160, '21,474,836,480', 13, TEAL)
    f.text(40, 252, 'what is on the disk', 13, GRAY)
    f.rect(480, 276, 20, 44, TEAL, sw=1, round=False)
    f.arrow([(490, 184), (490, 272)], TEAL, sw=1, style='dashed')
    f.text(512, 288, 'one block of 4,096 bytes', 13, TEAL)
    f.text(960, 280, 'on disk:', 13, GRAY)
    f.text(960, 300, '4,096', 13, TEAL)
    f.rect(40, 360, 1050, 86, YELLOW, sw=1)
    f.text(60, 370, 'The size is a number stored with the file, and ftruncate() only changes the number.', 15)
    f.text(60, 394, 'Blocks are given to the file when something is written to them. A part that was never written is a hole:', 15)
    f.text(60, 418, 'it reads as zeros and takes no space. ls -l shows the size; ls -s and du show the space.', 15)
    f.save(OUT + '/06-file-channel-ops/sparse-file')


FIGURES = [storyline, four_writes, process_outside, two_families, operations, fd_table, channel_types,
           open_file, open_dup_fork, logical_view, file_ops_steps, sparse_file]


def copy_to_live():
    for part in sorted(os.listdir(FULL)):
        # Hand-drawn sketches kept beside the figures are not built here.
        if part == 'sketches':
            continue
        for name in sorted(os.listdir(os.path.join(FULL, part))):
            if name.endswith(('.svg', '.excalidraw')):
                os.makedirs(os.path.join(LIVE, part), exist_ok=True)
                shutil.copy(os.path.join(FULL, part, name), os.path.join(LIVE, part, name))


if __name__ == '__main__':
    for figure in FIGURES:
        figure()
    if OUT == FULL:
        copy_to_live()
