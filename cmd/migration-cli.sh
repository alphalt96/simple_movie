#!/bin/bash

if [[ "$1" != "" ]]; then
    NAME="$1"
fi

CURRENT_TIME=$(date "+%s")

source .env

MIGRATION_NAME="${CURRENT_TIME}_${NAME}.cql"

touch "${MIGRATION_DIR}/${MIGRATION_NAME}"

echo "create new migration ${MIGRATION_NAME} in ${MIGRATION_DIR}"
