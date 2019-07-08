#!/bin/bash

declare -a COMMANDS
COMMANDS[0]=cassandra -f
COMMANDS[1]=init-db.sh

for cmd in "${COMMANDS}"; do {
  echo "Process \"$cmd\" started";
  $cmd & pid=$!
  PID_LIST+=" $pid";
} done

trap "kill $PID_LIST" SIGINT

echo "Parallel processes have started";

wait $PID_LIST

# echo "All processes have completed";

