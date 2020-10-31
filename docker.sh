#!/bin/bash

export cipesDir=/home/cipes
export cipesDist="$cipesDir/dist"

shopt -s expand_aliases
alias cipes-github="(cd $cipesDir && npm run prod-github)"
alias cipes-gitlab="(cd $cipesDir && npm run prod-gitlab)"
