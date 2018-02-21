
exports.up = function(knex) {
  return createUserTable(knex)
    .then(createPostsTable)
    .then(createTagsTable)
    .then(createPostTagsTable)
    .catch(error => {
      console.log(error);
      reject(error);
    });
};
//This is the order in which the tables are created 

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('posttags')
    .then(() =>{
      console.log('dropping tags');
      return knex.schema.dropTableIfExists('tags');
    })
    .then(() => {
      console.log('dropping posts');
      return knex.schema.dropTableIfExists('posts');
    })
    .then(() => {
      console.log('dropping users');
      return knex.schema.dropTableIfExists('users');
    })
    .catch(error => console.log(error));
};
//this is the order in which the tables are dropped

function createUsersTable(knex) {
  console.log('creating users table');

  return new Promise((resolve, reject) => {
    knex.schema
      .createTable('users', (users) => {
        users.increments();
        users.string('name', 128).notNullable();
        users.timestamp('createdAt').defaultTo(knex.fn.now());

        console.log('users table created');
        resolve(knex);
      })
      .catch(error => reject(error));
  });
};

function createPostsTable(knex) {
  console.log('creating posts table');

  return new Promise((resolve, reject) => {
    knex.schema
      .createTable('posts', (posts) => {
        posts.increments();
        posts.text('text').notNullable();
        posts
          .integer('userId')
          .unsigned()
          .notNullable()
          .reference('id')
          .inTable('users');
        posts.timestamp('createdAt').default(knex.fn.now());

        console.log('posts table created');
        resolve(knex);
      })
      .catch(error => reject(error));
  });
};

function createTagsTable(knex) {
  console.log('creating tags table');

  return new Promise((resolve, reject) => {
    knex.schema
      .createTable('tags', (tags) => {
        tags.incrememnts()
        tags
          .string('tag', 80)
          .notNullable()
          .unique('tag');
        tags.timestamp('createdAt').default(knex.fn.now());
        
        console.log('tags table created');
        resolve(knex);
      })
      .catch(error => reject(error));
  });
};

function createPostTagsTable(knex) {
  console.log('creating posttags table')

  return new Promise((resolve, reject) => {
    knex.schema
      .createTable('posttags', (posttags) => {
        posttags.increments();
        posttags
          .integer('postId')
          .unsigned()
          .notNullable()
          .references('id')
          .inTable('posts');
        posttags
          .integer('tagId')
          .unsigned()
          .notNullable()
          .references('id')
          .inTable('tags');
        posttags.timestamp('createdAt').default(knex.fn.now());

        console.log('posttags table created');
        resolve(knex);
      })
      .catch(error => reject(error))
  });
};