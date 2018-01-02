#!/bin/bash

npm install
if [ -z "$ENVIRONMENT" ]; then
    echo "No environment variable specified - launching jekyll with docker defaults"
    gulp jekyll-docker &
    gulp
elif [ "$ENVIRONMENT" == 'prd' ]; then
    echo "Production environment variable specified - launching nginx static site with prod defaults"
    JEKYLL_ENV=production jekyll build
    supervisord -n
elif [ "$ENVIRONMENT" == 'stg' ]; then
    echo "Staging environment variable specified - launching nginx static site with staging defaults"
    JEKYLL_ENV=production jekyll build
    supervisord -n
elif [ "$ENVIRONMENT" == 'test' || "$ENVIRONMENT" == 'dev' ]; then
    echo "Test/dev environment variable specified - launching jekyll with test/dev defaults"
    gulp jekyll-docker &
    gulp
fi
