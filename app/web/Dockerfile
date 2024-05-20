FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
CMD ["npm", "run", "dev"]

# FROM node:18-alpine as BUILD_IMAGE
# WORKDIR /app
# COPY package*.json ./
# RUN npm install
# COPY . .
# RUN npm run build

# FROM node:18-alpine as PRODUCTION_IMAGE
# WORKDIR /app
# COPY --from=BUILD_IMAGE /app/dist /app/dist
# EXPOSE 8080

# COPY package*.json ./
# COPY vite.config.js ./
# CMD ["npm", "run", "preview"]

# FROM nginx:1.22.0-alpine
# COPY ./nginx.conf /etc/nginx/conf.d/default.conf
# COPY --from=BUILD_IMAGE /app/build /usr/share/nginx/html
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]