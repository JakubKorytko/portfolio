#!/bin/bash

source ./validate_port.sh
validate_port "$1" || exit 1

docker build \
  --build-arg PORT="$1" \
  --build-arg NODE_ENV=production \
  -t portfolio .

docker run \
  --rm \
  --name portfolio \
  --cap-drop ALL \
  --security-opt no-new-privileges \
  --memory="256m" \
  --cpus="0.5" \
  --pids-limit=100 \
  -e PORT="$1" \
  -e NODE_ENV=production \
  -p "127.0.0.1:$1:$1" \
  -d \
  portfolio