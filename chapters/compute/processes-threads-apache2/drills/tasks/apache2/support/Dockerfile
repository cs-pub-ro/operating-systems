FROM httpd:2.4.54

RUN apt-get -y update && apt-get -y install procps strace net-tools \
    && rm -rf /var/lib/apt/lists/*

COPY httpd-mpm.conf /usr/local/apache2/conf/extra
COPY httpd.conf /usr/local/apache2/conf/
