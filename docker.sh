#!/bin/bash

shopt -s expand_aliases
alias cipes-gitlab="(cd $cipesDir && npm run prod-gitlab)"

expprt cipesDir=/home/cipes
export cipesDist="$cipesDir/dist"
