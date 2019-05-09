FROM node:10-alpine

RUN mkdir /app
WORKDIR /app

COPY package.json package.json
COPY package-lock.json package-lock.json
COPY src src
COPY tsconfig.json tsconfig.json
COPY tsconfig.scripts.json tsconfig.scripts.json
COPY tsconfig.server.json tsconfig.server.json

RUN npm ci \
  && npm run build \
  && rm -rf src \
  && npm ci --production

ENV NODE_ENV=production

EXPOSE 8080

USER node
CMD node dist/server/main.js
