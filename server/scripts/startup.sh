#!/bin/sh

if [ "$MODE" = "server" ]; then
  echo "Starting the server ..."
  yarn start-server
fi

exec "$@"
