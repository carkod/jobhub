ARG JOBHUB_PLATFORM=linux/amd64

FROM --platform=$JOBHUB_PLATFORM node:22 AS build-hub
COPY hub hub
WORKDIR /hub/
RUN npm ci
RUN npm run build

FROM --platform=$JOBHUB_PLATFORM node:22 AS build-web
COPY web web
WORKDIR /web/
RUN npm ci
RUN npm run build

FROM --platform=$JOBHUB_PLATFORM node:22
# Installs latest Chromium (85) package for puppeteer
RUN apt-get update && apt-get install -y gnupg nginx \
    && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | gpg --dearmor > /etc/apt/trusted.gpg.d/google-archive.gpg \
    && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
    && apt-get update && apt-get install google-chrome-stable -y fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst fonts-freefont-ttf libxss1 --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

COPY --from=build-hub /hub/dist /usr/share/nginx/html/hub
COPY nginx.conf /etc/nginx/conf.d/jobhub.conf
# Copy Next.js web app
COPY --from=build-web /web /home/web
WORKDIR /home/web

# Install back
WORKDIR /home/back
COPY back .
RUN npm ci && npm run build

STOPSIGNAL SIGTERM
EXPOSE 3000 8080 8081 8082

WORKDIR /home/web
CMD ["npm", "run", "start"]
