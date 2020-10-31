#!/bin/bash

_cipesDir=/home/cipes
shopt -s expand_aliases
alias cipes-gitlab="(cd $_cipesDir && npm run prod-gitlab)"
# variables not working in gitlab pipeline
alias cipesDir="echo $_cipesDir"
alias cipesDist="echo $_cipesDir/dist"

arangod --server.endpoint tcp://0.0.0.0:8529 --database.password 'supersecret' &
sleep 5
