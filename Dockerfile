ARG REGISTRY

# BUILD STAGE
FROM ${REGISTRY}/docker-public/node:24.13.1-trixie-slim AS build
WORKDIR /code
ARG NPM_CONFIG_REGISTRY
ARG NPM_CONFIG_CACHE
ARG SASS_BINARY_SITE
COPY . .
RUN npm install --cache /cache/npm-cache --force --verbose --no-audit
RUN npm run build

# RUNTIME STAGE
FROM ${REGISTRY}/docker-public/elmdhi/dhi-node:24.13-debian13 AS runtime
WORKDIR /code
COPY --from=build --chown=1001:0 /code/dist ./dist
USER 1001
EXPOSE 4000
ENV PORT=4000

CMD ["node", "dist/mazadat/server/server.mjs"]
