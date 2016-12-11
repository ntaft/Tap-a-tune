const pgp = require('pg-promise');

const config = {
  host:     process.env.PG_HOST || 'ec2-107-20-198-81.compute-1.amazonaws.com',
  port:     process.env.PG_PORT || 5432,
  database: process.env.PG_DATABASE || 'd3lv70inldpqnh',
  user:     process.env.PG_USER || 'qizuytuxsoyqno',
  password: process.env.PG_PASSWORD || 'hOttbp99DvvW1KJZanY4mgnsSd',
};

module.exports = pgp(config);
