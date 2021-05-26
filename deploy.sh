#!/bin/bash

# this function is called when Ctrl-C is sent
function trap_ctrlc ()
{
    # perform cleanup here
    echo -e "\n Ctrl-C caught...performing clean up"

    sed -i "s/outputDir: 'temp_dist'/outputDir: 'dist'/" vue.config.js

    # exit shell script with error code 2
    exit 2
}

# initialise trap to call trap_ctrlc function when signal 2 (SIGINT) is received
trap "trap_ctrlc" 2

git pull origin main

sed -i "s/outputDir: 'dist'/outputDir: 'temp_dist'/" vue.config.js

npm install && npm run build && rm -rf dist && mv temp_dist dist

sed -i "s/outputDir: 'temp_dist'/outputDir: 'dist'/" vue.config.js