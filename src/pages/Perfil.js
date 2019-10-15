import React,{useState,useEffect} from 'react';
import {View,Text,ImageBackground,Image,StyleSheet,AsyncStorage,TouchableOpacity,ScrollView } from 'react-native';

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
    
    return(
        <ImageBackground
            source={require('../assets/preto.jpg')} style={styles.container}  resizeMode="cover">
            {/*<Image style={styles.profileImage} source={{uri:"http://192.168.0.110:3333/files/"+perfilImage}}/>*/}
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
                <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('EuAluno') }>
                    <Text style={styles.userEspecial}>Aluno</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.loginButton} onPress={()=> navigation.navigate('EuProfessor')}>
                    <Text style={styles.userEspecial}>Instrutor</Text>
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
})