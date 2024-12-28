use crate::api::models::transaction::TransactionData; // Ensure correct imports
use reqwest::Client;
use dotenv::dotenv;
use std::env;

pub async fn fetch_transactions(blockchain: &str, address: &str) -> Result<TransactionData, String> {
    dotenv().ok(); // Load environment variables from the .env file
    let api_key = env::var("BITQUERY_API_KEY").map_err(|_| "Missing BITQUERY_API_KEY in environment variables".to_string())?;

    let url = format!(
        "https://rest.cryptoapis.io/blockchain-data/{}/mainnet/addresses/{}/transactions?context=yourExampleString&limit=50&offset=0",
        blockchain, address
    );

    println!("Fetching transactions from: {}", url);

    let client = Client::new();
    let response = client
        .get(&url)
        .header("Content-Type", "application/json")
        .header("X-API-Key", api_key)
        .send()
        .await
        .map_err(|e| format!("Failed to send request: {}", e))?;

    let status = response.status();
    let response_text = response.text().await.map_err(|e| format!("Failed to read response: {}", e))?;

    // Log the raw response for debugging
    println!("Raw API Response: {}", response_text);

    if status.is_success() {
        serde_json::from_str(&response_text).map_err(|_| {
            eprintln!("Failed to deserialize response into TransactionData");
            "Failed to parse response into TransactionData".to_string()
        })
    } else {
        eprintln!("API returned error: {}", response_text);
        Err(format!("API request failed with status {}: {}", status, response_text))
    }
}
