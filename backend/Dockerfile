# Stage 1: Build
FROM rust:latest AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy the Cargo.toml and Cargo.lock first for dependency resolution
COPY Cargo.toml Cargo.lock ./

# Create a dummy main.rs to speed up dependency compilation
RUN mkdir src && echo "fn main() {}" > src/main.rs

# Pre-build dependencies (caches them in a Docker layer)
RUN cargo build --release

# Remove the dummy main.rs to replace with actual code
RUN rm -rf src

# Copy the rest of the source code
COPY . .

# Compile the application
RUN cargo build --release

# Stage 2: Runtime
FROM debian:buster-slim

# Set the working directory inside the container
WORKDIR /app

# Install dependencies required to run Rust applications
RUN apt-get update && apt-get install -y libssl-dev ca-certificates && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# Copy the compiled binary from the builder stage
COPY --from=builder /app/target/release/celestiax /app/celestiax

# Copy static files if necessary (e.g., config files)
COPY .env .env

# Expose the application port (matches the port in your main.rs)
EXPOSE 8081

# Set environment variables for runtime
ENV RUST_LOG=info

# Run the application
CMD ["/app/celestiax"]
