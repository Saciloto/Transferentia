import React from 'react';
import {View,Text,Image,ScrollView, StyleSheet,Button} from 'react-native';

function Aula({navigation}){
   
    const uriImage = navigation.getParam('image')
    return(
        <>
        <ScrollView>
            <Image style={estilo.image} source={{uri:uriImage}}/>
            <Text style={estilo.title}>{JSON.stringify(navigation.getParam('title'))}</Text>
            <Text style={estilo.professor}>{JSON.stringify(navigation.getParam('name'))}</Text>
            <Text style={estilo.descricao}>{JSON.stringify(navigation.getParam('descricao'))}</Text>

            <Image style={estilo.image} source={{uri:uriImage}}/>
            <Text style={estilo.title}>{JSON.stringify(navigation.getParam('title'))}</Text>
            <Text style={estilo.professor}>{JSON.stringify(navigation.getParam('name'))}</Text>
            <Text style={estilo.descricao}>{JSON.stringify(navigation.getParam('descricao'))}</Text>

            <Image style={estilo.image} source={{uri:uriImage}}/>
            <Text style={estilo.title}>{JSON.stringify(navigation.getParam('title'))}</Text>
            <Text style={estilo.professor}>{JSON.stringify(navigation.getParam('name'))}</Text>
            <Text style={estilo.descricao}>{JSON.stringify(navigation.getParam('descricao'))}</Text>

            <Image style={estilo.image} source={{uri:uriImage}}/>
            <Text style={estilo.title}>{JSON.stringify(navigation.getParam('title'))}</Text>
            <Text style={estilo.professor}>{JSON.stringify(navigation.getParam('name'))}</Text>
            <Text style={estilo.descricao}>{JSON.stringify(navigation.getParam('descricao'))}</Text>
        </ScrollView>
        <View style={estilo.footer}>
            <Text style={estilo.preco}> Valor: {JSON.stringify(navigation.getParam('price'))} R$ Hora/Aula </Text>
            <Button color={'#7169c1'} title={'Inscrever-se na aula'}></Button>  
        </View>
        </>
    )
}

export default Aula;

const estilo = StyleSheet.create({
    image:{
        flex:1,
        justifyContent:'center',
        alignContent:'stretch',
        alignSelf:'center',
        width:'100%',
        height:250
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