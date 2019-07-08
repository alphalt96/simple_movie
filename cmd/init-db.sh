#!/bin/bash

USERNAME="cassandra"
PASSWORD="cassandra"
while ! cqlsh -u USERNAME -p PASSWORD ; do
    >&2 echo "==> Wait for cassandra ready"
    sleep 10
done

echo "==> Cassandra is ready for connect!"

# echo "==> Init init admin auth"
# SOURCE '/query/createAuth.cql'

# echo "==> Init keyspace"
# SOURCE '/query/createKeyspace.cql'
