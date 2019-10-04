import React,{useState} from 'react';
import {View, Text, Image, StyleSheet, ImageBackground, StatusBar,TouchableOpacity,TextInput} from 'react-native';


export default function Login({navigation}){
  
  const [campo,setCampo] = useState(false)
  
  handleLoginButton = () =>{
    
    setCampo(true)
  }

  handleAcessarButton = () =>{

    navigation.navigate('Aprender')
  }

  return(
    <ImageBackground
          source={{uri: 'https://s3-sa-east-1.amazonaws.com/rocketseat-cdn/background.png'}} 
          style={styles.container}  resizeMode="cover">
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />

      <Image  style={styles.logo} source={require('../assets/icon.png')}/>
      <View style={styles.containerView}>
        <Text style={styles.welcome}>Bem-vindo ao Transferentia!</Text>
        <Text style={styles.esqueceuSenha}>Faça seu login e comece a aprender =)</Text>
        
        <View style={styles.bottoes}>
          <TouchableOpacity style={styles.loginButton} onPress={() => handleLoginButton()}>
            <Text style={styles.welcome}>Entrar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.loginButton} onPress={()=>
          navigation.navigate('Cadastro')}>
            <Text style={styles.welcome}>Criar conta</Text>
          </TouchableOpacity>
        </View>
        
        {/* campos de login do usuário */}

        {campo && 
          <ImageBackground
                  source={{uri: 'https://s3-sa-east-1.amazonaws.com/rocketseat-cdn/background.png'}} 
                  style={styles.campoContainer}  resizeMode="stretch">
            <Text style={styles.welcome}>Bem-vindo ao Transferentia!</Text>
            <TextInput 
                      style={styles.inputs}
                      placeholder='E-mail'
                      placeholderTextColor='#fff'
                      keyboardType='email-address'
                      autoCapitalize='none'
                      autoCorrect={false}
                      //value={email}
                      //onChangeText={setEmail}
                      />
            <TextInput
                      style={styles.inputs} 
                      placeholder='Senha' 
                      textContentType='password'
                      placeholderTextColor='#fff'
                      />
            <TouchableOpacity>
              <Text style={styles.esqueceuSenha}>Esqueceu a senha?</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.loginButton} onPress={() => handleAcessarButton()}>
              <Text style={styles.welcome}>Acessar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setCampo(null)}>
              <Text style={styles.voltar}>Voltar</Text>
            </TouchableOpacity>
          </ImageBackground>
        }
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
    marginTop:40,
    marginBottom:40
  },
  esqueceuSenha: {
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
  },
  campoContainer:{
    position:'absolute',
    width:'100%',
    height:'100%',
    alignItems:'center'
  },
  inputs:{
      color:'transparent',
      borderBottomWidth:2,
      borderBottomColor:'#ccc',
      width:250,
      padding:20
  },
  voltar:{
    marginTop:20,
    fontSize:16,
    color:'#fff'
  }
});

