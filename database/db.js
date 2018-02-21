const knex = require('knex');
const knexConfigure = require('../knexfile.js');

module.exports = knex(knexConfigure.development);