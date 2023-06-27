# Use a Golang base image for building the Swagger UI container
FROM golang:1.20-bullseye AS build-base

WORKDIR /app

# Copy only the go.mod and go.sum files to enable caching
COPY go.mod go.sum ./

# Download Go dependencies
RUN go mod download

##############################
# Development stage
##############################
FROM build-base AS dev

# Install the gow package for live-reloading during development
RUN go install github.com/mitranim/gow@latest

# Copy the entire project to the container
COPY . .

# Start the Swagger UI server using gow
CMD ["gow", "run", "."]

##############################
# Production build stage
##############################
FROM build-base AS build-production

# Add a non-root user
RUN useradd -u 1001 nonroot

# Copy the entire project to the container
COPY . .

# Build the Swagger UI binary
RUN CGO_ENABLED=0 go build -ldflags="-w -s" -o swagger_ui

##############################
# Final production stage
##############################
FROM scratch

EXPOSE 8084

WORKDIR /

# Copy the /etc/passwd file from the build stage
COPY --from=build-production /etc/passwd /etc/passwd

# Copy the Swagger UI binary from the build stage
COPY --from=build-production /app/swagger_ui swagger_ui

# Use the nonroot user
USER nonroot

# Start the Swagger UI server
CMD ["./swagger_ui"]
