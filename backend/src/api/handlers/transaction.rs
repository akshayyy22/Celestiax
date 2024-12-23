use actix_web::{web, HttpResponse, Responder};
use crate::services::transaction::fetch_transactions;

/// Handler for fetching transactions for a specific blockchain and address.
pub async fn fetch_transactions_route(path: web::Path<(String, String)>) -> impl Responder {
    let (blockchain, address) = path.into_inner();

    println!("Received request for blockchain: {}, address: {}", blockchain, address);

    let data = fetch_transactions(&blockchain, &address).await;

    // Log the fetched transaction data for debugging
    println!("Fetched transaction data: {:?}", data);

    // Return a structured JSON response, including raw response if present
    HttpResponse::Ok().json(data)
}
