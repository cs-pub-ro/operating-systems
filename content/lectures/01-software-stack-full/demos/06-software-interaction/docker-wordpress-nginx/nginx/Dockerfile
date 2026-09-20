FROM nginx:latest

# Remove default configuration files
RUN rm /etc/nginx/conf.d/default.conf; exit 0

# Copy our custom config files to Nginx Contatiner
COPY conf/nginx.conf /etc/nginx
COPY conf/conf.d /etc/nginx/conf.d