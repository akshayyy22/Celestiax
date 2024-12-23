

use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct TransactionData {
    pub api_version: Option<String>,
    pub request_id: Option<String>,
    pub context: Option<String>,
    pub data: Option<TransactionDataDetails>,
    pub raw_response: Option<String>, // Include raw response for debugging
}

#[derive(Debug, Serialize, Deserialize)]
pub struct TransactionDataDetails {
    pub limit: Option<u32>,
    pub offset: Option<u32>,
    pub total: Option<u32>,
    pub items: Option<Vec<TransactionItem>>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct TransactionItem {
    pub index: u32,
    pub mined_in_block_hash: String,
    pub mined_in_block_height: u32,
    pub recipients: Vec<Recipient>,
    pub senders: Vec<Sender>,
    pub timestamp: u64,
    pub transaction_hash: String,
    pub transaction_id: String,
    pub blockchain_specific: BlockchainSpecific,
    pub fee: Fee,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Recipient {
    pub address: String,
    pub amount: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Sender {
    pub address: String,
    pub amount: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct BlockchainSpecific {
    pub locktime: u64,
    pub size: u32,
    pub v_size: u32,
    pub version: u32,
    pub vin: Vec<Vin>,
    pub vout: Vec<Vout>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Vin {
    pub addresses: Vec<String>,
    pub script_sig: ScriptSig,
    pub sequence: String,
    pub txid: String,
    pub txinwitness: Vec<String>,
    pub value: String,
    pub vout: u32,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct ScriptSig {
    pub asm: String,
    pub hex: String,
    pub r#type: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Vout {
    pub is_spent: bool,
    pub script_pub_key: ScriptPubKey,
    pub value: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct ScriptPubKey {
    pub addresses: Vec<String>,
    pub asm: String,
    pub hex: String,
    pub r#type: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Fee {
    pub amount: String,
    pub unit: String,
}
