<<<<<<< HEAD
=======
#==========================================================
#   Development
#==========================================================

# FROM node:14-alpine as node

# WORKDIR /app

# COPY package.json ./

# RUN npm install

# COPY . .

# EXPOSE 3000

# CMD ["npm", "start"]

#==========================================================
#   Production
#==========================================================

>>>>>>> 35f26dabc56064489843c44641059a6ab0ef8724
# Stage 1 - build stage

FROM node:14-alpine as node

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build

# Stage 2 - production stage

FROM nginx:1.21.5 as production-stage

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=node /app/build /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
