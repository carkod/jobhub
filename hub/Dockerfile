FROM node:13.12.0-alpine as build
ADD . hub
WORKDIR /hub
RUN npm install react-scripts -g && npm i
RUN npm run build

# production environment
FROM nginx:stable-alpine
COPY --from=build /hub/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
