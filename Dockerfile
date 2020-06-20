FROM node:12.18-buster-slim as build-back
COPY back back
COPY .env back/.env
WORKDIR /back/
RUN yarn install
RUN yarn run build-js
RUN yarn run build-sass

FROM node:12.18-buster-slim as build-hub
COPY hub hub
WORKDIR /hub/
RUN yarn install && yarn global add react-scripts
RUN react-scripts build

FROM node:12.18-buster-slim as build-web
COPY web web
WORKDIR /web/
RUN yarn install && yarn global add react-scripts
RUN react-scripts build

# production environment
FROM smebberson/alpine-nginx-nodejs:4.4.0
COPY --chown=root:root wait-for-it.sh wait-for-it.sh
RUN chmod +x wait-for-it.sh && apk add --no-cache bash
COPY --from=build-back back /home/back
COPY --from=build-hub /hub/build /usr/share/nginx/html/hub
COPY --from=build-web /web/build /usr/share/nginx/html/web
RUN rm -rf package.json

STOPSIGNAL SIGTERM
EXPOSE 9000
CMD ["nginx", "-g", "daemon off;"]