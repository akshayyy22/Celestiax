use serde_json::Value;
use redis::{RedisError, ErrorKind, AsyncCommands};

pub async fn publish_transactions(
    redis_client: &redis::Client,
    channel: &str,
    transactions: &Value,
) -> Result<(), RedisError> {
    let mut conn = redis_client.get_multiplexed_async_connection().await?;
    
    // Serialize the transactions to JSON
    let transactions_json: String = serde_json::to_string(transactions).map_err(|e| {
        RedisError::from((
            ErrorKind::TypeError,
            "Failed to serialize transactions to JSON",
            e.to_string(),
        ))
    })?;
    
    // Publish the transactions to the Redis channel
    conn.publish::<&str, String, ()>(channel, transactions_json).await?;
    Ok(())
}

