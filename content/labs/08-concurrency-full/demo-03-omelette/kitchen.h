/* SPDX-License-Identifier: BSD-3-Clause */

/*
 * The kitchen: hens put eggs in a basket, and a cook takes three of them at
 * a time to make an omelette.
 */

#ifndef KITCHEN_H_
#define KITCHEN_H_	1

#define EGGS_PER_OMELETTE	3

/*
 * The basket.  Implemented by the executable (chall), and NOT safe to use
 * from two threads at the same time: the library has to make sure that one
 * thread at a time is in the basket, and that the cook takes eggs only when
 * there are enough of them.  The basket notices when either rule is broken.
 */
void basket_put_egg(void);	/* put one egg in the basket               */
void basket_take_eggs(void);	/* take EGGS_PER_OMELETTE eggs out of it   */

/*
 * The library: libkitchen.so, built from kitchen.c.  The executable calls
 * these functions from its threads.
 */
void kitchen_init(void);	/* called once, before the threads start   */
void egg_create(void);		/* called by every hen thread, once per egg */
void omelette_make(void);	/* called by the cook thread, once per omelette */

#endif
