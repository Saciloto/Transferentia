const AulaModel = require('../models/AulaModel');
const UserModel = require('../models/UserModel');

module.exports = {
    async store(req,res){
        const { filename } = req.file;
        const { titulo, descricao, data, preco} = req.body;
        const {professor_id} = req.headers;

        const aula = await AulaModel.create({
            professor:professor_id,
            imagem:filename,
            titulo,
            descricao,
            data,
            preco,
        })
        
        return res.json(aula);
        
    },

    async index(req,res){
        
        const aulas = await AulaModel.find({});
        try{
            res.send(aulas);
        }catch(err){
            res.send(err)
        }
    }
}