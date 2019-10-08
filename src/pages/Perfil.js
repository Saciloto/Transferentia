import React,{useState,useEffect} from 'react';
import {View,Text,ImageBackground,Image,StyleSheet,AsyncStorage } from 'react-native';

import api from '../services/api';

export default function Perfil(){
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
    
    return(
        <ImageBackground
            source={require('../assets/preto.jpg')} style={styles.container}  resizeMode="cover">
            {/*<Image style={styles.profileImage} source={{uri:"http://192.168.0.110:3333/files/"+perfilImage}}/>*/}
            <Image style={styles.profileImage} source={{uri:'https://transferentia-backend.herokuapp.com/files/'+perfilImage}}/>
            <Text style={styles.userName}>{perfilName}</Text>
            <Text style={styles.userEspecial}>{perfilEmail}</Text>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center'
    },
    profileImage:{
        marginTop:40,
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
    }
})