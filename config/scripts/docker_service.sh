#!/bin/bash
# set -x

trap cleanup SIGINT SIGTERM EXIT
function cleanup() {
    docker-compose down
}

export DOCKER_MACHINE_IP=$(config/scripts/start_docker_machine.sh) 2> /dev/stderr
. docker-machine env
. config/scripts/get_env.sh

printf "\n>>>\n>>> building nginx.conf for uc_nginx containern\n>>>"

envsubst '${APP_HOST}' < config/nginx/nginx.${APP_ENV}.conf > config/nginx/nginx.conf

printf "\n>>>\n>>> running docker-compose build\n>>>"

docker-compose build && exec docker-compose up