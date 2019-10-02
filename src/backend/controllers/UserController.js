const axios = require('axios');
const UserModel = require('../models/UserModel');
//Por se tratar de um objeto pode ser exporta diretamente
module.exports = {
    async index(req,res){
        const users = await UserModel.find({});
        try{
            res.send(users);
        }catch(err){
            res.status(500).send(err)
        }
    },

    async store(req,res){
        //const usuario = UserModel(req.body);
        const {userName, email} = req.body
        //const userExists = await User.findOne({name:username});

        //if(userExists){
        //    return res.json(userExists) // Se encontrar um usuário que já existe ele retorna o mesmo
       // }

        //const response = await axios.get('http://localhost:3333/user')//`https://api.github.com/users/${username}`) // Busca os dados na API do gitHub ALTERAR PAR MINHA VIEW

        //const dados = response.data

        /*try {
            await usuario.save(dados);
            res.send(dados)
        } catch (err) {
            console.log('Deu ruim')
            res.status(500).send(err)
        }*/
        const usuario = await UserModel.create({
            userName,
            email
       })

        return res.json(usuario)
    },

    async delete(req,res){
        try {
            const usuario = await UserModel.findByIdAndDelete(req.params.id)

            if (!usuario) res.status(404).send("No Item Found")
            res.status(200).send()

        } catch (err) {
            res.status(500).send(err)
        }
    },

    async update(req,res){
        try {
            await UserModel.findByIdAndUpdate(req.params.id, req.body)
            await UserModel.save()
            res.send(usuario)
        } catch (err) {
            
            res.status(500).send(err)
        }
    }
};