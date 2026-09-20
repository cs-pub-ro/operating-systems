FROM php:7.4-fpm

# install PHP extensions (gd, mysqli opcache and zip)
# configure gd with png and jpg support
RUN set -ex; \
    \
    apt-get update; \
    apt-get install -y \
    libjpeg-dev \
    libpng-dev \
    zlib1g-dev \
    libzip-dev \
    ; \
    rm -rf /var/lib/apt/lists/*; \
    \
    docker-php-ext-configure gd --with-jpeg; \
    docker-php-ext-install gd mysqli opcache zip

# set recommended PHP.ini settings for opcache
# see https://secure.php.net/manual/en/opcache.installation.php
RUN { \
    echo 'opcache.memory_consumption=256'; \
    echo 'opcache.interned_strings_buffer=8'; \
    echo 'opcache.max_accelerated_files=4000'; \
    echo 'opcache.revalidate_freq=2'; \
    echo 'opcache.fast_shutdown=1'; \
    echo 'opcache.enable_cli=1'; \
    } > /usr/local/etc/php/conf.d/opcache-recommended.ini

# Set PHP.ini settings for script execution and uploads
RUN { \
    echo 'file_uploads = On'; \
    echo 'upload_max_filesize = 128M'; \
    echo 'post_max_size = 128M'; \
    echo 'memory_limit = 512M'; \
    echo 'max_execution_time = 600'; \
    echo 'max_input_time = 600'; \
    } > /usr/local/etc/php/php.ini

# Create /www directory
RUN mkdir /www
RUN chmod a+rwx -R /www
