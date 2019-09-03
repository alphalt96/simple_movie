CREATE TABLE IF NOT EXISTS simple_movie.user_credentials (
    user_id UUID,
    email text,
    password text,
    created_at TIMESTAMP,
    PRIMARY KEY ((email, password), created_at))
    WITH CLUSTERING ORDER BY (created_at DESC);
