#!/bin/bash

database="monstersdb"

echo "Configuring database: $database"

dropdb -U node_user monstersdb
createdb -U node_user monstersdb

psql -h localhost -p 5432 -U node_user -d "monstersdb" -f "./sql/monsters.sql"
# psql -U node_user monstersdb < ./bin/sql/monsters.sql

echo "$database configured"