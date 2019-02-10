#
#
#   Build production files
#
#
FROM node:alpine as clientBuild

COPY . /usr/app/client/

WORKDIR /usr/app/client

RUN npm install && npm run build
#
#
#   Copy production build to cloud bucket
#
#
FROM debian:jessie-slim

ENV CLOUD_SDK_REPO cloud-sdk-jessie

RUN apt-get update && apt-get install --yes --no-install-recommends ca-certificates curl \
    && echo "deb http://packages.cloud.google.com/apt $CLOUD_SDK_REPO main" \
    | tee -a /etc/apt/sources.list.d/google-cloud-sdk.list \
    && curl https://packages.cloud.google.com/apt/doc/apt-key.gpg | apt-key add - \
    && apt-get update && apt-get install --yes google-cloud-sdk \
    && apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

COPY --from=clientBuild /usr/app/client/dist/ /var/www/client/

WORKDIR /var/www/client

# RUN gsutil -m cp -r /var/www/client/ gs://utila.coffee/

CMD [ "gsutil", "rm", "gs://utila.coffee/*" ]

ENTRYPOINT [ "gsutil", "-m", "cp", "-r", "/var/www/client/*", "gs://utila.coffee/" ]