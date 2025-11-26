FROM node:20 as build-hub
COPY hub hub
WORKDIR /hub/
RUN yarn install && yarn global add react-scripts sass
RUN yarn build

FROM node:20 as build-web
COPY web web
WORKDIR /web/
RUN yarn install
RUN yarn build

FROM node:20
# Installs latest Chromium (85) package for puppeteer
RUN apt-get update && apt-get install -y gnupg nginx yarn \
    && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | gpg --dearmor > /etc/apt/trusted.gpg.d/google-archive.gpg \
    && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
    && apt-get update && apt-get install google-chrome-stable -y fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst fonts-freefont-ttf libxss1 --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

COPY wait-for-it.sh /home/wait-for-it.sh
RUN chmod +x /home/wait-for-it.sh

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build-hub /hub/build /usr/share/nginx/html/hub
# Copy Next.js web app
COPY --from=build-web /web /home/web
WORKDIR /home/web

# Install back
WORKDIR /home/back
COPY back .
RUN yarn install && yarn run build

# Copy startup script
COPY start.sh /home/start.sh
RUN chmod +x /home/start.sh

CMD ["/home/start.sh"]

STOPSIGNAL SIGTERM
EXPOSE 8080 8081 8082
