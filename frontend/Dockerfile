# Stage 1 - Building image

FROM node:14-alpine as node

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

RUN npm run build

# Stage 2 - Running image

FROM nginx:1.21.5 as production-stage

COPY --from=node /app/build /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]