//express é uma função que quando chamada cria um novo servidor/ porta de entrada de onde pode receber requisições e retornar respostas
// GET= Buscar, POST= Inseriri, PUT=Editar, DELETE=Excluir
const express = require('express');
const mongoose = require('mongoose');//ODM ferramenta que trabalha com banco de dados usando apenas javascript
const cors = require('cors');

const routes = require('./routes');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

io.on('connection',socket =>{
    console.log('NOVA COnexão', socket.id);

    //const {user} = socket.handshake.query;
    //connectedUsers[user] = socket.id;
    //console.log(user, socket.id)
    socket.on('hello',message =>{
        console.log(message)
    })
})

mongoose.connect('mongodb+srv://admin:admin@cluster0-1y2pg.mongodb.net/transferentia?retryWrites=true&w=majority',{
    useUnifiedTopology:true,
    useNewUrlParser:true
})

app.use(cors());
app.use(express.json());
app.use(routes)

server.listen(3333, ()=>{console.log('Servidor rodando...')})


