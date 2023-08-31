FROM node:alpine

WORKDIR /usr/buy-sell-now-front

COPY ["package*.json","./"]

RUN npm install

COPY ./ ./

CMD ["npm", "start"]