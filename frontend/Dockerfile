# Stage 1 - Building image

FROM node:14-alpine as node

WORKDIR /app

COPY . .

RUN npm install

RUN run build

# Stage 2 - Running image

RUN npm run build

FROM nginx:1.21.5 as production-stage

COPY --from=node /app/build /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]