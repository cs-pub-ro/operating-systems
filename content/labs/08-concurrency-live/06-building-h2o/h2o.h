/* SPDX-License-Identifier: BSD-3-Clause */

/*
 * Building water: hydrogen threads and oxygen threads arrive in any order,
 * and have to leave in groups of three, two hydrogen and one oxygen, one
 * molecule after another.
 */

#ifndef H2O_H_
#define H2O_H_		1

/*
 * Implemented by the executable (chall): an atom is released into the
 * molecule being built.  Safe to call from several threads at once.
 */
void release_hydrogen(void);
void release_oxygen(void);

/*
 * The library: libh2o.so, built from h2o.c.
 *
 * A hydrogen thread calls hydrogen(), which has to call release_hydrogen()
 * exactly once before it returns; an oxygen thread calls oxygen(), which
 * has to call release_oxygen() exactly once.  The releases must come in
 * groups of three: counted from the start, releases 1 to 3 are two hydrogen
 * and one oxygen in any order, and so are releases 4 to 6, and so on.
 */

/* Called once, before the threads start. */
void h2o_init(void);

void hydrogen(void);
void oxygen(void);

#endif
