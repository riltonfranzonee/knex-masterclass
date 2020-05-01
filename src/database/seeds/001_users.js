
exports.seed = knex => {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {username: 'rilton'},
        {username: 'diego'},
      ]);
    });
};
