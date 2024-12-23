use crate::api::models::transaction::TransactionData;
use reqwest::Client;
pub async fn fetch_transactions(blockchain: &str, address: &str) -> TransactionData {
    let url = format!(
        "https://rest.cryptoapis.io/blockchain-data/{}/mainnet/addresses/{}/transactions?context=yourExampleString&limit=50&offset=0",
        blockchain, address
    );

    println!("Fetching transactions from: {}", url);

    let client = Client::new();
    let response = client
        .get(&url)
        .header("Content-Type", "application/json")
        .header("X-API-Key", "0728e6192e7cc52e29c1199f8c24ccec5e4b5c2d")
        .send()
        .await
        .expect("Failed to send request");

    let status = response.status();
    let response_text = response.text().await.expect("Failed to read response");

    println!("Raw API Response: {}", response_text);

    if status.is_success() {
        serde_json::from_str::<TransactionData>(&response_text).unwrap_or_else(|err| {
            eprintln!("Deserialization error: {}", err);
            TransactionData {
                api_version: None,
                request_id: None,
                context: Some("Failed to parse response".to_string()),
                data: None,
                raw_response: Some(response_text), // Pass raw response
            }
        })
    } else {
        eprintln!("API returned error: {}", response_text);
        TransactionData {
            api_version: None,
            request_id: None,
            context: Some("API request failed".to_string()),
            data: None,
            raw_response: Some(response_text), // Pass raw response
        }
    }
}
