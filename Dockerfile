FROM node:20

ENV NODE_ENV=production

WORKDIR /app

COPY .env.production .env.production
COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]