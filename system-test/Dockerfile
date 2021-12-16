FROM cypress/browsers:node12.18.3-chrome89-ff86

WORKDIR /usr/src/app/

COPY . .

RUN yarn -q install --production=false --no-lockfile --silent && \
    yarn run build && \
    yarn -q install --production=true --no-lockfile --silent && \
    yarn cache clean

CMD ["npm", "run", "test"]
