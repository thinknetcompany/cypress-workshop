FROM node:12.18.3-slim

WORKDIR /usr/src/app
COPY . /usr/src/app/

RUN yarn -q install --production=false --no-lockfile --silent && \
    yarn run build && \
    yarn -q install --production=true --no-lockfile --silent && \
    yarn cache clean


CMD ["npm", "start"]
