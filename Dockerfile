FROM node:21-alpine

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

# RUN chmod 777 /node

WORKDIR /home/node/app


COPY package*.json ./



USER node

RUN npm install

# COPY --chown=node:node . .
COPY --chown=node:node --from=builder /usr/src/app/build ./build

EXPOSE 5856

CMD [ "node", "server.js"]