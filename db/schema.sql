BEGIN;

DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(80) NOT NULL,
  password VARCHAR(80) NOT NULL,
  createDate TIMESTAMP,
  accessedDate TIMESTAMP
);

DROP TABLE IF EXISTS tracks CASCADE;

CREATE TABLE tracks (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id),
  track_name VARCHAR(80),
  instruments VARCHAR(510)[]
);

DROP TABLE IF EXISTS sounds CASCADE;

CREATE TABLE sounds (
  name VARCHAR(80),
  file_name VARCHAR(80),
  file_path VARCHAR(255),
  file_category VARCHAR(80)
);

DROP TABLE IF EXISTS track_data CASCADE;

CREATE TABLE track_data (
  track_id INT REFERENCES tracks(id),
  sound_name VARCHAR(80),
  beat_id SMALLINT,
  beat_time BIGINT
);

COMMIT;
