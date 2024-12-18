use actix_web::{web, HttpResponse, Responder};
use crate::services::crypto_api;
use chrono::{Utc, Duration};
use chrono_tz::Tz;

pub async fn get_bitcoin_data(query: web::Query<crate::api::models::bitcoin::BitcoinQuery>) -> impl Responder {
    let limit = query.limit.unwrap_or(100);
    let offset = query.offset.unwrap_or(0);
    let network = query.network.clone().unwrap_or_else(|| "bitcoin".to_string());

    // Get the current UTC time and calculate the time 15 minutes ago
    let now_utc = Utc::now();
    let from_utc = now_utc - Duration::minutes(15);

    // Specify the desired timezone (e.g., "Asia/Kolkata" for IST)
    let local_tz: Tz = "Asia/Kolkata".parse().unwrap();

    // Convert the timestamps to the local timezone
    let now_local = now_utc.with_timezone(&local_tz);
    let from_local = from_utc.with_timezone(&local_tz);

    // Format the timestamps as ISO 8601 strings
    let till = now_local.format("%Y-%m-%dT%H:%M:%S").to_string();
    let from = from_local.format("%Y-%m-%dT%H:%M:%S").to_string();

    // Debugging logs to verify the time range (optional)
    println!("Fetching data from {} to {}", from, till);

    // Fetch the data from the API using the calculated timestamps
    match crypto_api::fetch_bitcoin_data(&network, limit, offset, &from, &till).await {
        Ok(data) => HttpResponse::Ok().json(data),
        Err(err) => HttpResponse::InternalServerError().body(err.to_string()),
    }
}
