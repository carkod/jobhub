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
FROM smebberson/alpine-nginx-nodejs:4.4.0

# Installs latest Chromium (85) package.
RUN apk add --no-cache \
      chromium \
      nss \
      freetype \
      freetype-dev \
      harfbuzz \
      ca-certificates \
      ttf-freefont \
      nodejs \
      yarn

COPY --chown=root:root wait-for-it.sh wait-for-it.sh
COPY nginx.conf /etc/nginx/conf.d/default.conf
RUN chmod +x wait-for-it.sh && apk add --no-cache bash
COPY --from=build-back back /home/back
COPY --from=build-hub /hub/build /usr/share/nginx/html/hub
COPY --from=build-web /web/build /usr/share/nginx/html/web
RUN rm -rf package.json

# Tell Puppeteer to skip installing Chrome. We'll be using the installed package.
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

# Puppeteer v5.2.1 works with Chromium 85.
RUN yarn add puppeteer@5.2.1

# Add user so we don't need --no-sandbox.
RUN addgroup -S pptruser && adduser -S -g pptruser pptruser \
    && mkdir -p /home/pptruser/Downloads /app \
    && chown -R pptruser:pptruser /home/pptruser \
    && chown -R pptruser:pptruser /app

# Run everything after as non-privileged user.
USER pptruser

STOPSIGNAL SIGTERM
EXPOSE 80 81 9000
CMD ["nginx", "-g", "daemon off;"]