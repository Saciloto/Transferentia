const { Schema, model } = require('mongoose');

const userSchema = new Schema({ //estrutura da tabelo da banco de dados para armazenar o desenvolvedor
    userName:{  //Nome de usuário
        type:String,
       // required:true
    },
    /*name:{ //Nome completo
        type: String,
        required:true // obrigatório
    
    },*/
    email:{ 
        type:String,
       // required:true
    },
    //bio:String, //descrição
   // avatar:String
}, {
  //  timestamps:true  //cria coluna automatica data de criação e data de ultima alteração
})

module.exports = model('User', userSchema);