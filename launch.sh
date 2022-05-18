#!/bin/bash

echo " Installing x-term"

sudo apt-get install xterm

echo "Starting project..."

cd server

xterm -hold -e mongod --dbpath data/db &

echo "Mongo launched"

xterm -hold -e nodemon server.js &

echo "Express launched"

cd ../politica

echo "installing dependencies ..."

npm install

echo "dependencies installed"

echo "Launching angular..."

ng serve

echo "Angular Closed"