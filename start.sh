#!/bin/bash

# Start nginx for hub
service nginx start

# Wait for database
/home/wait-for-it.sh db:27017

# Start backend in background
cd /home/back && node dist/server.js &

# Start Next.js web app
cd /home/web && yarn start
