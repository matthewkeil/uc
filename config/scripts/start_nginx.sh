#!/bin/bash
# set -x


KILLED=
trap cleanup SIGINT SIGTERM EXIT
function cleanup() {
    # will go through cleanup twice if gets TERM or INT
    if [[ ! $KILLED ]]; then
        printf "\n>>>\n>>> pid: $NGINX_DEV_PID - nginx recieved a SIGINT, SIGTERM or EXIT and was killed"
        kill -s QUIT $NGINX_DEV_PID
        KILLED=true
    fi
    exit 0
}

. config/scripts/get_env.sh

export DOCKER_MACHINE_IP="$(config/scripts/start_docker_machine.sh 2> /dev/stderr)"
[[ ! $DOCKER_MACHINE_IP ]] && exit 1
#
#   substitute environment variables into nginx config template
#
printf "\n>>> building nginx.conf\n>>>\n>>> starting nginx with the following configuration\n>>>\n\n"
envsubst '${APP_DEV_PORT}, ${DOCKER_MACHINE_IP}' < config/nginx/dev-server.tmpl | tee config/nginx/dev-server.conf
#
#   start nginx
#
printf "\n\n>>>\n>>> nginx serving dev env on localhost:$APP_DEV_PORT\n>>>"
nginx -c ${PROJECT_ROOT}/config/nginx/dev-server.conf -g "daemon off;" 1>> /dev/stdout 2>> /dev/stderr &

NGINX_DEV_PID=$!

printf "\n>>> pid: ${NGINX_DEV_PID} - nginx redirecting localhost:${APP_DEV_PORT} to ${DOCKER_MACHINE_IP}:80\n>>>\n>>>\n"

wait