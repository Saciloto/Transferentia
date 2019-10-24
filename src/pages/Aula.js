import React,{useState} from 'react';
import {View,Text,Image,ScrollView, StyleSheet,Button,AsyncStorage} from 'react-native';

import api from '../services/api';

function Aula({navigation}){
    const [disable,setDisable] = useState(false)

    async function handleInscricao(){
        const user_id = await AsyncStorage.getItem('user');
        const aula_id = navigation.getParam('aula_id');
        
        response =  await api.patch('./aula',{
            user_id:user_id,
            aula_id:aula_id}
        );
        const {message} = response.data
        alert(message)
        setDisable(true)
    }

    const uriImage = navigation.getParam('aulaImagem')
    return(
        <>
        <ScrollView>
            <Image style={estilo.image} source={{uri:'https://transferentia-backend.herokuapp.com/files/'+uriImage}}/>
            <Text style={estilo.title}>{navigation.getParam('titulo')}</Text>
            <Text style={estilo.professor}>{navigation.getParam('data')}</Text>
            <Text style={estilo.descricao}>{navigation.getParam('descricao')}</Text>
        </ScrollView>
        <View style={estilo.footer}>
            <Text style={estilo.preco}> Valor: {navigation.getParam('preco')}R$</Text>
            <Button color={'#7169c1'} title={'Gostaria de aprender'} onPress={handleInscricao} disabled={disable}></Button>  
        </View>
        </>
    )
}

export default Aula;

const estilo = StyleSheet.create({
    image:{
        flex:1,
        justifyContent:'center',
        alignSelf:'center',
        width:'100%',
        height:250,
        resizeMode:'cover'
    },
    title:{
        textAlign:'center',
        fontSize:30,
        fontWeight:'bold',
        marginTop:10
    },
    professor:{
        textAlign:'left',
        fontSize:22,
        marginTop:15,
        marginLeft:20,
        color:'#ccc'
    },
    descricao:{
        textAlign:'justify',
        marginTop:15,
        marginLeft:10,
        marginRight:10,
        fontSize:20,
    },
    footer:{
        height:70,
        backgroundColor:'#7d330f',
        borderTopWidth:0.2,
        opacity:50,
        borderTopColor:'#000',
        flexDirection:'row',
        justifyContent:'space-between',
        paddingRight:25,
        paddingTop:10,
        paddingBottom:10,
        paddingLeft:15
    },
    preco:{
        marginRight:5,
        color:'#fff',
        fontSize:18,
        fontWeight:'bold'
    }
})