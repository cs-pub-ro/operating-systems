/* SPDX-License-Identifier: BSD-3-Clause */

#ifndef W_EPOLL_H_
#define W_EPOLL_H_	1

#ifdef __cplusplus
extern "C" {
#endif

#include <sys/epoll.h>

/**
 * Add a file descriptor to the epoll instance.
 */
static inline int w_epoll_add_fd_in(int epollfd, int new_fd)
{
	struct epoll_event ev;  // Used to store event information

    /* Set the event type and the file descriptor */
	ev.events = EPOLLIN;
	ev.data.fd = new_fd;

	/* Return the result of epoll_ctl ADD operation */
	return epoll_ctl(epollfd, EPOLL_CTL_ADD, new_fd, &ev);
}

/**
 * Remove a file descriptor from the epoll instance.
 */
static inline int w_epoll_del_fd(int epollfd, int fd)
{
	/* Return the result of epoll_ctl DEL operation */
	return epoll_ctl(epollfd, EPOLL_CTL_DEL, fd, NULL);
}

#ifdef __cplusplus
}
#endif

#endif /* EPOLL_H_ */
