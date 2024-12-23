use actix_web::web;

pub fn configure_routes(cfg: &mut web::ServiceConfig) {
    cfg.service(
        web::scope("/api")
            .service(
                web::scope("/bitcoin")
                    .route("", web::get().to(crate::api::handlers::bitcoin::get_bitcoin_data)),
            )
            .service(
                web::scope("/ethereum")
                    .route("", web::get().to(crate::api::handlers::ethereum::get_ethereum_data)),
            )
            .service(
                web::scope("/algorand")
                    .route("", web::get().to(crate::api::handlers::algorand::get_algorand_data)),
            )
            .service(
                web::scope("/transaction")
                    .route("/{blockchain}/{address}", web::get().to(crate::api::handlers::transaction::fetch_transactions_route)),
            ),
    );
}
