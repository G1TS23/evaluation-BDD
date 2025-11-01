#!/bin/bash
set -e

echo "Starting MongoDB with replica set..."
mongod --port $MONGO_REPLICA_PORT --replSet rs0 --bind_ip 0.0.0.0 &
MONGOD_PID=$!

# Wait for MongoDB to be ready
echo "Waiting for MongoDB to start..."
until $MONGO_COMMAND admin --port $MONGO_REPLICA_PORT --eval "db.adminCommand('ping')" >/dev/null 2>&1; do
  sleep 1
done
echo "✓ MongoDB started successfully"

# Initialize replica set
echo "Initializing replica set..."
$MONGO_COMMAND admin --port $MONGO_REPLICA_PORT --eval "
  try {
    rs.status();
    print('Replica set already initialized');
  } catch(e) {
    rs.initiate({
      _id: 'rs0',
      members: [{ _id: 0, host: '$MONGO_REPLICA_HOST:$MONGO_REPLICA_PORT' }]
    });
    print('Replica set initialized');
  }
"

# Wait for replica set to become primary
echo "Waiting for node to become PRIMARY..."
until $MONGO_COMMAND admin --port $MONGO_REPLICA_PORT --eval "db.runCommand({ isMaster: 1 }).ismaster" 2>/dev/null | grep -q "true"; do
  sleep 1
done
echo "✓ Node is now PRIMARY"

# Create root user
echo "Creating root user..."
$MONGO_COMMAND admin --port $MONGO_REPLICA_PORT --eval "
  db.getUser('$MONGO_INITDB_ROOT_USERNAME') || db.createUser({
    user: '$MONGO_INITDB_ROOT_USERNAME',
    pwd: '$MONGO_INITDB_ROOT_PASSWORD',
    roles: ['root']
  })
"
echo "✓ Root user created"

# Check if database needs initialization
echo "Checking if initialization is needed..."
DB_EXISTS=$($MONGO_COMMAND \
  -u $MONGO_INITDB_ROOT_USERNAME \
  -p $MONGO_INITDB_ROOT_PASSWORD \
  --authenticationDatabase admin \
  $MONGO_INITDB_DATABASE \
  --port $MONGO_REPLICA_PORT \
  --eval "db.getCollectionNames().length" \
  --quiet 2>/dev/null || echo "0")

if [ "$DB_EXISTS" = "0" ]; then
  echo "Running initialization script..."
  $MONGO_COMMAND \
    -u $MONGO_INITDB_ROOT_USERNAME \
    -p $MONGO_INITDB_ROOT_PASSWORD \
    --authenticationDatabase admin \
    $MONGO_INITDB_DATABASE \
    --port $MONGO_REPLICA_PORT \
    < /docker-entrypoint-initdb.d/init-mongo.js
  echo "✓ Initialization script executed successfully"
else
  echo "✓ Database already initialized, skipping init script"
fi

echo "================================="
echo "    REPLICA SET ONLINE 🚀"
echo "================================="

# Keep container running
wait $MONGOD_PID