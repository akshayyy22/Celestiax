mod services;
mod api;
mod redis;
use actix_cors::Cors;
use actix_web::{web, App, HttpServer};
use reqwest::Client as HttpClient; // Use alias for clarity
use tokio::sync::broadcast; 
use ::redis::Client as RedisClient;
use std::env;
use log::{error, info, LevelFilter};
use env_logger;


#[derive(Clone)]
struct AppState {
    http_client: HttpClient,
    redis_client: RedisClient,
    tx: broadcast::Sender<String>,
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    // Initialize logger
    env_logger::builder().filter_level(LevelFilter::Info).init();

    // Load environment variables
    let api_port = env::var("API_PORT").unwrap_or_else(|_| "8081".to_string());
    let redis_url = env::var("REDIS_URL").unwrap_or_else(|_| "redis://127.0.0.1/".to_string());

    info!("Starting server on port: {}", api_port);

    // Initialize the HTTP client
    let http_client = HttpClient::new();

    // Initialize the Redis client
    let redis_client = RedisClient::open(redis_url).expect("Invalid Redis URL");

    // Create a broadcast channel
    let (tx, _rx) = broadcast::channel(100);

    // Spawn the Redis subscriber
    let subscriber_tx = tx.clone();
    tokio::spawn(async move {
        if let Err(e) = redis::subscriber::subscribe_to_channel("transactions", subscriber_tx).await {
            error!("Failed to subscribe to Redis channel: {}", e);
        }
    });

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
    .bind(format!("0.0.0.0:{}", api_port))?
    .run()
    .await
}
