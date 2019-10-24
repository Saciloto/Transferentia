import React, { useState,useEffect } from 'react';
import { Text, View,ImageBackground,StatusBar,StyleSheet,TextInput,DatePickerAndroid,TouchableOpacity,
        TimePickerAndroid,Image,ScrollView, AsyncStorage, ActivityIndicator } from 'react-native';
import api from '../services/api';
import ImagePicker from 'react-native-image-picker';

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
      if (aulaImagem === (null)){
        alert('Complete todos os campos')
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
      alert("Aula criada com sucesso!")
      setCarregando(false)
      setTitulo(initialState)
      setDescricao(initialState)
      setPreco(initialState)}
    };

        return (
            <ImageBackground
            source={require('../assets/preto.jpg')} style={styles.container}  resizeMode="cover">
            <StatusBar barStyle="light-content" backgroundColor="#7d330f" />
            {carregando && <View style={styles.loading}>
              <ActivityIndicator size='large' color={'#7d330f'}/>
            </View> || <ScrollView>
                <Text style={styles.title}>Hora de ensinar o que você sabe!</Text>
                <Text style={styles.sugestao}>Esperamos que tenha um ótima experiência ao passar seu conhecimento para a alguém! ;)</Text>
                
                <View style={styles.containerButtons}>   
                    <TextInput 
                        placeholder='Titulo da aula'
                        placeholderTextColor='#fff'
                        value={titulo}
                        onChangeText={setTitulo}
                        style={styles.inputs}
                        />
                    <TextInput 
                        multiline={true}
                        placeholder='Descreva sua aula aqui...'
                        placeholderTextColor='#fff'
                        value={descricao}
                        onChangeText={setDescricao}
                        style={[styles.inputs,styles.descricao]}/>
                    <TextInput 
                        placeholder="Materiais necessários"
                        placeholderTextColor='#fff'
                        autoCapitalize='words'
                        value={materiais}
                        onChangeText={setMateriais}
                        style={styles.inputs}/>
                    <TextInput 
                        placeholder="Valor: "
                        keyboardType='numeric'
                        placeholderTextColor='#fff'
                        value={preco}
                        onChangeText={setPreco}
                        style={styles.inputs}/>           
                        <View style={styles.linha}>
                        <TouchableOpacity style={styles.dtButton} onPress={setDateAndroid}>
                            <Text style={styles.btText}>Data - </Text>
                            <Icon name='calendar-alt' color={'#fff'} size={22} style={{padding:3}}/>
                        </TouchableOpacity>
                        <Text style={styles.btText}>{androidDate}</Text>
                        </View>
                        {/* <View style={styles.linha}>
                        <TouchableOpacity style={styles.dtButton} onPress={setTimeAndroid}>
                            <Text style={styles.btText}>Hora - </Text>
                            <Icon name='clock' color={'#fff'} size={22} style={{padding:3}}/>
                        </TouchableOpacity>
                        <Text style={styles.btText}>{chosenAndroidTime} Hrs</Text>
                        </View> */}
                        <View style={styles.linha}>
                        <TouchableOpacity style={styles.dtImagem} onPress={selecionarImagem}>
                            <Text style={styles.btText}>Imagem - </Text>
                            <Icon name='image' color={'#fff'} size={22} style={{padding:3}}/>
                        </TouchableOpacity>
                      {preview && <Image style={styles.preview} source={preview}/>}
                    </View> 
                    {/* <Text style={styles.obsText}> OBS¹: O Endereço deverá ser combinado juntamento com seu aluno!</Text> */}
                </View> 
                <TouchableOpacity style={styles.button} onPress={handleCriarAula}>
                    <Text style={styles.title}>Ensinar</Text>
                </TouchableOpacity>
              </ScrollView>}
            </ImageBackground>
        )
    }

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    title: {
      color: '#fff',
      fontSize: 22,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    sugestao: {
      color:'#f78232',
      fontSize: 18,
      marginTop: 10,
      textAlign: 'center',
      paddingLeft:10
    },
    containerButtons:{
        flex:1,
        backgroundColor:'transparent',
        marginTop:15,
    },
    inputs:{
        height:40,
        borderColor:'#ccc',
        borderWidth:1,
        marginBottom:10,
        borderRadius:10,
        color:'#fff'
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
        borderRadius:40,
        borderWidth:1
    },
    button:{
        backgroundColor:'transparent',
        alignItems:'center',
        justifyContent:'center',
        marginVertical:20,
        padding:10,
        marginHorizontal:10,
        borderRadius:40,
        borderWidth:0.5,
        borderColor:'#fff'
    },
    btText:{
        fontSize:18,
        color:'#fff',
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
        borderRadius:40,
        borderWidth:1
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
