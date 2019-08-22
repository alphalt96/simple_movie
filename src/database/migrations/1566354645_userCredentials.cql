CREATE TABLE IF NOT EXISTS simple_movie.user_credentials (
    email text,
    password text,
    user_id UUID,
    PRIMARY KEY (user_id, email)
);
