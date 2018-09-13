FROM nginx:alpine

COPY ./config/nginx/nginx.conf /etc/nginx/

COPY ./config/ssl /usr/local/etc/ssl/certs/

RUN ln -sf /dev/stdout /var/log/nginx/access.log; \
    ln -sf /dev/stderr /var/log/nginx/error.log

VOLUME [ "/var/cache/nginx" ]

EXPOSE 80 443

STOPSIGNAL SIGTERM

ENTRYPOINT [ "nginx", "-g", "daemon off;" ]

# To build:
# docker build -f nginx/.dockerfile --tag uc/nginx ../

# To run:
# docker run -d -p 80:6379 --name nginx uc/nginx