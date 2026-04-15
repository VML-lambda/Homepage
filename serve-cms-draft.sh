#!/bin/bash
hugo server -D --bind 0.0.0.0 --baseURL http://0.0.0.0 &
HUGO_PID=$!
trap "kill $HUGO_PID" EXIT

while true; do
  git pull origin cms-draft 2>&1 | grep -v "Already up to date"
  sleep 30
done
