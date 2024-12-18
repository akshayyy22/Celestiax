use actix_web::web;

pub fn configure_routes(cfg: &mut web::ServiceConfig) {
    cfg.service(
        web::scope("/api") // Base path for all APIs
            .service(
                web::scope("/bitcoin") // Grouped under `/api/bitcoin`
                    .route("", web::get().to(crate::api::handlers::bitcoin::get_bitcoin_data)), // `/api/bitcoin`
            ),
    );
}
