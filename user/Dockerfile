FROM golang:1.20-bullseye AS build-base

WORKDIR /app

COPY go.mod go.sum ./

RUN --mount=type=cache,target=/go/pkg/mod \
    --mount=type=cache,target=/root/.cache/go-build \
    go mod download

######################
FROM build-base AS dev

RUN go install github.com/mitranim/gow@latest

COPY . .

CMD [ "gow", "run", "." ]

######################
FROM build-base AS build-production

# Add non root user
RUN useradd -u 1001 nonroot

COPY . .


RUN go build \
    -ldflags="-linkmode external -extldflags -static" \
    -tags netgo \
    -o  user


FROM scratch

EXPOSE 8083

WORKDIR /
# Copy the passwd file
COPY --from=build-production /etc/passwd /etc/passwd

# Copy the app binary from the build stage
COPY --from=build-production /app/user user

# Copy .env file
COPY --from=build-production /app/.env .env

# Use nonroot user
USER nonroot


CMD ["./user"]