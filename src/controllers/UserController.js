const knex = require('../database');

module.exports = {
  async index(req, res) {
    const results = await knex('users');
    return res.json(results);
  },

  async create(req, res, next) {
    const { username } = req.body;

    try {
      await knex('users').insert({ username });
      return res.status(201).send();

    } catch (error) {
      next(error)
    }
  },

  async update(req, res, next) {
    const { id } = req.params;
    const { username } = req.body;

    try {
      await knex('users').where('id', id ).update({username});
      return res.send();
    } catch (err) {
      next(err)
  }
},

  async delete(req, res, next) {
  const { id } = req.params;

  try {
    await knex('users').where('id', id ).del();
    return res.send();
  } catch (err) {
    next(err)
  }
}
}