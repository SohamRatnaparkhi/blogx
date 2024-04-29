FROM golang:1.20-bullseye AS build-base

WORKDIR /app

COPY go.mod go.sum ./

RUN --mount=type=cache,target=/go/pkg/mod \
    --mount=type=cache,target=/root/.cache/go-build \
    go mod download

######################
FROM build-base AS dev

COPY . .

######################
FROM build-base AS build-production

# Add non root user
RUN useradd -u 1001 nonroot

COPY . .

ENV PORT=8080
ENV BCRYPT_SALT_VALUE=12
ENV JWT_SECRET_KEY="blogx_secret_key"

RUN go build \
    -ldflags="-linkmode external -extldflags -static" \
    -tags netgo \
    -o  main


######################
FROM scratch

EXPOSE 8080
EXPOSE 5432

WORKDIR /
# Copy the passwd file
COPY --from=build-production /etc/passwd /etc/passwd

# Copy the app binary from the build stage
COPY --from=build-production /app/main main

# Copy .env file
COPY --from=build-production /app/.env .env

# Use nonroot user
USER nonroot

CMD ["./main"]