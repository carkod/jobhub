FROM node:13-slim as build-back
ADD back back
WORKDIR /back
RUN npm i && npm run build


# FROM node:12-slim as build-hub
# WORKDIR /app
# COPY /web/package.json /app/
# RUN yarn install
# COPY /web/ /app/
# RUN yarn run build

# FROM python:3.6-slim
# RUN apt-get clean \
#     && apt-get -y update
# RUN apt-get -y install nginx \
#     && apt-get -y install python3-dev \
#     && apt-get -y install build-essential
# WORKDIR /app
# COPY --from=build-stage /app/ /app/web/build
# COPY ./nginx.conf /etc/nginx/sites-enabled/default
# ADD . .
# RUN pip install --upgrade pip
# RUN pip3 install -r requirements.txt
# RUN chmod +x ./start

# pull official base image
FROM node:13.10-alpine

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
# ENV PATH /app/node_modules/.bin:$PATH

# # install app dependencies
# COPY package.json ./
# COPY package-lock.json ./
# RUN npm install --silent
# RUN npm install react-scripts@3.4.1 -g --silent


RUN rm -rf package.json
WORKDIR /back/
COPY --from=build-back back back
# COPY --from=build-css /srv/static/css static/css

STOPSIGNAL SIGTERM
EXPOSE 80

CMD ["node", "/back/dist/server.js"]
