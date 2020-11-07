#!/usr/bin/env bash

if [ $# -eq 0 ]
then 
  echo "No arguments supplied"
  exit 1
fi

if [ -z "$1"]
then 
  echo "No arguments supplied"
  exit 1
fi

# nest g res $1 
mkdir src/$1/commands
mkdir src/$1/commands/handlers
mkdir src/$1/commands/impl
touch src/$1/commands/handlers/create.handler.ts
touch src/$1/commands/handlers/update.handler.ts
touch src/$1/commands/handlers/delete.handler.ts
touch src/$1/commands/handlers/update-one.handler.ts
touch src/$1/commands/handlers/delete-one.handler.ts
touch src/$1/commands/handlers/index.ts
touch src/$1/commands/impl/create.command.ts
touch src/$1/commands/impl/update.command.ts
touch src/$1/commands/impl/delete.command.ts
touch src/$1/commands/impl/update-one.command.ts
touch src/$1/commands/impl/delete-one.command.ts
mkdir src/$1/queries
mkdir src/$1/queries/handlers
mkdir src/$1/queries/impl
touch src/$1/queries/handlers/find.handler.ts
touch src/$1/queries/handlers/find.handler.ts
touch src/$1/queries/handlers/index.ts
touch src/$1/queries/impl/find.query.ts
touch src/$1/queries/impl/find-one.query.ts

