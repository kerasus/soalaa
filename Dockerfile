FROM node:16.16.0-alpine as prebuild

# Set working directory
WORKDIR /var/www/app

COPY ./package*.json ./

# Install dependencies
RUN yarn install --production --frozen-lockfile


ARG ALAA_API_V2_SERVER=https://alaatv.com/api/v2
ARG ALAA_API_V1_SERVER=https://alaatv.com/api/v1
ARG ALAA_WEB_SERVER=https://alaatv.com
ARG ALAA_MINIO_SERVER=https://stage-minio.alaatv.com
ARG VUEX_PERSISTED_STATE_KEY=vuex
ARG GET_TIME_SERVER=/time
ARG ALAA_API_V1=/alaa/api/v1
ARG ALAA_API_V2=/alaa/api/v2
ARG ALAA_WEB=/alaa
ARG ALAA_MINIO=/minio
ARG NGINX_PORT=8081
ARG SSR_PORT=3000

# Copy all files
COPY ./ ./

# Build app on SSR mode
RUN yarn build:ssr


##############################################


FROM node:16.16.0-alpine


COPY --from=prebuild /var/www/app/dist/ssr /var/www/app/dist/ssr

WORKDIR /var/www/app/dist/ssr

RUN yarn install

# Expose the listening port
EXPOSE 3000

# Run container as non-root (unprivileged) user
# The "node" user is provided in the Node.js Alpine base image

USER node

CMD ["node", "/var/www/app/dist/ssr/index.js"]