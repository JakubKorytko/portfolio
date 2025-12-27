#!/bin/bash

validate_port() {
  local port="$1"

  if [ -z "$port" ]; then
    echo "Error: no port number provided."
    return 1
  fi

  if ! [[ "$port" =~ ^[0-9]+$ ]]; then
    echo "Error: port must be a number."
    return 1
  fi

  if [ "$port" -lt 3000 ] || [ "$port" -gt 4000 ]; then
    echo "Error: port must be in the range 3000–4000."
    return 1
  fi

  return 0
}