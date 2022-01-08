FROM node:14 AS node

WORKDIR /app

COPY ./package.json ./

RUN npm install

COPY . .


# # Development
# CMD [ "npm", "run", "start:dev" ]

# Production

RUN npm run build

FROM node:14-alpine

WORKDIR /app

COPY --from=node /app ./

EXPOSE 8000

CMD ["npm", "run", "start:prod"]