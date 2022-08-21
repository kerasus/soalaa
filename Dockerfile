# stage1 as builder
FROM node:16.13.2-alpine as builder

WORKDIR /vue-ui

# Copy the package.json and install dependencies
COPY package*.json ./
RUN npm ci

# Copy rest of the files
COPY . .

# eslint
# RUN npm run lint

# Build the project
RUN npm run build:pwa


FROM nginx:stable-alpine as production-build
COPY ./nginx.conf /etc/nginx/nginx.conf

## Remove default nginx index page
RUN rm -rf /usr/share/nginx/html/*

# Copy from the stahg 1
COPY --from=builder /vue-ui/dist/pwa /usr/share/nginx/html

EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]
