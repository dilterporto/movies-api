FROM node:10.19.0-alpine3.9
WORKDIR /usr/src/app
COPY package*.json ./
RUN yarn install
COPY . .
EXPOSE 3011
# RUN [ "npm", "run", "build" ]
CMD [ "yarn", "start:prod" ]
