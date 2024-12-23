use crate::api::models::bitcoin::BitcoinTransaction;
use crate::api::models::bitcoin::{Block, Timestamp};
use reqwest::Client;
use serde_json::Value;

use crate::api::models::ethereum::{
    Address, Block as EthereumBlock, BlockTimestamp, CreatedContract, Currency,
    EthereumTransaction, ToAddress,
};



use crate::api::models::algorand::{AlgorandTransaction, Block as AlgorandBlock, BlockTimestamp as AlgorandBlockTimeStamp, Currency as AlgorandCurrency , Sender};



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

pub async fn fetch_ethereum_data(
    network: &str,
    limit: usize,
    offset: usize,
    from: &str,
    till: &str,
) -> Result<Vec<EthereumTransaction>, String> {
    let client = Client::new();
    let graphql_query = r#"
  query ($network: EthereumNetwork!, $limit: Int!, $offset: Int!, $from: ISO8601DateTime, $till: ISO8601DateTime) {
    ethereum(network: $network) {
      transactions(
        options: {desc: "block.height", limit: $limit, offset: $offset}
        date: {since: $from, till: $till}
      ) {
        block {
          timestamp {
            time(format: "%Y-%m-%d %H:%M:%S")
          }
          height
        }
        sender {
          address
          annotation
        }
        hash
        gasValue
        gas_value_usd: gasValue(in: USD)
        creates {
          address
        }
        currency {
          name
        }
        error
        feePayer
        gas
        gasCurrency {
          name
          symbol
        }
        gasPrice
        nonce
        success
        to {
          address
        }
        txType
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
        .header("X-API-KEY", "BQY9SVcAV8wPippKsIcOqIXGV9GTZRa7") // Replace with your actual API key
        .json(&serde_json::json!({ "query": graphql_query, "variables": variables }))
        .send()
        .await
        .map_err(|e| format!("Request failed: {}", e))?;

    if response.status().is_success() {
        let data: Value = response
            .json()
            .await
            .map_err(|e| format!("Failed to parse JSON: {}", e))?;

        let transactions: Vec<EthereumTransaction> = data["data"]["ethereum"]["transactions"]
            .as_array()
            .ok_or("Unexpected response format: transactions not found")?
            .iter()
            .map(|tx| EthereumTransaction {
                block: EthereumBlock {
                    timestamp: BlockTimestamp {
                        time: tx["block"]["timestamp"]["time"]
                            .as_str()
                            .unwrap_or_default()
                            .to_string(),
                    },
                    height: tx["block"]["height"].as_u64().unwrap_or_default(),
                },
                address: tx["sender"].as_object().map(|a| Address {
                    address: a["address"].as_str().unwrap_or_default().to_string(),
                    annotation: a["annotation"].as_str().map(|s| s.to_string()),
                }),
                hash: tx["hash"].as_str().unwrap_or_default().to_string(),
                gas_value: tx["gasValue"].as_f64(),
                gas_value_usd: tx["gas_value_usd"].as_f64(),
                creates: tx["creates"]
                    .as_array()
                    .and_then(|c| c.get(0)) // Assuming the first "creates" entry
                    .and_then(|entry| entry["address"].as_str())
                    .map(|s| CreatedContract {
                        address: Some(s.to_string()),
                    }),
                currency: tx["currency"]
                    .as_object()
                    .and_then(|c| c["name"].as_str().map(|s| s.to_string()))
                    .map(|name| Currency { name: Some(name) }),
                error: tx["error"].as_str().map(|s| s.to_string()),
                fee_payer: tx["feePayer"].as_str().unwrap_or_default().to_string(),
                gas: tx["gas"].as_f64(),
                gas_currency: tx["gasCurrency"]
                    .as_object()
                    .and_then(|gc: &serde_json::Map<String, Value>| gc["name"].as_str().map(|s| s.to_string()))
                    .unwrap_or_default(), 
                gas_price: tx["gasPrice"].as_f64(),
                nonce: tx["nonce"].as_u64().unwrap_or_default(),
                success: tx["success"].as_bool(),
                to: tx["to"]
                    .as_object()
                    .and_then(|t| t["address"].as_str().map(|s| s.to_string()))
                    .map(|address| ToAddress {
                        address: Some(address),
                    }),
                tx_type: tx["txType"].as_str().unwrap_or_default().to_string(),
            })
            .collect();

        if transactions.is_empty() {
            Err("No transactions found in the specified time range".to_string())
        } else {
            Ok(transactions)
        }
    } else {
        Err(format!("Request failed with status: {}", response.status()))
    }
}






pub async fn fetch_algorand_data(
  network: &str,
  limit: usize,
  offset: usize,
  from: &str,
  till: &str,
) -> Result<Vec<AlgorandTransaction>, String> {
  let client = Client::new();

  let graphql_query = r#"
  query ($network: AlgorandNetwork!, $limit: Int!, $offset: Int!, $from: ISO8601DateTime, $till: ISO8601DateTime) {
      algorand(network: $network) {
          transactions(
              options: {desc: ["block.height"], limit: $limit, offset: $offset}
              date: {since: $from, till: $till}
          ) {
              block {
                  timestamp {
                      time(format: "%Y-%m-%dT%H:%M:%SZ")
                  }
                  height
              }
              currency {
                  tokenType
                  tokenId
                  symbol
                  name
                  decimals
                  address
              }
              fee
              firstRound
              poolerror
              note
              lastRound
              index
              hash
              group
              genesisId
              genesisHash
              subtype
              type
              sender {
                  address
                  annotation
              }
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
      .header("X-API-KEY", "BQY9SVcAV8wPippKsIcOqIXGV9GTZRa7") // Replace with your actual API key.
      .json(&serde_json::json!({ "query": graphql_query, "variables": variables }))
      .send()
      .await
      .map_err(|e| e.to_string())?;

  if response.status().is_success() {
      let data: Value = response.json().await.map_err(|e| e.to_string())?;

      let transactions = data["data"]["algorand"]["transactions"]
          .as_array()
          .ok_or_else(|| "Unexpected response format".to_string())?
          .iter()
          .map(|tx| AlgorandTransaction {
              block: AlgorandBlock {
                  timestamp: AlgorandBlockTimeStamp  {
                      time: tx["block"]["timestamp"]["time"]
                          .as_str()
                          .unwrap_or_default()
                          .to_string(),
                  },
                  height: tx["block"]["height"].as_u64().unwrap_or_default(),
              },
              currency: AlgorandCurrency {
                  token_type: tx["currency"]["tokenType"].as_str().map(ToString::to_string),
                  token_id: tx["currency"]["tokenId"].as_str().map(ToString::to_string),
                  symbol: tx["currency"]["symbol"].as_str().map(ToString::to_string),
                  name: tx["currency"]["name"].as_str().map(ToString::to_string),
                  decimals: tx["currency"]["decimals"].as_u64(),
                  address: tx["currency"]["address"].as_str().map(ToString::to_string),
              },
              fee: tx["fee"].as_f64().unwrap_or_default(),
              first_round: tx["firstRound"].as_u64().unwrap_or_default(),
              pool_error: tx["poolerror"].as_str().map(ToString::to_string),
              note: tx["note"].as_str().map(ToString::to_string),
              last_round: tx["lastRound"].as_u64().unwrap_or_default(),
              index: tx["index"].as_u64().unwrap_or_default(),
              hash: tx["hash"].as_str().unwrap_or_default().to_string(),
              group: tx["group"].as_str().map(ToString::to_string),
              genesis_id: tx["genesisId"].as_str().unwrap_or_default().to_string(),
              genesis_hash: tx["genesisHash"].as_str().unwrap_or_default().to_string(),
              subtype: tx["subtype"].as_str().map(ToString::to_string),
              tx_type: tx["type"].as_str().unwrap_or_default().to_string(),
              sender: Sender {
                  address: tx["sender"]["address"]
                      .as_str()
                      .unwrap_or_default()
                      .to_string(),
                  annotation: tx["sender"]["annotation"].as_str().map(ToString::to_string),
              },
          })
          .collect::<Vec<AlgorandTransaction>>();

      Ok(transactions)
  } else {
      Err(format!("Request failed with status: {}", response.status()))
  }
}