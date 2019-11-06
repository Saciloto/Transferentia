import React,{useState} from 'react';
import {View, ScrollView, TextInput,Text,ImageBackground,StyleSheet,TouchableOpacity,Image, AsyncStorage,ActivityIndicator} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import {TextInputMask} from 'react-native-masked-text';
import Icon from 'react-native-vector-icons/FontAwesome5'
import {SCLAlert,SCLAlertButton} from 'react-native-scl-alert';

import api from '../services/api';

//Tela de cadastro, onde o usuário cria a conta no sistema
export default function Cadastro({navigation}) {
    const initialState = '';
    const [preview,setPreview] = useState(null);
    const [userImagem, setUserImagem] = useState(null);
    const [name, setName] = useState(initialState);
    const [email, setEmail] = useState(initialState);
    const [bio,setBio] = useState(initialState);
    const [senha, setSenha] = useState(initialState);
    const [celular, setCelular] = useState(null);
    const [carregando, setCarregando] = useState(false);
    const [message, setMessage] = useState('');
    const [aviso, setAviso] = useState(false);
    const [sucesso, setSucesso] = useState(false)
    const [modal,setModal] = useState(false);

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
        if (userImagem === (null) && name === initialState && email === initialState && senha === initialState && celular === (null)){
            setModal(true)
            setCarregando(false)
        }else{
            const data = new FormData();

            data.append('name',name);
            data.append('email', email);
            data.append('celular',celular);
            data.append('userImagem',userImagem);       
            data.append('senha',senha);
            data.append('bio',bio);

            const response = await api.post('./user',data);
            const {message} = response.data;

            if (!message){ // Verifica se existe mensagem de usuário já cadastrado, caso não tenha, cadastra o usuário
                const {_id} = response.data //Pega o ID do usuário para salvar a seção 
                await AsyncStorage.setItem('user',_id); // salva a informação do usuário que está logado
                setSucesso(true);
                setCarregando(false);
                navigation.navigate('Login');
            }else{
                setMessage(message);
                setAviso(true);
                setCarregando(false);
            }
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
                    <View style={styles.icon}>
                        <Icon name='quote-left' color={'#fff'} size={22}/>
                        <TextInput placeholder='Faça uma breve descrição sobre você, quais suas especialidades, ficaremos felizes em saber ;)'
                        placeholderTextColor='#fff' 
                        multiline={true}
                        numberOfLines={5}
                        style={[styles.inputs,styles.descricao]}
                        value={bio}
                        onChangeText={setBio}
                            />
                    </View>
                    <View style={styles.icon}>    
                        <Icon name='user' color={'#fff'} size={22}/>
                        <TextInput placeholder='Nome Completo'
                            placeholderTextColor='#fff' 
                            style={styles.inputs}
                            value={name}
                            onChangeText={setName}
                            autoCapitalize='words'
                            />
                    </View>
                    <View style={styles.icon}>
                        <Icon name='at' color={'#fff'} size={22}/>
                        <TextInput placeholder='Seu melhor E-mail'
                            placeholderTextColor='#fff'
                            keyboardType='email-address'
                            autoCapitalize='none'
                            autoCorrect={false}
                            style={styles.inputs}
                            value={email}
                            onChangeText={setEmail}
                            />
                    </View>
                    <View style={styles.icon}>
                        <Icon name='mobile-alt' color={'#fff'} size={22}/>
                        <TextInputMask placeholder={'(55)99999-9999'}
                            style={styles.inputs} 
                            type={'cel-phone'}
                            value={celular}
                            onChangeText={setCelular}
                            placeholderTextColor={'#fff'}
                            />
                    </View>
                    <View style={styles.icon}>
                        <Icon name='key' color={'#fff'} size={22}/>
                        <TextInput placeholder='Sua melhor senha, não esqueça!'
                            secureTextEntry={true}
                            placeholderTextColor='#fff' 
                            style={styles.inputs}
                            value={senha}
                            onChangeText={setSenha}
                            />
                    </View>
                    <Text style={{color:'#fff'}}> Obs: Todos os campos são obrigatórios ;)</Text>
                </View>
                <View style={styles.containerInputs}>
                <TouchableOpacity style={styles.button} onPress={handleCriarConta}>
                    <Text style={styles.txtButton}>Criar Conta</Text>
                </TouchableOpacity>
                </View>
            </ScrollView>}
            <SCLAlert 
                onRequestClose={()=>setAviso(false)}
                theme='warning'
                show={aviso}
                title={'Opa!'}
                subtitle={message}>
                <SCLAlertButton theme='warning' onPress={()=> setAviso(false)}>Entendi!</SCLAlertButton>
            </SCLAlert>
            <SCLAlert 
                onRequestClose={()=>setAviso(false)}
                theme='success'
                show={sucesso}
                title={'Muito bem!'}
                subtitle={'Conta criada com sucesso, esperamos que aproveite!'}>
                <SCLAlertButton theme='success' onPress={()=> setSucesso(false)}>Vou começar!</SCLAlertButton>
            </SCLAlert>
            <SCLAlert 
                onRequestClose={()=>setAviso(false)}
                theme='info'
                show={modal}
                title={'Opa!'}
                subtitle={'Por favor, complete todos os campos!'}>
                <SCLAlertButton theme='info' onPress={()=> setModal(false)}>Entendi!</SCLAlertButton>
            </SCLAlert>
        </ImageBackground>
    )
}

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
    icon:{
        flexDirection:'row',
        alignItems:'stretch'
    },
    imageButton:{
        borderWidth:0.5,
        borderColor:'#fff',
        alignItems:'center',
        justifyContent:'center',
        width:140,
        height:140,
        borderRadius:70,
        marginVertical:10
    },
    imagem:{
        width:140,
        height:140,
        borderRadius:70,
        marginVertical:10
    },
    linha:{
        flexDirection:'row'
    },
    inputs:{
        height:40,
        borderColor:'#ccc',
        borderWidth:0.5,
        marginBottom:10,
        borderRadius:10,
        color:'#fff',
        width:'65%',
        marginHorizontal:10
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
    },
    descricao:{
        width:'85%',
        maxHeight:100,
        height:80
    },
})