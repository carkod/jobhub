# FROM node:14 as build-back
# COPY back back
# WORKDIR /back/
# RUN yarn install
# RUN yarn run build-js
# RUN yarn run build-sass


FROM node:14 as build-hub
COPY hub hub
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
FROM node:14
# Installs latest Chromium (85) package.
RUN apt-get update && apt-get install -y wget gnupg nginx yarn \
    && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
    && apt-get update && apt-get install -y google-chrome-stable fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst fonts-freefont-ttf libxss1 --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

COPY wait-for-it.sh /home/wait-for-it.sh
COPY nginx.conf /etc/nginx/conf.d/default.conf
RUN chmod +x /home/wait-for-it.sh
COPY --from=build-hub /hub/build /usr/share/nginx/html/hub
COPY --from=build-web /web/build /usr/share/nginx/html/web
# Install back
COPY ./.env /home/
COPY ./chrome.json /home/
WORKDIR /home/back
COPY back .
RUN yarn install && yarn run build

RUN yarn add puppeteer \
    # Add user so we don't need --no-sandbox.
    # same layer as npm install to keep re-chowned files from using up several hundred MBs more space
    && groupadd -r pptruser && useradd -r -g pptruser -G audio,video pptruser \
    && mkdir -p /home/back/pptruser/Downloads \
    && chown -R pptruser:pptruser /home/back/pptruser \
    && chown -R pptruser:pptruser /home/back/node_modules

# Run everything after as non-privileged user.
USER pptruser

STOPSIGNAL SIGTERM
EXPOSE 8080 8081 8082
CMD ["google-chrome-stable"]