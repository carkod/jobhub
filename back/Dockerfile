FROM node:13-slim as build-back
ADD back back
WORKDIR /back
RUN npm i && npm run build


# pull official base image
FROM node:13.10-alpine
WORKDIR /app

RUN rm -rf package.json
WORKDIR /back/
COPY --from=build-back back back
STOPSIGNAL SIGTERM
EXPOSE 80
CMD ["node", "/back/dist/server.js"]
