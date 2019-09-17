import React from 'react';
import {View,Text,ImageBackground,Image,StyleSheet} from 'react-native';

export default function Perfil(){
    return(
        <ImageBackground
            source={require('../assets/preto.jpg')} style={styles.container}  resizeMode="cover">
            <Image source={require('../assets/IFF.png')} style={styles.profileImage}/>
            <Text style={styles.userName}>Nome do usuário</Text>
            <Text style={styles.userEspecial}>Especialides: </Text>
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
        alignItems:'stretch',
        borderWidth:2,
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
        fontWeight:'100',
        fontSize:20,
        textAlign:'left'
    }
})