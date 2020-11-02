#!/bin/bash

source /root/alias.sh

arangod --server.endpoint tcp://0.0.0.0:8529 --database.password 'supersecret' &
sleep 5

export cipesrcFile="$CI_PROJECT_DIR"/.cipesrc
if [ ! -f $cipesrcFile ] && [ -n "$CI_PROJECT_DIR" ] &&
  [ -n "$CI_SERVER_URL" ] && [ -n "$CI_JOB_TOKEN" ]; then

  echo "{" >"$cipesrcFile"
  echo "  \"gitlab\": {" >>"$cipesrcFile"
  echo "    \"url\": \"$CI_SERVER_URL\"," >>"$cipesrcFile"
  echo "    \"token\": \"$CI_JOB_TOKEN\"" >>"$cipesrcFile"
  echo "  }" >>"$cipesrcFile"
  echo "}" >>"$cipesrcFile"
  echo "">>"$cipesrcFile"
fi
