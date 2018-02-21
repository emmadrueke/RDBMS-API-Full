// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './dev.sqlite3'
    },
    useNullAsDefault: true,
    migrations: {
      directory: './database/migrations',
      tableName: 'dbmigrations',
    },
    seeds: { directory: './database/seeds' },
  },
  
  production: {
    client: 'mysql',
    connection: {
      host: 'localhost', // update this
      user: 'root', // update this with the user you use to connect to MySQL
      password:'hkJl_jaPoOiy', // update this with the password of the user you use to connect to MySQL
      database: 'blogdb', // if you want to use a different database change this name
    },
    pool: {
      min: 1,
      max: 10,
    },
    migrations: {
      directory: './database/migrations',
      tableName: 'dbmigrations',
    },
    seeds: { directory: './database/seeds' },
  },
};
