#!/bin/bash

# install dependencies
yarn install

mkdir -p db-dump

# start users micro service
docker-compose -f docker-compose.yml up
