#==========================================================
#   Development
#==========================================================

FROM node:14-alpine AS node

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

USER node

EXPOSE 8000

CMD [ "npm", "run", "start:dev" ]


#==========================================================
#   Production
#==========================================================

# FROM node:14-alpine AS node

# WORKDIR /app

# RUN npm install -g pm2

# COPY ["package.json", "package-lock.json*", "./"]

# RUN npm install --production --silent

# COPY . .

# # ----- If UID:GID is 1000:1000 ------
# USER node
# RUN chown -R node:node /app

# # -------------- Else ----------------
# # RUN addgroup -g 20 appgroup

# # RUN adduser -D -u 501 appuser -G appgroup

# # RUN chown -R appuser:appgroup /app

# # USER appuser
# # ------------------------------------

# EXPOSE 8000

# CMD ["pm2-runtime", "dist/main", "--env", "production"]
