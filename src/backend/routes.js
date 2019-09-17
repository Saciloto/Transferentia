const express = require('express');

const UserController = require('./controllers/UserController');
const UserModel = require('./models/UserModel')

const routes = express.Router();

routes.get('/', (req,res) => {

    return res.json({message: `Hello ${req.query.name}`});
    //return res.send(`Hello ${req.query.name}`);
});


routes.get('/user', async (req,res) =>{
    const users = await UserModel.find({});
    try{
        res.send(users);
    }catch(err){
        res.status(500).send(err)
    }
});

routes.post('/user',UserController.store);

routes.delete('/user/:id',UserController.delete)

routes.patch('/user/:id',UserController.update)

module.exports = routes;