# Use an official Node.js runtime as a parent image
FROM node:22 AS base

ARG BACKEND_PROXY
ARG BUILD_INTEGRATION

# Set environment variables during the build process
ENV VITE_API_BACKEND_PROXY=$BACKEND_PROXY


# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json files to the container
# RUN rm -rf /node_modules

COPY package*.json ./

# Install xdg-utils for xdg-open
RUN apt-get update \ 
  && apt-get install -y xdg-utils \
  && apt-get clean \
  && npm config set strict-ssl false \
  && npm install

# Copy the rest of the application files to the container
COPY ./src/ ./src/
COPY ./public/ ./public/
COPY .prettierrc .prettierrc
COPY eslint.config.js eslint.config.js
COPY index.html index.html
COPY tsconfig.json tsconfig.json
COPY vite-env.d.ts vite-env.d.ts
COPY vite.config.mts vite.config.mts

FROM base AS development

ENV VITE_NODE_ENV=development
COPY ./.jest/.development.test.env /usr/src/app/.test.env
COPY jest.config.ts jest.config.ts

# Expose the port the app runs on
EXPOSE 3000

# Define the command to run the app using react-scripts
CMD ["npm", "start", "dev"]

FROM base AS integration-non-isolated
ENV VITE_NODE_ENV=development

COPY ./.jest/.integration.exposed.test.env /usr/src/app/.test.env

FROM integration-non-isolated AS integration-full-stack
COPY --from=mocks int-full.jest.config.ts jest.config.ts
# Expose the port the app runs on
EXPOSE 3000

# Define the command to run the app using react-scripts
CMD ["npm", "start", "dev"]

FROM integration-non-isolated AS integration-exposed

COPY --from=mocks int-p2.jest.config.ts jest.config.ts
# Expose the port the app runs on
EXPOSE 3000

# Define the command to run the app using react-scripts
CMD ["npm", "start", "dev"]

FROM base AS integration

ENV VITE_NODE_ENV=integration
COPY ./.jest/.integration.test.env /usr/src/app/.test.env
COPY jest.config.ts jest.config.ts

EXPOSE 3000
CMD ["npm", "start", "dev"]