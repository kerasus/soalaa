FROM nginx:1.23.2-alpine

# Remove any existing config files
RUN rm /etc/nginx/conf.d/*

# Copy config files
# *.conf files in "conf.d/" dir get included in main config
COPY ./default.conf /etc/nginx/conf.d/
#COPY ./default.conf /etc/nginx/nginx.conf

## Remove default nginx index page
#RUN rm -rf /usr/share/nginx/html/*

## Copy from the stahg 1
#COPY --from=builder /usr/app/dist/ssr /usr/share/nginx/html

# Expose the listening port
EXPOSE 80

# Launch NGINX
CMD [ "nginx", "-g", "daemon off;" ]
