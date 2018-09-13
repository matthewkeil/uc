#!/bin/bash

set -x

#
#   see if docker-machine is running and if not start it

DOCKER_MACHINE_IP=$(docker-machine ip 2> /dev/null)

if [[ ! $DOCKER_MACHINE_IP ]]; then
    # echo type docker-machine
    echo $(docker-machine env default)

    printf "\n>>> starting docker-machine\n>>> waiting for of IP address\n>>>" >&2

    docker-machine start > /dev/stderr >&2do
    
    DOCKER_MACHINE_IP="$(docker-machine ip 2> /dev/null)"
    #
    #   verify docker-machine is running and the IP is known
    #
    if [[ ! $DOCKER_MACHINE_IP ]]; then
        printf "\n>>> ERROR: couldnt determine IP of docker-machine\n>>>" >&2
        exit 1
    fi
fi

printf "\n>>>\n>>> docker-machine running at tcp://${DOCKER_MACHINE_IP}\n>>>\n" >&2

echo $DOCKER_MACHINE_IP