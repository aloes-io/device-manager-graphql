FROM node:lts-alpine
LABEL maintainer="getlarge <ed@getlarge.eu>"

USER node

RUN mkdir -p /home/node/app

WORKDIR /home/node/app

COPY --chown=node package*.json ./

RUN npm install

COPY --chown=node . .

RUN npm run build

ENV HTTP_SERVER_HOST=0.0.0.0 HTTP_SERVER_PORT=4000
ENV WS_SERVER_HOST=0.0.0.0 WS_SERVER_PORT=5000

EXPOSE ${WS_SERVER_PORT}
EXPOSE ${HTTP_SERVER_PORT}

CMD [ "node", "." ]
