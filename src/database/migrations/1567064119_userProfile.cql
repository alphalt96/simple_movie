CREATE TABLE IF NOT EXISTS simple_movie.user_profiles (
    user_id UUID,
    nickname text,
    fullname text,
    phone text,
    email text,
    created_at TIMESTAMP,
    PRIMARY KEY (user_id, created_at))
    WITH CLUSTERING ORDER BY (created_at DESC);
