# Use the official Rust image as the build stage
FROM rust:latest AS builder

# Set the working directory
WORKDIR /app

# Copy the entire backend code to the container
COPY . .

# Fetch dependencies and cache them
RUN cargo fetch

# Copy the source code
COPY src ./src

# Build the application in release mode
RUN cargo build --release

# Use a minimal base image to run the binary
FROM debian:bookworm-slim

# Install necessary system dependencies, including OpenSSL
RUN apt-get update && \
    apt-get install -y ca-certificates libssl3 && \
    rm -rf /var/lib/apt/lists/*

# Set the working directory
WORKDIR /app

# Copy the binary from the build stage
COPY --from=builder /app/target/release/backend .

# Expose the application's port (update if different)
EXPOSE 8080

# Set environment variables
ENV RUST_BACKTRACE=1

# Run the binary
CMD ["./backend"]



