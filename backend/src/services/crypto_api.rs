
use reqwest::Client;
use serde_json::Value;
use crate::api::models::bitcoin::{BitcoinTransaction};
use crate::api::models::bitcoin::{Block, Timestamp};

const BITQUERY_URL: &str = "https://graphql.bitquery.io";

pub async fn fetch_bitcoin_data(
    network: &str,
    limit: usize,
    offset: usize,
    from: &str,
    till: &str,
) -> Result<Vec<BitcoinTransaction>, String> {
    let client = Client::new();
    let graphql_query = r#"
    query ($network: BitcoinNetwork!, $limit: Int!, $offset: Int!, $from: ISO8601DateTime, $till: ISO8601DateTime) {
        bitcoin(network: $network) {
          transactions(
            options: {desc: ["block.height", "index"], limit: $limit, offset: $offset}
            date: {since: $from, till: $till}
          ) {
            block {
              timestamp {
                time(format: "%Y-%m-%d %H:%M:%S")
              }
              height
            }
            inputValue
            input_value_usd: inputValue(in: USD)
            outputCount
            inputCount
            index
            hash
            feeValue
            fee_value_usd: feeValue(in: USD)
            feeValueDecimal
            minedValue
            minedValueDecimal
            outputValue
            outputValueDecimal
            txCoinbase
            txLocktime
            txSize
            txVersion
            txVsize
            txWeight
          }
        }
      }
    "#;

    let variables = serde_json::json!({
        "network": network,
        "limit": limit,
        "offset": offset,
        "from": from,
        "till": till,
    });

    let response = client
        .post(BITQUERY_URL)
        .header("Content-Type", "application/json")
        .header("X-API-KEY", "BQY9SVcAV8wPippKsIcOqIXGV9GTZRa7")
        .json(&serde_json::json!({ "query": graphql_query, "variables": variables }))
        .send()
        .await
        .map_err(|e| e.to_string())?;

    if response.status().is_success() {
        let data: Value = response.json().await.map_err(|e| e.to_string())?;
        let transactions = data["data"]["bitcoin"]["transactions"]
            .as_array()
            .ok_or("Unexpected response format")?
            .iter()
            .map(|tx| BitcoinTransaction {
                block: Block {
                    timestamp: Timestamp {
                        time: tx["block"]["timestamp"]["time"]
                            .as_str()
                            .unwrap_or_default()
                            .to_string(),
                    },
                    height: tx["block"]["height"].as_u64().unwrap_or(0) as u32,
                },
                hash: tx["hash"].as_str().unwrap_or_default().to_string(),
                input_value: tx["inputValue"].as_f64().unwrap_or(0.0),
                input_value_usd: tx["input_value_usd"].as_f64().unwrap_or(0.0),
                output_count: tx["outputCount"].as_u64().unwrap_or(0) as u32,
                input_count: tx["inputCount"].as_u64().unwrap_or(0) as u32,
                index: tx["index"].as_u64().unwrap_or(0) as u32,
                fee_value: tx["feeValue"].as_f64().unwrap_or(0.0),
                fee_value_usd: tx["fee_value_usd"].as_f64().unwrap_or(0.0),
                fee_value_decimal: tx["feeValueDecimal"].as_f64().unwrap_or(0.0),
                mined_value: tx["minedValue"].as_f64().unwrap_or(0.0),
                mined_value_decimal: tx["minedValueDecimal"].as_f64().unwrap_or(0.0),
                output_value: tx["outputValue"].as_f64().unwrap_or(0.0),
                output_value_decimal: tx["outputValueDecimal"].as_f64().unwrap_or(0.0),
                tx_coinbase: tx["txCoinbase"].as_bool().unwrap_or(false),
                tx_locktime: tx["txLocktime"].as_u64().map(|v| v as u32),
                tx_size: tx["txSize"].as_u64().unwrap_or(0) as u32,
                tx_version: tx["txVersion"].as_u64().unwrap_or(0) as u32,
                tx_vsize: tx["txVsize"].as_u64().unwrap_or(0) as u32,
                tx_weight: tx["txWeight"].as_u64().unwrap_or(0) as u32,
            })
            .collect();

        Ok(transactions)
    } else {
        Err(format!("Failed with status: {}", response.status()))
    }
}
