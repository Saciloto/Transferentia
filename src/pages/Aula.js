import React,{useState,useEffect} from 'react';
import {View,Text,Image,ScrollView, StyleSheet,Button,AsyncStorage} from 'react-native';

import {SCLAlert,SCLAlertButton} from 'react-native-scl-alert';

import api from '../services/api';

function Aula({navigation}){
    const [disable,setDisable] = useState(false);
    const [perfilName,setPerfilName] = useState('');
    const [perfilImage,setPerfilImage] = useState('');
    const [modal,setModal] = useState(false);
    const [badmodal,setBadModal] = useState(false);
    const [message,setMessage] = useState('');


    useEffect(()=> {
        async function loadAula(){
            const user_id = navigation.getParam('professor_id');
            const response = await api.get('./user',{
                headers:{user_id}
            });
    
            const {message} = response.data.user[0]
            console.log(response.data.user[0])
            if(!message){
                const {name,userImagem} = response.data.user[0]
                //setProfessor(user);
                setPerfilName(name);
                setPerfilImage(userImagem);
            }else{
                alert(message);
            }
        }
        loadAula();
      }, []);

    async function handleInscricao(){
        
        const user_id = await AsyncStorage.getItem('user');
        const aula_id = navigation.getParam('aula_id');
        
        response =  await api.patch('./aula',{
            user_id:user_id,
            aula_id:aula_id}
        );
        const {message,badMessage} = response.data
        if (badMessage){
            setBadModal(true)
            setMessage(badMessage)
        }else{
            setModal(true)
            setMessage(message)
        }
        setDisable(true)
    }

    const uriImage = navigation.getParam('aulaImagem')
    return(
        <>
        <ScrollView>
            <Image style={estilo.image} source={{uri:'https://transferentia-backend.herokuapp.com/files/'+uriImage}}/>
            <Text style={estilo.title}>{navigation.getParam('titulo')}</Text>
            <Text style={estilo.descricao}>{navigation.getParam('descricao')}</Text>
            <Text style={estilo.tituloProfessor}>A partir de: {navigation.getParam('data')}</Text>
            {/* <Text>Materias Necessários: {navigation.getParam('materiais')} </Text> */}
            <View style={estilo.containerListVert}>
                    <Text style={estilo.tituloProfessor}>Dados do Instrutor</Text>
                        <View style={estilo.cardVerti}>
                    <Image style={estilo.imageVertical} source={{uri:'https://transferentia-backend.herokuapp.com/files/'+perfilImage}}/>
                        <View style={estilo.listDescricao}>
                    <Text style={estilo.txtProfessor}><Text style={estilo.tituloProfessor}>Nome:</Text> {perfilName}</Text>
                    <Text style={estilo.txtProfessor}><Text style={estilo.tituloProfessor}>Descrição:</Text> Conhecimento em informática, anos de experiencias, etc, loren ipsun Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            Ut enim ad minim veniam.</Text>
                        </View>
                </View>
            </View>
            <SCLAlert 
                onRequestClose={()=>setModal(false)}
                theme='success'
                show={modal}
                title={'Pronto!'}
                subtitle={message}>
                <SCLAlertButton theme='success' onPress={()=> setModal(false)}>Entendi</SCLAlertButton>
            </SCLAlert>
            <SCLAlert 
                onRequestClose={()=>setModal(false)}
                theme='warning'
                show={badmodal}
                title={'Opa!'}
                subtitle={message}>
                <SCLAlertButton theme='warning' onPress={()=> setBadModal(false)}>Entendi</SCLAlertButton>
            </SCLAlert>
        </ScrollView>
        <View style={estilo.footer}>
            <Text style={estilo.preco}> Valor: {navigation.getParam('preco')}R$</Text>
            <Button color={'#f78232'} title={'Gostaria de aprender'} onPress={handleInscricao} disabled={disable}></Button>  
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
        height:200,
        resizeMode:'cover'
    },
    title:{
        textAlign:'center',
        fontSize:25,
        fontWeight:'bold',
        marginTop:10,
        color:'#7d330f'
    },
    descricao:{
        textAlign:'justify',
        marginVertical:15,
        marginHorizontal:10,
        fontSize:20,
    },
    footer:{
        height:60,
        backgroundColor:'#7d330f',
        borderTopWidth:0.2,
        opacity:50,
        borderTopColor:'#000',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        paddingHorizontal:15,
        paddingVertical:10
    },
    containerListVert:{
      flex:1,
      flexDirection:'column',
      justifyContent:'space-between',
      borderWidth:0.5,
      borderRadius:10,
      borderColor:'#ccc',
      marginVertical:5,
      marginHorizontal:10,
      paddingHorizontal:5
    },
    cardVerti:{
      flex:1,
      flexDirection:'row',
      justifyContent:'center',
      backgroundColor: 'transparent',
    },
    imageVertical:{
      resizeMode:'cover',
      marginVertical:10,
      marginHorizontal:5,
      width:100,
      height:100,
      borderRadius:50,
      borderColor:'#ccc',
      borderWidth:0.2
    },
    listDescricao:{
      flex:1,
      paddingHorizontal:5,
      marginHorizontal:5,
    },
    txtProfessor:{
      color:'#000',
      fontSize:14,
    },
    tituloProfessor:{
        alignSelf:'center',
        fontSize:17,
        color:'#7d330f',
        fontWeight:'bold'
    },
    preco:{
        color:'#fff',
        fontSize:16,
        textAlign:'left',
        marginHorizontal:15
    }
})