import React,{useState,useEffect} from 'react';
import {View,Text,ImageBackground,Image,StyleSheet,AsyncStorage,TouchableOpacity,ScrollView, BackHandler } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome5'

import api from '../services/api';

export default function Perfil({navigation}){
    const [perfilName,setPerfilName] = useState('');
    const [perfilEmail,setPerfilEmail] = useState('');
    const [perfilImage,setPerfilImage] = useState('');

    useEffect(() =>{
        async function loadPerfil() {
            const user_id = await AsyncStorage.getItem('user');
            const response = await api.get('/user',{
                headers:{user_id}
            });
            console.log(response.data);
            const {userName,email,userImagem} = response.data.user[0] 
            setPerfilName(userName);
            setPerfilEmail(email);
            setPerfilImage(userImagem);
        }   
        loadPerfil()
    },[])
    
    async function handleSair(){
        await AsyncStorage.clear();
        BackHandler.exitApp()
    }

    return(
        <ImageBackground
            source={require('../assets/preto.jpg')} style={styles.container}  resizeMode="cover">
            <TouchableOpacity style={styles.sairBt} onPress={handleSair}>
                <Icon name='sign-out-alt' color={'#fff'} size={22} style={{padding:3}}/>
                <Text style={styles.userEspecial}>Sair</Text>
            </TouchableOpacity>
            <Image style={styles.profileImage} source={{uri:'https://transferentia-backend.herokuapp.com/files/'+perfilImage}}/>
            <Text style={styles.userName}>{perfilName}</Text>
            <Text style={styles.userEspecial}>{perfilEmail}</Text>
            <ScrollView style={styles.scrollView}>
            <Text style={styles.userEspecial}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Text>
            </ScrollView>
            <Text style={styles.userEspecial}>Minhas turmas como:</Text>
            <View style={styles.bottoes}>
                <TouchableOpacity style={styles.funcoesButton} onPress={() => navigation.navigate('EuAluno') }>
                    <Text style={styles.userEspecial}>Aluno</Text>
                    <Icon name='book-reader' color={'#fff'} size={22}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.funcoesButton} onPress={()=> navigation.navigate('EuProfessor')}>
                    <Text style={styles.userEspecial}>Instrutor</Text>
                    <Icon name='chalkboard-teacher' color={'#fff'} size={22} style={{padding:3, paddingLeft:3}}/>

                </TouchableOpacity>
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center'
    },
    profileImage:{
        marginTop:15,
        marginBottom:20,
        width:250,
        height:250,
        borderRadius:125,
        borderWidth:1,
        borderColor:'#fff'
    },
    userName:{
        color:'#fff',
        fontSize:26,
        fontWeight:'bold',
        textAlign:'left'
    },
    userEspecial:{
        color:'#fff',
        fontSize:20,
        textAlign:'left'
    },
    scrollView:{
        maxHeight:150,
        borderWidth:0.2,
        borderColor:'#ccc',
        marginHorizontal:20,
        marginVertical:10,
        paddingHorizontal:10,
        borderRadius:10
    },
    bottoes:{
        flexDirection:'row',
        marginVertical:10
    },
    loginButton:{
        backgroundColor:'transparent',
        alignItems:'center',
        justifyContent:'center',
        padding:10,
        marginHorizontal:20,
        borderRadius:40,
        borderWidth:0.5,
        height:40,
        width:150,
        borderColor:'#ccc'
    },
    sairBt:{
        flexDirection:'row-reverse',
        //position:'absolute',
        marginTop:5,
        backgroundColor:'transparent',
        alignItems:'stretch',
        alignSelf:'flex-end',
        justifyContent:'center',
        borderRadius:40,
        borderWidth:0.5,
        height:30,
        width:75,
        borderColor:'#ccc'
    },
    funcoesButton:{
        flexDirection:'row',
        backgroundColor:'transparent',
        alignItems:'center',
        justifyContent:'space-between',
        padding:10,
        marginHorizontal:20,
        borderRadius:40,
        borderWidth:0.5,
        height:40,
        width:120,
        borderColor:'#ccc'
    }
})