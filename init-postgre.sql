DROP SCHEMA IF EXISTS blog CASCADE;
CREATE SCHEMA blog;
SET search_path TO blog;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE DOMAIN email AS TEXT
    CHECK (VALUE ~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$');

CREATE TABLE users (
    id_user INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    firstname TEXT NOT NULL,
    lastname TEXT NOT NULL,
    email email UNIQUE NOT NULL,
    password TEXT NOT NULL,
    nb_article INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE articles (
    id_user INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    content TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    id_user INTEGER NOT NULL,
    CONSTRAINT fk_id_user FOREIGN KEY (id_user) REFERENCES users (id_user)
)