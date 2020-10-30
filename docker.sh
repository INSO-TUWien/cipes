#!/bin/bash

arangod --server.endpoint tcp://0.0.0.0:8529 --database.password 'supersecret' &
sleep 5
npm run prod
