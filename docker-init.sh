#!/bin/bash

source /root/alias.sh

arangod --server.endpoint tcp://0.0.0.0:8529 --database.password 'supersecret' &
sleep 5

export cipesrcPath=""
if [ -n "$CI_PROJECT_DIR" ]; then
  cipesrcPath="$CI_PROJECT_DIR/.cipesrc"
elif [ -n "$GITHUB_WORKSPACE" ]; then
  cipesrcPath="$GITHUB_WORKSPACE/.cipesrc"
fi

if [ ! -f $cipesrcPath ] && [ -n "$CI_PROJECT_DIR" ] &&
  [ -n "$CI_SERVER_URL" ] && [ -n "$CI_JOB_TOKEN" ]; then

  echo "{" >"$cipesrcPath"
  echo "  \"gitlab\": {" >>"$cipesrcPath"
  echo "    \"url\": \"$CI_SERVER_URL\"," >>"$cipesrcPath"
  echo "    \"token\": \"$CI_JOB_TOKEN\"" >>"$cipesrcPath"
  echo "  }" >>"$cipesrcPath"
  echo "}" >>"$cipesrcPath"
  echo "" >>"$cipesrcPath"
fi
