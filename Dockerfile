FROM node:14 as build-hub
COPY hub hub
WORKDIR /hub/
RUN yarn install && yarn global add react-scripts
RUN react-scripts build

FROM node:14 as build-web
COPY web web
WORKDIR /web/
RUN yarn install && yarn global add react-scripts
RUN react-scripts build

# production environment
FROM node:14
# Installs latest Chromium (85) package for puppeteer
RUN apt-get update && apt-get install -y wget gnupg nginx yarn \
    && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
    && apt-get update && apt-get install -y google-chrome-stable fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst fonts-freefont-ttf libxss1 --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

COPY wait-for-it.sh /home/wait-for-it.sh
RUN chmod +x /home/wait-for-it.sh
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build-hub /hub/build /usr/share/nginx/html/hub
COPY --from=build-web /web/build /usr/share/nginx/html/web

# Install back
COPY ./.env /home/
WORKDIR /home/back
COPY back .
RUN yarn install && yarn run build

STOPSIGNAL SIGTERM
EXPOSE 8080 8081 8082


