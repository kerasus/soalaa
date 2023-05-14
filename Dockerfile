FROM node:16.16.0-alpine as prebuild

# Set working directory
WORKDIR /var/www/app

COPY ./package*.json ./

# Install dependencies
RUN yarn install --production --frozen-lockfile


ARG AUTH_API_SERVER=http://office.alaa.tv:700/api/v2
ARG AAA_API_SERVER=http://office.alaa.tv:3000/api/v1
ARG SOCKET_SERVER=http://office.alaatv.com:3006

ARG GET_TIME_SERVER=/time
ARG AUTH_API=/alaa/api/v2
ARG AAA_API=/3a/api/v1

ARG ACTIVE_ALL_CATEGORIES_IN_EXAM=false

ARG NGINX_PORT=8082

ARG SSR_PORT=13100

# Copy all files
COPY . .

# Build app on SSR mode
RUN yarn build:ssr

##############################################


FROM node:16.16.0-alpine


COPY --from=prebuild /var/www/app/dist/ssr /var/www/app/dist/ssr

WORKDIR /var/www/app/dist/ssr

RUN yarn install

# Expose the listening port
EXPOSE 13100

# Run container as non-root (unprivileged) user
# The "node" user is provided in the Node.js Alpine base image

USER node

CMD ["node", "/var/www/app/dist/ssr/index.js"]