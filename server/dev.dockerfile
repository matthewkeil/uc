FROM node:alpine

WORKDIR /usr/app/graphql

RUN apk add --no-cache --virtual .build-deps make gcc g++ python \
	&& npm install bcrypt \
	&& apk del .build-deps \
	&& npm install pm2 ts-node -g

COPY ./package.json ./package-lock.json ./process.yaml /usr/app/graphql/

RUN npm install --no-optional

EXPOSE 4000

CMD [ "pm2-dev", "process.yaml" ]