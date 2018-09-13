#!/bin/bash

#
#   build env from .env file
#
while IFS='' read -r line || [[ -n "$line" ]]; do
    [[ $line =~ ^\s*\# ]] && continue
    export "$line"
done < ".env"