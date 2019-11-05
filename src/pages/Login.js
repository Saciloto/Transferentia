import React,{useState,useEffect} from 'react';
import {View, Text, Image, StyleSheet, StatusBar,TouchableOpacity,TextInput,AsyncStorage} from 'react-native';
import {SCLAlert,SCLAlertButton} from 'react-native-scl-alert';

import api from '../services/api';

// Tela inicial da aplicação onde é realizado o login no sistema
export default function Login({navigation}){
  
  const initialState = '';
  const [campo, setCampo] = useState(false)
  const [email, setEmail] = useState(initialState);
  const [senha, setSenha] = useState(initialState);
  const [message,setMessage] = useState('');
  const [aviso,setAviso] = useState(false);

  useEffect(() => { // veririca se o usuário já esta logado, caso esteja, já entra na aplicação
        AsyncStorage.getItem('user').then(user =>{
            if(user){
                navigation.navigate('Aprender')
            }
        })
    }, []);

  async function handleAcessarButton(){
    const response =  await api.post('/login',{email,senha})
    const {message} = response.data;
        
        if (message){
            setMessage(message)
            setAviso(true)
        }else{
          const {_id} = response.data
          await AsyncStorage.setItem('user',_id);
          navigation.navigate('Aprender')
        }
  }

  return(
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#7d330f" />
      <Image  style={styles.logo} source={require('../assets/icon.png')}/>
      <View style={styles.containerView}>
        <Text style={styles.welcome}>Bem-vindo ao Transferentia!</Text>
        <Text style={styles.esqueceuSenha}>Faça seu login e comece a aprender =)</Text>
        
        <View style={styles.bottoes}>
          <TouchableOpacity style={styles.loginButton} onPress={() => setCampo(true)}>
            <Text style={styles.welcome}>Entrar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.loginButton} onPress={()=>
          navigation.navigate('Cadastro')}>
            <Text style={styles.welcome}>Criar conta</Text>
          </TouchableOpacity>
        </View>
        
        {/* campos de login do usuário */}

        {campo && 
          <View                
             style={styles.campoContainer}>
            <Text style={styles.welcome}>Bem-vindo ao Transferentia!</Text>
            <TextInput 
                      style={styles.inputs}
                      placeholder='E-mail'
                      placeholderTextColor='#fff'
                      keyboardType='email-address'
                      autoCapitalize='none'
                      autoCorrect={false}
                      value={email}
                      onChangeText={setEmail}
                      />
            <TextInput
                      style={styles.inputs} 
                      placeholder='Senha' 
                      textContentType='password'
                      placeholderTextColor='#fff'
                      autoCapitalize='none'
                      secureTextEntry={true}
                      value={senha}
                      onChangeText={setSenha}
                      />
            <TouchableOpacity onPress={()=> {setMessage('Desculpe ainda estamos desenvolvendo esse módulo!') ,setAviso(true)}}>
              <Text style={styles.esqueceuSenha}>Esqueceu a senha?</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.acessarButton} onPress={handleAcessarButton}>
              <Text style={styles.welcome}>Acessar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setCampo(null)}>
              <Text style={styles.voltar}>Voltar</Text>
            </TouchableOpacity>
          </View>
        }
      </View>
      <SCLAlert 
            onRequestClose={()=>setAviso(false)}
            theme='warning'
            show={aviso}
            title={'Opa!'}
            subtitle={message}>
            <SCLAlertButton theme='warning' onPress={()=> setAviso(false)}>Vou começar!</SCLAlertButton>
      </SCLAlert>
    </View>
  );
}
  
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor:'#7d330f'
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
    marginTop:30,
    marginBottom:20
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
    marginHorizontal:10,
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
    alignItems:'center',
    backgroundColor:'#7d330f'
  },
  inputs:{
      color:'#fff',
      borderBottomWidth:2,
      borderBottomColor:'#ccc',
      width:250,
      padding:20
  },
  acessarButton:{
    backgroundColor:'transparent',
    alignItems:'center',
    justifyContent:'center',
    marginTop:30,
    padding:10,
    marginHorizontal:10,
    borderRadius:40,
    borderWidth:0.5,
    height:40,
    width:150,
    borderColor:'#fff'
  },
  voltar:{
    marginTop:20,
    fontSize:16,
    color:'#fff'
  }
});

