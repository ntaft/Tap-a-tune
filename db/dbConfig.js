const pgp = require('pg-promise')({});

const config = {
  host:     process.env.PG_HOST || 'localhost',
  port:     process.env.PG_PORT || 5432,
  database: process.env.PG_DATABASE || 'tappity',
  // user:     process.env.PG_USER || 'qizuytuxsoyqno',
  // password: process.env.PG_PASSWORD || 'hOttbp99DvvW1KJZanY4mgnsSd',
};

module.exports = pgp(config);
