FROM node:22.15-alpine3.20

WORKDIR /app

COPY package*.json ./

RUN npm i --production

COPY . .

EXPOSE 3000

EXPOSE 8082

EXPOSE 8083

CMD ["node", "build"]