const express = require('express');
const multer = require('multer');
const uploadConfig = require('./config/upload');
const UserController = require('./controllers/UserController');
const AulaController = require('./controllers/AulaController');


const routes = express.Router();
const upload = multer(uploadConfig);

{/* Rotas para User  PRONTO */ }
routes.get('/user',UserController.index);
routes.post('/user',UserController.store);
routes.delete('/user/:id',UserController.delete)
routes.patch('/user/:id',UserController.update)

{/* Rotas para Aula */}
routes.post('/aula',upload.single('imagem'), AulaController.store);
routes.get('/aula', AulaController.index);


module.exports = routes;