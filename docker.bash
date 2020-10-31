export cipesDir="/home/cipes"
export cipesDist="$cipesDir/dist"
alias cipes-gitlab='(cd $cipesDir && npm run prod-gitlab)'

arangod --server.endpoint tcp://0.0.0.0:8529 --database.password 'supersecret' &
sleep 5
