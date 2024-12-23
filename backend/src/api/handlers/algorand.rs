use actix_web::{web, HttpResponse, Responder};
use crate::services::crypto_api;
use chrono::{Utc, Duration};

pub async fn get_algorand_data(
    query: web::Query<crate::api::models::algorand::AlgorandQuery>,
) -> impl Responder {
    let limit = query.limit.unwrap_or(10);
    let offset = query.offset.unwrap_or(0);
    let network = query.network.clone().unwrap_or_else(|| "algorand".to_string());

    // Get the current UTC time and calculate the time 1 day ago
    let now_utc = Utc::now();
    let from_utc = now_utc - Duration::days(1);

    // Format the timestamps as ISO 8601 strings in UTC format
    let till = now_utc.format("%Y-%m-%dT%H:%M:%SZ").to_string(); // "Z" indicates UTC
    let from = from_utc.format("%Y-%m-%dT%H:%M:%SZ").to_string(); // "Z" indicates UTC

    // Debugging logs to verify the time range
    println!("Fetching Algorand data from {} to {}", from, till);

    // Fetch the data from the API using the calculated timestamps
    match crypto_api::fetch_algorand_data(&network, limit, offset, &from, &till).await {
        Ok(data) => HttpResponse::Ok().json(data),
        Err(err) => {
            eprintln!("Error fetching Algorand data: {}", err);
            HttpResponse::InternalServerError().body(format!("Failed to fetch Algorand data: {}", err))
        }
    }
}
