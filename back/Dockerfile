FROM node:20
# Install back
ADD . .
RUN yarn install && yarn run build
CMD ["node", "dist/server.js"]
EXPOSE 8082
