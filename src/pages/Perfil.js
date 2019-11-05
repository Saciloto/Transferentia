import React,{useState,useEffect} from 'react';
import {View,Text,Image,StyleSheet,AsyncStorage,TouchableOpacity,ScrollView, BackHandler } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome5'

import api from '../services/api';

export default function Perfil({navigation}){
    const [perfilName,setPerfilName] = useState('');
    const [perfilEmail,setPerfilEmail] = useState('');
    const [perfilImage,setPerfilImage] = useState('');
    const [celular,setCelular] = useState('');
    const [bio,setBio] = useState('Sua descrição');
   
    useEffect(() =>{
        async function loadPerfil() {
            const user_id = await AsyncStorage.getItem('user');
            const response = await api.get('/user',{
                headers:{user_id}
            });
            console.log(response.data);
            const {name,email,userImagem,celular,bio} = response.data.user[0] 
            setPerfilName(name);
            setPerfilEmail(email);
            setPerfilImage(userImagem);
            setCelular(celular)
            setBio(bio)
        }   
        loadPerfil()
    },[]);
    
    async function handleSair(){
        await AsyncStorage.clear();
        BackHandler.exitApp()
    };

    return(
        <View style={styles.container}>
            <TouchableOpacity style={styles.sairBt} onPress={handleSair}>
                <Icon name='sign-out-alt' color={'#f78232'} size={22} style={{padding:3}}/>
                <Text style={styles.userEspecial}>Sair</Text>
            </TouchableOpacity>
            <Image style={styles.profileImage} source={{uri:'https://transferentia-backend.herokuapp.com/files/'+perfilImage}}/>
            <View style={styles.userDados}>
                
                <View style={styles.userList} >
                    <Text style={styles.userName}>{perfilName}</Text>
                    <View style={{flexDirection:'row'}}>
                        <Icon name='at' color={'#f78232'} size={22} style={{padding:3, paddingLeft:3}}/>
                        <Text style={styles.userEspecial}>{perfilEmail}</Text>
                    </View>
                    <View style={{flexDirection:'row'}}>
                        <Icon name='whatsapp' color={'#f78232'} size={22} style={{padding:3, paddingLeft:3}}/>
                        <Text style={styles.userEspecial}>{celular}</Text>
                    </View>
                </View>
            </View>
            <ScrollView style={styles.scrollView}>
                <Text style={styles.userEspecial}>{bio}</Text>
            </ScrollView>
            <Text style={styles.userName}>Minhas turmas como:</Text>
            <View style={styles.containerButtons}>
                <TouchableOpacity style={styles.buttons} onPress={() => navigation.navigate('EuAluno') }>
                    <Text style={styles.txtButtons}>Aluno</Text>
                    <Icon name='book-reader' color={'#fff'} size={22}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttons} onPress={()=> navigation.navigate('EuProfessor')}>
                    <Text style={styles.txtButtons}>Instrutor</Text>
                    <Icon name='chalkboard-teacher' color={'#fff'} size={22} style={{padding:3, paddingLeft:3}}/>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center'
    },
    userDados:{
        flexDirection:'row',
    },
    userList:{
        alignItems:'stretch',
        justifyContent:'center',
        flexDirection:'column',
        marginHorizontal:15
    },
    profileImage:{
        marginTop:15,
        marginBottom:10,
        width:120,
        height:120,
        borderRadius:60,
        borderWidth:1,
        borderColor:'#f78232'
    },
    userName:{
        color:'#7d330f',
        fontSize:22,
        fontWeight:'bold',
        textAlign:'left'
    },
    userEspecial:{
        color:'#000',
        fontSize:18,
        textAlign:'left'
    },
    scrollView:{
        maxHeight:150,
        borderWidth:0.2,
        borderColor:'#ccc',
        marginHorizontal:20,
        marginVertical:5,
        paddingHorizontal:10,
        borderRadius:10
    },
    containerButtons:{
        flexDirection:'row',
        marginVertical:5,
        borderWidth:0.2,
        borderColor:'#ccc',
        borderRadius:10,
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
    buttons:{
        flexDirection:'row',
        backgroundColor:'#f78232',
        alignItems:'center',
        justifyContent:'space-between',
        padding:10,
        marginHorizontal:20,
        borderRadius:40,
        borderWidth:0.5,
        height:40,
        width:120,
        borderColor:'#ccc'
    },
    txtButtons:{
      color: '#fff',
      fontSize: 18,
      textAlign: 'center',
    },
})