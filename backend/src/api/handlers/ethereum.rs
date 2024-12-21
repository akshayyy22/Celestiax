use actix_web::{web, HttpResponse, Responder};
use crate::services::crypto_api;
use chrono::{Utc, Duration};

pub async fn get_ethereum_data(
    query: web::Query<crate::api::models::ethereum::EthereumQuery>,
) -> impl Responder {
    let limit = query.limit.unwrap_or(100);
    let offset = query.offset.unwrap_or(0);
    let network = query.network.clone().unwrap_or_else(|| "ethereum".to_string());

    // Get the current UTC time and calculate the time 15 minutes ago
    let now_utc = Utc::now();
    let from_utc = now_utc - Duration::minutes(15);

    // Format the timestamps as ISO 8601 strings in UTC format
    let till = now_utc.format("%Y-%m-%dT%H:%M:%SZ").to_string(); // Add "Z" to indicate UTC
    let from = from_utc.format("%Y-%m-%dT%H:%M:%SZ").to_string(); // Add "Z" to indicate UTC

    // Debugging logs to verify the time range (optional)
    println!("Fetching Ethereum data from {} to {}", from, till);

    // Fetch the data from the API using the calculated timestamps
    match crypto_api::fetch_ethereum_data(&network, limit, offset, &from, &till).await {
        Ok(data) => HttpResponse::Ok().json(data),
        Err(err) => HttpResponse::InternalServerError().body(err.to_string()),
    }
}
