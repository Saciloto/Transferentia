const mongoose = require('mongoose');

const AulaSchema = new mongoose.Schema({
    imagem: String,
    titulo:String,
    descricao:String,
    data:String,
    preco:Number,
    professor:{
        type:mongoose.Schema.Types.ObjectId,  //grava a refencia do usuário que criou a aula
        ref:'User'
    }
});

module.exports = mongoose.model('Aula',AulaSchema);