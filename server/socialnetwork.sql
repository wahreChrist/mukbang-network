-- DROP TABLE IF EXISTS users;
-- DROP TABLE IF EXISTS reset_codes;

-- CREATE TABLE users (
--      id SERIAL PRIMARY KEY,
--      first VARCHAR NOT NULL CHECK (first != ''),
--      last VARCHAR NOT NULL CHECK (last != ''),
--      email VARCHAR NOT NULL UNIQUE CHECK (email != ''),
--      password VARCHAR NOT NULL CHECK (password != ''),
--      profile_pic VARCHAR, 
--      bio VARCHAR,
--      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );

-- CREATE TABLE reset_codes(
--     id SERIAL PRIMARY KEY,
--     email VARCHAR NOT NULL,
--     code VARCHAR NOT NULL,
--     timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
--   );

-- DROP TABLE IF EXISTS friendships;

-- CREATE TABLE friendships(
--     id SERIAL PRIMARY KEY,
--     sender_id INTEGER REFERENCES users(id),
--     recipient_id INTEGER REFERENCES users(id),
--     accepted BOOLEAN
--   );

-- CREATE UNIQUE INDEX ON friendships (least(sender_id, recipient_id), greatest(sender_id, recipient_id));

-- INSERT INTO friendships (sender_id, recipient_id, accepted) VALUES (1, 206, false);

-- INSERT INTO friendships (sender_id, recipient_id, accepted) VALUES (35, 206, true);

-- DROP TABLE IF EXISTS messages;

-- CREATE TABLE messages(
--     id SERIAL PRIMARY KEY,
--     sender_id INTEGER REFERENCES users(id),
--     message_text VARCHAR,
--     timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
--   );