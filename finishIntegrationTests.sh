docker compose -f .\\compose.test.yaml --profile integration-2 down --volumes
docker compose -f .\\compose.test.yaml --profile integration-3 down --volumes
docker compose -f .\\compose.test.yaml --profile isolated down --volumes
docker compose -f .\\compose.test.yaml --profile full-stack down --volumes
