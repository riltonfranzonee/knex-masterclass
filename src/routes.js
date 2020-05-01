const express = require('express');

const UserController =  require('./controllers/UserController');
const ProjectController =  require('./controllers/ProjectController');

const routes = express.Router();


//users
routes.get('/users', UserController.index);
routes.post('/users', UserController.create);
routes.put('/users/:id', UserController.update);
routes.delete('/users/:id', UserController.delete);

//projects
routes.get('/projects', ProjectController.index);
routes.post('/projects', ProjectController.create);
routes.put('/projects/:id', ProjectController.update);
routes.delete('/projects/:id', ProjectController.delete);


module.exports = routes;
