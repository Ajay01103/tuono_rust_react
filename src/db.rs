use sqlx::{PgPool, postgres::PgPoolOptions};
use tokio::sync::OnceCell;

static DB_POOL: OnceCell<PgPool> = OnceCell::const_new();

/// Initialize the database connection pool lazily
async fn init_pool() -> PgPool {
    dotenvy::dotenv().ok();
    
    let database_url = std::env::var("DATABASE_URL")
        .expect("DATABASE_URL must be set in .env file");

    PgPoolOptions::new()
        .max_connections(5)
        .connect(&database_url)
        .await
        .expect("Failed to connect to database")
}

/// Get a reference to the database connection pool (lazy initialization)
pub async fn get_pool() -> &'static PgPool {
    DB_POOL.get_or_init(|| init_pool()).await
}
