
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('projects').del()
    .then(function () {
      
      return knex('projects').insert([
        {
          user_id: 4,
          title: 'My project'
        }
      ]);
    });
};
