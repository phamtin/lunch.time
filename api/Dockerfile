#==========================================================
#   Development
#==========================================================

FROM node:14-alpine AS node

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 8000

CMD [ "npm", "run", "start:dev" ]


#==========================================================
#   Production
#==========================================================

# FROM node:14-alpine

# WORKDIR /app

# RUN npm install -g pm2

# # ----- If UID:GID is 1000:1000 ------
# # RUN chown -R node:node /app
# # USER node
# # -------------- Else ----------------
# RUN addgroup -g 2222 appgroup
# RUN adduser -D -u 1111 appuser -G appgroup
# RUN chown -R appuser:appgroup /app
# USER appuser
# # ------------------------------------

# COPY ./package.json .

# RUN npm install

# COPY . .

# CMD ["pm2-runtime", "ecosystem.config.js", "--env", "production"]
