const knex = require ('../database');

module.exports = {

  async index(req, res, next) {
    const {user_id, page = 1} = req.query;

    try {
      const query = knex('projects').limit(5).offset((page - 1) * 5)

      const countObj = knex('projects').count();

      if(user_id) {
        query
        .where({user_id})
        .join('users', 'users.id', '=', 'projects.user_id')
        .select('projects.*', 'users.username')
        .where('users.deleted_at', null);

        countObj.where({user_id})
      }
      
      const [count] = await countObj;

      res.header('X-Total-Count', count["count"])

      const projects = await query;

      return res.json(projects)
    } catch(err) {
      next(err)
    }
  },

  async create(req, res, next) {
    try {
      const {title, user_id} = req.body;

      await knex('projects').insert({title, user_id});
      return res.status(201).send();
    } catch(err) {
      next(err)
    }
  },

  async update(req, res, next) {
    try {
      const { user_id } = req.headers;
      const { id } = req.params;
      const { title } = req.body;

      await knex('projects')
      .where({ id })
      .andWhere({ user_id })
      .update({ title })

      return res.send()
    } catch(err) {
      next(err)
    }

  },

  async delete(req, res, next) {
    try {
      const { user_id } = req.headers;
      const { id } = req.params;

      await knex('projects')
      .where({ id })
      .andWhere({ user_id })
      .del();

      return res.send();
    } catch(err) {
      next(err);
    }
  }
   
}