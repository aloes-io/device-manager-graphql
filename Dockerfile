# Check out https://hub.docker.com/_/node to select a new base image
FROM node:10-slim
LABEL maintainer="getlarge <ed@getlarge.eu>"

# Set to a non-root built-in user `node`
USER node

# Create app directory (with user `node`)
RUN mkdir -p /home/node/app

WORKDIR /home/node/app

COPY --chown=node package*.json ./

RUN npm install

# Bundle app source code
COPY --chown=node . .

RUN npm run build

# Bind to all network interfaces so that it can be mapped to the host OS
ENV HTTP_SERVER_HOST=0.0.0.0 HTTP_SERVER_PORT=4000
ENV WS_SERVER_HOST=0.0.0.0 WS_SERVER_PORT=5000

EXPOSE ${WS_SERVER_PORT}
EXPOSE ${HTTP_SERVER_PORT}

CMD [ "node", "." ]
