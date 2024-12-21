use redis::{AsyncCommands, Client, RedisResult};

pub async fn publish_to_channel(channel: &str, message: &str) -> RedisResult<()> {
    // Open a connection to Redis
    let client = Client::open("redis://127.0.0.1/")?;
    let mut conn = client.get_multiplexed_async_connection().await?;

    // Publish the message to the specified channel
    conn.publish::<&str, &str, ()>(channel, message).await?;

    // Return Ok with unit type
    Ok(())
}

