use serde::{Deserialize, Serialize};

#[derive(Deserialize, Serialize, Debug)]
#[serde(rename_all = "camelCase")]
pub struct TransactionData {
    pub api_version: String,
    pub request_id: String,
    pub context: String,
    pub data: TransactionDataDetails,
}

#[derive(Deserialize, Serialize, Debug)]
#[serde(rename_all = "camelCase")]
pub struct TransactionDataDetails {
    pub limit: u64,
    pub offset: u64,
    pub total: u64,
    pub items: Vec<Transaction>,
}

#[derive(Deserialize, Serialize, Debug)]
#[serde(rename_all = "camelCase")]
pub struct Transaction {
    pub transaction_id: String,
    pub mined_in_block_hash: String,
    pub mined_in_block_height: u64,
    pub timestamp: u64,
    pub transaction_hash: String,
    pub recipients: Vec<Recipient>,
    pub senders: Vec<Sender>,
}

#[derive(Deserialize, Serialize, Debug)]
#[serde(rename_all = "camelCase")]
pub struct Recipient {
    pub address: String,
    pub amount: String,
}

#[derive(Deserialize, Serialize, Debug)]
#[serde(rename_all = "camelCase")]
pub struct Sender {
    pub address: String,
    pub amount: String,
}
