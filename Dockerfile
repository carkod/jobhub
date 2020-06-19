FROM node:13-slim as build-back
ADD back back
WORKDIR /back
RUN npm i && npm run build

FROM node:11-slim as build-hub
COPY hub hub
WORKDIR /hub/
RUN npm i && npm i react-scripts && react-scripts build

# FROM node:11-slim as build-web
# ADD . .
# WORKDIR /web/
# RUN npm i --production && npm i react-scripts -g
# RUN react-scripts build

# production environment
FROM nginx:stable-alpine
COPY --from=build-back back back
COPY --from=build-hub /hub/build /usr/share/nginx/html/hub
# COPY --from=build-web /web/build /usr/share/nginx/html/web
RUN rm -rf package.json



STOPSIGNAL SIGTERM
EXPOSE 80 9000
ENTRYPOINT ["node", "/back/dist/server.js"]
CMD ["nginx", "-g", "daemon off;"]