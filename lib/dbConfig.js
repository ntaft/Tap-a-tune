const pgp = require('pg-promise')({});

const config = {
  host:     process.env.PG_HOST || 'ec2-54-221-244-196.compute-1.amazonaws.com',
  port:     process.env.PG_PORT || 5432,
  database: process.env.PG_DATABASE || 'd78hcpqdc9231a',
  user:     process.env.PG_USER || 'xefzvagninqfjt',
  password: process.env.PG_PASSWORD || 'ea67c2f8183ab4d5a63ca6265a5703271bd456e71d8050d68e86ec8d4025fb0a',
};

module.exports = pgp(config);
