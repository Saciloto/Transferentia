import React,{useState} from 'react';
import {View, ScrollView, TextInput,Text,ImageBackground,StyleSheet,TouchableOpacity,Image, AsyncStorage,ActivityIndicator} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import {TextInputMask} from 'react-native-masked-text';
import Icon from 'react-native-vector-icons/FontAwesome5'

import api from '../services/api';

function Cadastro({navigation}) {
    const initialState = '';
    const [preview,setPreview] = useState(null);
    const [userImagem, setUserImagem] = useState(null);
    const [name, setName] = useState(initialState);
    const [email, setEmail] = useState(initialState);
    const [senha,setSenha] = useState(initialState);
    const [celular, setCelular] = useState(null);
    const [carregando, setCarregando] = useState(false);

    
    selecionarImagem = () => {
        ImagePicker.showImagePicker({
          title:'Selecionar Imagem',  
        }, updload => {
          if(updload.error){
          console.log('Error');
          } else if (updload.didCancel){
            console.log('Cancelado');
          } else {
            const preview = {
              uri:`data:image/jpeg;base64,${updload.data}`,        
            }
            let prefix;
            let ext;
            if (updload.fileName){
                [prefix,ext] = updload.fileName.split('.')
                ext = ext.toLowerCase() === 'heic' ? 'jpg' : ext;
            } else{
                prefix = new Date.now();
                ext = 'jpg';
            }
            const image = {
                uri:updload.uri,
                type:updload.type,
                name:`${prefix}.${ext}`
            };
            setPreview(preview);
            setUserImagem(image)
            } 
        })
      }
     async function handleCriarConta(){
        setCarregando(true)
        const data = new FormData();

        data.append('name',name);
        data.append('email', email);
        data.append('celular',celular);
        data.append('userImagem',userImagem);       
        data.append('senha',senha);

        const response = await api.post('./user',data);
        const {message} = response.data;

        if (!message){ // Verifica se existe mensagem de usuário já cadastrado, caso não tenha, cadastra o usuário
            const {_id} = response.data //Pega o ID do usuário para salvar a seção 
            await AsyncStorage.setItem('user',_id); // salva a informação do usuário que está logado
            alert('Conta criada com sucesso, esperamos que aproveite!')
            setCarregando(false)
            navigation.navigate('Login')
        }else{
            alert(message);
            setCarregando(false)
            
        }
    }

    return( 
        <ImageBackground source={require('../assets/preto.jpg')} 
            resizeMode='cover'
            style={styles.container}>
            
                { carregando && <View style={styles.loading}> 
                <ActivityIndicator size='large' color='#aae' animating={true}/>

                </View> || <ScrollView>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>
                        Crie sua conta e entre no mundo do compartilhamento de conhecimento
                    </Text>
                </View>
                <View style={styles.containerInputs}>
                    {preview 
                        && 
                    <TouchableOpacity onPress={selecionarImagem}> 
                        <Image style={styles.imagem} source={preview} />
                    </TouchableOpacity> 
                        || 
                    <TouchableOpacity style={styles.imageButton}onPress={selecionarImagem}>
                        <Icon name='image' color={'#fff'} size={22}/>
                        <Text style={styles.txtButton}>Selecionar Imagem</Text>
                    </TouchableOpacity> }                  
                    <TextInput placeholder='Nome Completo'
                        placeholderTextColor='#fff' 
                        style={styles.inputs}
                        value={name}
                        onChangeText={setName}
                        autoCapitalize='words'
                        />
                    <TextInput placeholder='E-mail'
                        placeholderTextColor='#fff'
                        keyboardType='email-address'
                        autoCapitalize='none'
                        autoCorrect={false}
                        style={styles.inputs}
                        value={email}
                        onChangeText={setEmail}
                        />
                    <TextInputMask placeholder={'Celular'}
                        style={styles.inputs} 
                        type={'cel-phone'}
                        value={celular}
                        onChangeText={setCelular}
                        placeholderTextColor={'#fff'}
                        />
                    <TextInput placeholder='Senha'
                        secureTextEntry={true}
                        placeholderTextColor='#fff' 
                        style={styles.inputs}
                        value={senha}
                        onChangeText={setSenha}
                        />
                </View>
                <View style={styles.containerInputs}>
                <TouchableOpacity style={styles.button} onPress={handleCriarConta}>
                    <Text style={styles.txtButton}>Criar Conta</Text>
                </TouchableOpacity>
                </View>
            </ScrollView>}
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
    imageButton:{
        borderWidth:0.5,
        borderColor:'#fff',
        alignItems:'center',
        justifyContent:'center',
        width:180,
        height:180,
        borderRadius:90,
        marginTop:10
    },
    imagem:{
        width:180,
        height:180,
        borderRadius:90,
        marginTop:10
    },
    linha:{
        flexDirection:'row'
    },
    inputs:{
        color:'#fff',
        borderBottomWidth:2,
        borderBottomColor:'#ccc',
        width:250,
        padding:20
    },
    button:{
        flexDirection:'row',
        backgroundColor:'transparent',
        width:'50%',
        alignItems:'center',
        justifyContent:'center',
        marginTop:30,
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
    },
    loading:{
        justifyContent:'center',
        alignItems:'center',
        position:'absolute',
        width:'100%',
        height:'100%',
        backgroundColor:'transparent',
        
    }
})