FROM debian:13

ARG CHALLENGE_NAME="demo-heap-1"
ARG EXEC_NAME="chall"

RUN set -xe; \
    apt-get -yqq update; \
    apt-get -yqq install xinetd \
    ;

RUN useradd -m -d /home/ctf -s /bin/bash ctf
RUN mkdir /home/ctf/${CHALLENGE_NAME}
COPY ./flag /home/ctf/${CHALLENGE_NAME}/flag.txt
COPY ./publish/${EXEC_NAME} /home/ctf/${CHALLENGE_NAME}/${EXEC_NAME}
COPY ./publish/ld-linux-x86-64.so.2 /home/ctf/${CHALLENGE_NAME}/ld-linux-x86-64.so.2
COPY ./publish/libc.so.6 /home/ctf/${CHALLENGE_NAME}/libc.so.6
COPY ./deploy/wrapper.sh /home/ctf/${CHALLENGE_NAME}/wrapper.sh

RUN chown -R root:ctf /home/ctf
RUN chmod 750 /home/ctf
RUN chmod 750 /home/ctf/${CHALLENGE_NAME}
RUN chmod 750 /home/ctf/${CHALLENGE_NAME}/${EXEC_NAME}
RUN chmod 750 /home/ctf/${CHALLENGE_NAME}/wrapper.sh
RUN chmod 440 /home/ctf/${CHALLENGE_NAME}/flag.txt
RUN chown root:ctf /home/ctf/${CHALLENGE_NAME}/flag.txt

COPY ./deploy/xinetd.conf /etc/xinetd.d/${CHALLENGE_NAME}

WORKDIR /
COPY ./deploy/run.sh /usr/local/bin/
RUN chmod 755 /usr/local/bin/run.sh
CMD ["/usr/local/bin/run.sh"]
