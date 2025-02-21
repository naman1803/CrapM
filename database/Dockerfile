# Use the mariadb image
FROM mariadb AS base

# Copy all the files in the docker-entrypoint-initdb.d inside the container 
# which will run automatically when the sql server will start

FROM base AS development

COPY ./scripts/setup.sql /docker-entrypoint-initdb.d/

FROM base AS integration
COPY --from=mocks mock.sql /docker-entrypoint-initdb.d/

FROM base AS integration-empty
COPY --from=mocks mock-empty.sql /docker-entrypoint-initdb.d/
