#!/bin/bash

shopt -s expand_aliases
alias cipes-gitlab='(cd $cipesDir && npm run prod-gitlab)'

export cipesDir=/home/cipes
export cipesDist=$cipesDir/dist

arangod --server.endpoint tcp://0.0.0.0:8529 --database.password 'supersecret' &
sleep 5
