FROM node:14
LABEL maintainer="Andy Huynh"

ARG SESSION_SECRET=sekred
ARG CORS_ORIGIN=http://localhost:3000

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package.json ./
COPY yarn.lock ./

RUN yarn

# Bundle app source
COPY . .
# COPY .env.production ./

RUN yarn build

ENV NODE_ENV production
ENV SESSION_SECRET=$SESSION_SECRET
ENV CORS_ORIGIN=$CORS_ORIGIN

EXPOSE 8080
CMD [ "node", "dist/index.js" ]
USER node