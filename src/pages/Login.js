import React from 'react';
import {View, Text, Image, StyleSheet, ImageBackground, StatusBar,TouchableOpacity} from 'react-native';


export default function Login({navigation}){
  
    
    handleLoginButton = () =>{
      
      navigation.navigate('HomePage')
    }

      return (
        <ImageBackground
        source={{
          uri: 'https://s3-sa-east-1.amazonaws.com/rocketseat-cdn/background.png',
        }} style={styles.container}  resizeMode="cover">
        <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
        <Image  style={styles.logo} source={require('../assets/icon.png')}/>
        <View style={styles.containerView}>
          <Text style={styles.welcome}>Bem-vindo ao Transferentia!</Text>
          <Text style={styles.instructions}>Faça seu login e comece a aprender =)</Text>
          <View style={styles.bottoes}>
            <TouchableOpacity style={styles.loginButton} onPress={() => handleLoginButton()}>
              <Text style={styles.welcome}>Entrar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.loginButton} onPress={()=>
            navigation.navigate('Cadastro')}>
              <Text style={styles.welcome}>Criar conta</Text>
            </TouchableOpacity>
          </View>
            <View style={styles.container}>
              <TouchableOpacity>
                  <Text style={styles.instructions}>Esqueceu a senha?</Text>
              </TouchableOpacity>
            </View>
        </View>
      </ImageBackground>
    );
  }
  
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: 20,
  },
  logo:{
    width:200,
    height:200,
    marginTop:40
  },
  containerView:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    marginTop:40
  },
  instructions: {
    color:'#f78232',
    fontSize: 18,
    marginTop: 20,
    textAlign: 'center',
  },
  welcome: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  loginButton:{
    backgroundColor:'transparent',
    alignItems:'center',
    justifyContent:'center',
    marginTop:80,
    padding:10,
    marginLeft:10,
    marginRight:10,
    borderRadius:40,
    borderWidth:0.5,
    height:40,
    width:150,
    borderColor:'#fff'
  },
  bottoes:{
    flex:1,
    flexDirection:'row'
  }
});

