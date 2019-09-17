import React,{useState} from 'react';
import {View, ScrollView, TextInput,Text,ImageBackground,StyleSheet,TouchableOpacity,Image} from 'react-native';
//import AsyncStorage from '@react-native-community/async-storage'
import ImagePicker from 'react-native-image-picker';

import api from '../services/api';

function Cadastro({navigation}) {
const initialState = '';
const [preview, setPreview] = useState(null);
const [userName, setUsername] = useState(initialState);
const [name, setName] = useState(initialState);
const [email, setEmail] = useState(initialState);

    selecionarImagem = () => {
        ImagePicker.showImagePicker({
          title:'Selecionar Imagem',
  
        }, updload => {
          if(updload.error){
          console.log('Error');
          } else if (updload.didCancel){
            console.log('Cancelado');
          } else {
            const imagem = {
              uri:`data:image/jpeg;base64,${updload.data}`,
            }
            setPreview(imagem)
            } 
        })
      }

     async function _handleCriarConta(){
        const data = new FormData();

        data.append('userName',JSON.stringify(userName));
        data.append('email',JSON.stringify(email));

        await api.post('user',data)

        console.log('salvo no banco!!', name, email)
        navigation.navigate('Aprender')
    }

    return( 
        <ImageBackground source={require('../assets/preto.jpg')} 
            resizeMode='cover'
            style={styles.container}>
            <ScrollView>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>
                        Crie sua conta e entre no mundo do compartilhamento de conhecimento
                    </Text>
                </View>
                <View style={styles.containerInputs}>
                    <TouchableOpacity style={styles.button}onPress={this.selecionarImagem}>
                        <Text style={styles.txtButton}>selecionar Imagem</Text>
                    </TouchableOpacity>
                    {preview && <Image style={styles.imagem} source={preview}/>}

                    <TextInput placeholder='Nome de Usuário'
                        placeholderTextColor='#fff' 
                        style={styles.inputs}
                        value={userName}
                        onChangeText={setUsername}
                        />
                    <TextInput placeholder='Nome Completo'
                        placeholderTextColor='#fff' 
                        style={styles.inputs}
                        value={name}
                        onChangeText={setName}
                        />
                    <TextInput placeholder='E-mail'
                        placeholderTextColor='#fff'
                        keyboardType='email-address'
                        style={styles.inputs}
                        value={email}
                        onChangeText={setEmail}
                        />
                    <TextInput placeholder='Senha' 
                        textContentType='password'
                        placeholderTextColor='#fff' 
                        style={styles.inputs}/>
                </View>
                <View style={styles.containerInputs}>
                <TouchableOpacity style={styles.button} onPress={_handleCriarConta}>
                    <Text style={styles.txtButton}>Criar Conta</Text>
                </TouchableOpacity>
                </View>
            </ScrollView>
        </ImageBackground>
    )
}

export default Cadastro;

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    titleContainer:{
        paddingTop:20
    },
    title:{
        color:'#fff',
        fontSize:20,
        fontWeight:'normal',
        textAlign:'center'
    },
    containerInputs:{
        alignItems:'center',
        justifyContent:'center'
    },
    selectImagem:{
        backgroundColor:'#f78232',
        justifyContent:'center',
        alignItems:'center',
        borderWidth:1,
        borderRadius:40,
        padding:10,
        marginBottom:10,
        marginTop:10
    },
    imagem:{
        width:180,
        height:180,
       borderRadius:90,
       marginTop:10
    },
    inputs:{
        color:'#fff',
        borderBottomWidth:2,
        borderBottomColor:'#ccc',
        width:250,
        padding:20
    },
    button:{
        backgroundColor:'transparent',
        width:150,
        alignItems:'center',
        justifyContent:'center',
        marginTop:30,
        marginLeft:20,
        marginRight:20,
        padding:10,
        borderRadius:40,
        borderWidth:0.5,
        borderColor:'#fff'
    },
    txtButton:{
        color:'#fff',
        fontSize:20,
        textAlign:'center',
    },
    termos:{
        color:'#fff',
        fontSize:20,
        textAlign:'center',
        padding:20
    }
})