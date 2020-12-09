FROM node:14 as build-back
COPY back back
COPY .env back/
WORKDIR /back/
RUN yarn install
RUN yarn run build-js
RUN yarn run build-sass


FROM node:14 as build-hub
COPY hub hub
COPY .env hub/
WORKDIR /hub/
RUN yarn install && yarn global add react-scripts
RUN react-scripts build

FROM node:14 as build-web
COPY web web
COPY .env web/
WORKDIR /web/
RUN yarn install && yarn global add react-scripts
RUN react-scripts build

# production environment
# Change for pupeteer https://github.com/puppeteer/puppeteer/blob/main/docs/troubleshooting.md#running-puppeteer-in-docker
FROM smebberson/alpine-nginx-nodejs:4.4.0
COPY --chown=root:root wait-for-it.sh wait-for-it.sh
COPY nginx.conf /etc/nginx/conf.d/default.conf
RUN chmod +x wait-for-it.sh && apk add --no-cache bash
COPY --from=build-back back /home/back
COPY --from=build-hub /hub/build /usr/share/nginx/html/hub
COPY --from=build-web /web/build /usr/share/nginx/html/web
RUN rm -rf package.json

STOPSIGNAL SIGTERM
EXPOSE 80 81 9000
CMD ["nginx", "-g", "daemon off;"]