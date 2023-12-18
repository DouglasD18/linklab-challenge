FROM node:18.18-alpine 

WORKDIR /client

COPY . .

RUN npm install --omit=dev

CMD [ "npm", "start" ]