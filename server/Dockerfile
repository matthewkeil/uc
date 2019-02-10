FROM node:alpine

WORKDIR /usr/app/graphql

RUN apk add --no-cache --virtual .build-deps make gcc g++ python \
	&& npm install bcrypt \
	&& apk del .build-deps \
	&& npm install pm2 -g

COPY ./package.json ./package-lock.json ./tsconfig.json /

RUN npm install --no-optional

COPY ./src/ src/

EXPOSE 4000

CMD [ "pm2", "start", "process.yaml" ]