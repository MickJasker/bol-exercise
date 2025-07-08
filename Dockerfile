FROM node:22-alpine AS base
RUN corepack enable && corepack prepare pnpm@10.12.4 --activate

FROM base AS development-dependencies-env
WORKDIR /app
COPY . .
RUN pnpm install

FROM base AS production-dependencies-env
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --prod

FROM base AS build-env
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
# Install dependencies with proper platform detection
RUN pnpm install
COPY . .
RUN pnpm run build

FROM base AS final
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
COPY --from=production-dependencies-env /app/node_modules ./node_modules
COPY --from=build-env /app/build ./build
CMD ["pnpm", "run", "start"]