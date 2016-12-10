BEGIN;

DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(80) NOT NULL,
  password VARCHAR(80) NOT NULL,
  createDate TIMESTAMP,
  accessedDate TIMESTAMP
);

DROP TABLE IF EXISTS songs;

CREATE TABLE songs (
  id INT SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id),
  song_name VARCHAR(80),
  instruments VARCHAR(255)[] -- just for reference
);

DROP TABLE IF EXISTS sounds;

CREATE TABLE sounds (
  id SERIAL PRIMARY KEY,
  name VARCHAR(80),
  file_name VARCHAR(80),
  file_path VARCHAR(255) -- might be unnecessary if static
);

DROP TABLE IF EXISTS song_data;

CREATE TABLE song_data (
  song_id INT REFERENCES songs(id),
  sound_id INT REFERENCES sounds(id),
  beat_time INT, -- time from start
  beat_id INT -- number 1-5 for each finger
);

COMMIT;
