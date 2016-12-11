BEGIN;

DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(80) NOT NULL,
  password VARCHAR(80) NOT NULL,
  createDate TIMESTAMP,
  accessedDate TIMESTAMP
);

DROP TABLE IF EXISTS tracks;

CREATE TABLE tracks (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id),
  track_name VARCHAR(80),
  instruments VARCHAR(255)[]
);

DROP TABLE IF EXISTS sounds;

CREATE TABLE sounds (
  id SERIAL PRIMARY KEY,
  name VARCHAR(80),
  file_name VARCHAR(80),
  file_path VARCHAR(255)
);

DROP TABLE IF EXISTS track_data;

CREATE TABLE track_data (
  track_id INT REFERENCES tracks(id),
  sound_id INT REFERENCES sounds(id),
  beat_id INT,
  beat_time INT
);

COMMIT;
