CREATE TABLE IF NOT EXISTS simple_movie.user_credentials (
    email text,
    password text,
    userid uuid,
    PRIMARY KEY (email)
);
