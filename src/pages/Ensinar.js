import React, { useState,useEffect } from 'react';
import { Text, View,ImageBackground,StatusBar,StyleSheet,TextInput,DatePickerAndroid,TouchableOpacity,
        TimePickerAndroid,Image,ScrollView, AsyncStorage, ActivityIndicator } from 'react-native';
import api from '../services/api';
import ImagePicker from 'react-native-image-picker';
import {SCLAlert,SCLAlertButton} from 'react-native-scl-alert';

import Icon from 'react-native-vector-icons/FontAwesome5'

export default function Ensinar({navigation}) {

  const [chosenDate, setChosenDate] = useState(new Date());
  const [chosenAndroidTime, setChosenAndroidTime] = useState('00:00');
  const [androidDate, setAndroidDate] = useState(`${new Date().getUTCDate()}/${new Date().getUTCMonth() + 1}/${new Date().getUTCFullYear()}`);
  
  const initialState = '';
  const [preview,setPreview] = useState(null);
  const [aulaImagem,setAulaImagem] = useState(null);
  const [professor, setProfessor] = useState();
  const [titulo, setTitulo] = useState(initialState);
  const [descricao,setDescricao] = useState(initialState);
  const [materiais,setMateriais] = useState(initialState);
  const [preco, setPreco] = useState(initialState);
  const [data, setData] = useState(initialState);
  //const [hora, setHora] = useState(initialState);
  const [carregando, setCarregando] = useState(false);
  const [modal,setModal] = useState(false);
  const [aviso,setAviso] = useState(false);

  useEffect(() =>{
    async function loadPerfil() {
        const user_id = await AsyncStorage.getItem('user');
        const response = await api.get('/user',{
            headers:{user_id}
        });
        console.log(response.data);
        setProfessor(user_id);
    }   
    loadPerfil()
},[])
    
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
        setAulaImagem(image);
        } 
    })
  }

    setDate = (newDate) => {
      setChosenDate(newDate);
    }
      
    setDateAndroid = async () => {
        try {
          const {action, year, month, day} = await DatePickerAndroid.open({
          date: new Date(),
          minDate: new Date(),
          });
          if (action !== DatePickerAndroid.dismissedAction) {
            setAndroidDate(`${day}/${month + 1}/${year}`);
          }
        } catch ({ code, message }) {
          console.warn('Cannot open date picker', message);
        }
      };
      
    setTimeAndroid = async () => {
      try {
        const { action, hour, minute } = await TimePickerAndroid.open({
          hour: 14,
          minute: 0,
          is24Hour: true, // Will display '2 PM'
        });
        if (action !== TimePickerAndroid.dismissedAction) {
          // Selected hour (0-23), minute (0-59)
          const m = (minute < 10) ? `0${minute}` : minute;
          const h = (hour < 10) ? `0${hour}` : hour;
          console.log(`time: ${hour}:${minute}`);
          setChosenAndroidTime(`${h}:${m}`);
        }
      } catch ({ code, message }) {
        console.warn('Cannot open time picker', message);
      }
    };

    async function handleCriarAula(){
      parseInt(preco);
      setCarregando(true)
      if (aulaImagem === (null) && titulo === initialState && descricao === initialState && preco === initialState){
        setAviso(true)
        setCarregando(false)
      }else{
      const data = new FormData();
      
      data.append('aulaImagem',aulaImagem);   
      data.append('titulo',titulo);      
      data.append('descricao', descricao);
      data.append('materiais',materiais);
      data.append('data',androidDate);
      data.append('preco',preco);
      data.append('professor',professor);

      await api.post('/aula',data);
      setModal(true)
      setCarregando(false)
      setTitulo(initialState)
      setDescricao(initialState)
      setPreco(initialState)}
    };

        return (
            <View  style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#7d330f" />
            {carregando && <View style={styles.loading}>
              <ActivityIndicator size='large' color={'#7d330f'}/>
            </View> || <ScrollView>
                <Text style={styles.title}>Hora de ensinar o que você sabe!</Text>
                <Text style={styles.sugestao}>Esperamos que tenha um ótima experiência ao passar seu conhecimento para a alguém! ;)</Text>
                
                <View style={styles.containerButtons}>   
                    <View style={styles.inputsLine}>
                      <TextInput 
                        placeholder='Titulo da aula'
                        placeholderTextColor='#7d330f'
                        value={titulo}
                        onChangeText={setTitulo}
                        style={styles.inputs}
                        />
                      <Icon name='font' color={'#f78232'} size={22} style={{padding:3}}/>
                    </View>
                    <View style={styles.inputsLine}>
                      <TextInput 
                        multiline={true}
                        placeholder='Descreva sua aula aqui...'
                        placeholderTextColor='#7d330f'
                        value={descricao}
                        onChangeText={setDescricao}
                        style={[styles.inputs,styles.descricao]}/>
                      <Icon name='quote-left' color={'#f78232'} size={22} style={{padding:3}}/>
                    </View>
                    <View style={styles.inputsLine}>      
                      <TextInput 
                        placeholder="Materiais necessários"
                        placeholderTextColor='#7d330f'
                        autoCapitalize='words'
                        value={materiais}
                        onChangeText={setMateriais}
                        style={styles.inputs}/>
                      <Icon name='tools' color={'#f78232'} size={22} style={{padding:3}}/>
                    </View>
                    <View style={styles.inputsLine}> 
                      <TextInput 
                        placeholder="Valor: "
                        keyboardType='numeric'
                        placeholderTextColor='#7d330f'
                        value={preco}
                        onChangeText={setPreco}
                        style={styles.inputs}/>
                      <Icon name='dollar-sign' color={'#f78232'} size={22} style={{padding:3}}/>
                    </View>        
                    <View style={styles.linha}>
                    <Icon name='calendar-alt' color={'#f78232'} size={22} style={{padding:3,marginRight:3}}/>
                      <TouchableOpacity style={styles.dtButton} onPress={setDateAndroid}>
                          <Text style={styles.btText}>Data</Text>
                      </TouchableOpacity>
                        <Text style={styles.btText}>{androidDate}</Text>
                    </View>
                    <View style={styles.linha}>
                    <Icon name='image' color={'#f78232'} size={22} style={{padding:3}}/>
                      <TouchableOpacity style={styles.dtImagem} onPress={selecionarImagem}>
                          <Text style={styles.btText}>Imagem</Text> 
                      </TouchableOpacity>
                      {preview && <Image style={styles.preview} source={preview}/>}
                    </View> 
                    <Text> OBS¹: O Endereço deverá ser combinado juntamento com seu aluno!</Text>
                </View> 
                <TouchableOpacity style={styles.button} onPress={handleCriarAula}>
                    <Text style={styles.eninarBt}>Ensinar</Text>
                    <Icon name='share-alt' color={'#fff'} size={25} style={{padding:3,marginLeft:5}}/>
                </TouchableOpacity>
              </ScrollView>}
              <SCLAlert 
                onRequestClose={()=>setModal(false)}
                theme='success'
                show={modal}
                title={'Pronto!'}
                subtitle={'Agradecemos por querer compartilhar seu conhecimento!'}>
                <SCLAlertButton theme='success' onPress={()=> setModal(false)}>Obrigado</SCLAlertButton>
              </SCLAlert>
              <SCLAlert 
                onRequestClose={()=>setAviso(false)}
                theme='warning'
                show={aviso}
                title={'Opa!'}
                subtitle={'Complete todos os campos antes de continuar!'}>
                <SCLAlertButton theme='warning' onPress={()=> setAviso(false)}>Entendi</SCLAlertButton>
              </SCLAlert>
            </View>
        )
    }

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    title: {
      color: '#f78232',
      fontSize: 22,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    sugestao: {
      color:'#7d330f',
      fontSize: 18,
      marginTop: 10,
      textAlign: 'center',
      paddingLeft:10
    },
    containerButtons:{
        flex:1,
        backgroundColor:'transparent',
        marginTop:15,
        marginHorizontal:10
    },
    inputsLine:{
      flexDirection:'row-reverse',
      width:'100%',
      alignItems:'center',
    },
    inputs:{
        height:40,
        borderColor:'#ccc',
        borderWidth:0.5,
        marginBottom:10,
        borderRadius:10,
        color:'#f78232',
        width:'85%',
        marginHorizontal:10
    },
    descricao:{
        maxHeight:100,
        height:80
    },
    linha:{
        flexDirection:'row',
        paddingTop:5,
        padding:5,
    },
    dtButton:{
        flexDirection:'row',  
        height:40,
        width:100,
        backgroundColor:'transparent',
        alignItems:'center',
        justifyContent:'center',
        marginRight:10,
        borderColor:'#ccc',
        borderRadius:10,
        borderWidth:0.5,
    },
    button:{
        flexDirection:'row',
        backgroundColor:'#f78232',
        alignItems:'center',
        justifyContent:'center',
        marginVertical:20,
        padding:10,
        marginHorizontal:10,
        borderRadius:40,
        borderWidth:0.5,
        borderColor:'#ccc'
    },
    eninarBt:{
      color: '#fff',
      fontSize: 22,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    btText:{
        fontSize:18,
        color:'#7d330f',
    },
    preview:{
      alignSelf:'flex-end',
      width:'50%',
      height:120,
      borderRadius:10
    },
    dtImagem:{
      flexDirection:'row',  
        height:40,
        width:120,
        backgroundColor:'transparent',
        alignItems:'center',
        justifyContent:'center',
        marginRight:10,
        borderColor:'#ccc',
        borderRadius:10,
        borderWidth:0.5
    },
    loading:{
      justifyContent:'center',
      alignItems:'center',
      position:'absolute',
      width:'100%',
      height:'100%',
      backgroundColor:'transparent',
  }
  });
