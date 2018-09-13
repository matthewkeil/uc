FROM node:alpine

RUN addgroup -S graphql && adduser -S -G graphql -h /usr/app graphql

VOLUME [ "/user/app" ]

WORKDIR /usr/app

RUN apk add --no-cache --virtual .build-deps make gcc g++ python && \
	npm install bcrypt && \
	apk del .build-deps

COPY ./server/package.json ./server/package-lock.json ./

RUN npm install --no-optional
	# --only=production

USER graphql:graphql

EXPOSE 4000

ENTRYPOINT [ "npm", "run", "dev" ]