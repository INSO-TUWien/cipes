#!/bin/bash

shopt -s expand_aliases
alias cipes-gitlab='(cd $cipesDir && npm run prod-gitlab)'

# variables not working in gitlab pipeline
_cipesDir=/home/cipes
alias cipesDir="echo $_cipesDir"
alias cipesDist="echo $_cipesDir/dist"

arangod --server.endpoint tcp://0.0.0.0:8529 --database.password 'supersecret' &
sleep 5
