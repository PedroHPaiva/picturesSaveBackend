FROM node:18 as node-build

EXPOSE 8080

WORKDIR /app

COPY . ./

RUN npm install
RUN npm run build


CMD ["node", "./dist/index.js"]