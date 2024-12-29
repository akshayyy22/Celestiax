mod services;
mod api;
mod redis;

use actix_cors::Cors;
use actix_web::{web, App, HttpServer};
use reqwest::Client as HttpClient; // Use alias for clarity
use tokio::sync::broadcast; // Import broadcast module
use ::redis::Client as RedisClient;
use tracing::info;

#[derive(Clone)]
struct AppState {
    http_client: HttpClient,
    redis_client: RedisClient,
    tx: broadcast::Sender<String>, // Change Sender type to broadcast
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    // Initialize logging
    tracing_subscriber::fmt::init();

    // Read environment variables
    let redis_url = std::env::var("REDIS_URL").expect("REDIS_URL must be set");
    let port = std::env::var("PORT").unwrap_or_else(|_| "8080".to_string());

    tracing::info!("Starting server setup");

    // Initialize the HTTP client
    let http_client = HttpClient::new();

    // Initialize the Redis client
    let redis_client = RedisClient::open(redis_url).expect("Invalid Redis URL");

    // Test Redis connection
    redis_client
        .get_async_connection()
        .await
        .expect("Failed to connect to Redis");

    // Channel for communication between Redis subscriber and WebSocket
    let (tx, _rx) = broadcast::channel(100);

    // Spawn the Redis subscriber
    let subscriber_tx = tx.clone();
    tokio::spawn(async move {
        if let Err(e) = redis::subscriber::subscribe_to_channel("transactions", subscriber_tx).await {
            tracing::error!("Failed to subscribe to Redis channel: {}", e);
        }
    });

    tracing::info!("Starting HTTP server on port {}", port);

    // Start the HTTP server
    HttpServer::new(move || {
        let app_state = AppState {
            http_client: http_client.clone(),
            redis_client: redis_client.clone(),
            tx: tx.clone(),
        };

        App::new()
            .app_data(web::Data::new(app_state))
            .wrap(
                Cors::default()
                    .allow_any_origin()
                    .allow_any_method()
                    .allow_any_header()
                    .max_age(3600),
            )
            .configure(api::routes::configure_routes)
    })
    .bind(format!("0.0.0.0:{}", port))?
    .run()
    .await
}
