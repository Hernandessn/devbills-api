FROM node:18-alpine

WORKDIR /home/app

COPY . ./

Run npm i

EXPOSE 3333

CMD ["npm","run","dev"]