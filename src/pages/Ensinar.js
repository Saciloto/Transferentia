import React, { useState,useEffect } from 'react';
import { Text, View,ImageBackground,StatusBar,StyleSheet,TextInput,DatePickerAndroid,TouchableOpacity,
        TimePickerAndroid,Image,ScrollView, AsyncStorage } from 'react-native';
import api from '../services/api';
import ImagePicker from 'react-native-image-picker';

export default function Ensinar({navigation}) {

  const [chosenDate, setChosenDate] = useState(new Date());
  const [chosenAndroidTime, setChosenAndroidTime] = useState('00:00');
  const [androidDate, setAndroidDate] = useState(`${new Date().getUTCDate()}/${new Date().getUTCMonth() + 1}/${new Date().getUTCFullYear()}`);
  const [aulaTitle, setAulaTitle] = useState('');
  
  const [preview,setPreview] = useState(null);
  const [aulaImagem,setAulaImagem] = useState(null);
  const [professor, setProfessor] = useState();
  const [titulo, setTitulo] = useState('');
  const [descricao,setDescricao] = useState('');
  //const [materiais,setMateriais] = useState('');
  const [preco, setPreco] = useState('');
  const [data, setData] = useState('');
  const [hora, setHora] = useState('');

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
      const data = new FormData();

      data.append('aulaImagem',aulaImagem);   
      data.append('titulo',titulo);      
      data.append('descricao', descricao);
      data.append('data',androidDate);
      data.append('preco',preco);
      data.append('professor',professor);

      await api.post('/aula',data);
      alert("Aula criada com sucesso!") 
      //const {_id} = response.data;
     // alert(_id)
    }

        return (
            <ImageBackground
            source={require('../assets/preto.jpg')} style={styles.container}  resizeMode="cover">
            <StatusBar barStyle="light-content" backgroundColor="#7d330f" />
            <ScrollView>
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
                    {/* <TextInput 
                        placeholder="Materiais necessários"
                        placeholderTextColor='#fff'
                        value={materiais}
                        onChangeText={setMateriais}
                        style={styles.inputs}/> */}
                    <TextInput 
                        placeholder="Valor: "
                        keyboardType='numeric'
                        placeholderTextColor='#fff'
                        value={preco}
                        onChangeText={setPreco}
                        style={styles.inputs}/>
                    <View style={styles.linha}>
                        <TouchableOpacity style={styles.dtButton} onPress={selecionarImagem}>
                            <Text style={styles.title}>Imagem</Text>
                        </TouchableOpacity>
                      
                      {preview && <Image style={styles.preview} source={preview}/>}
                    </View>            
                        <View style={styles.linha}>
                        <TouchableOpacity style={styles.dtButton} onPress={setDateAndroid}>
                            <Text style={styles.title}>Data</Text>
                        </TouchableOpacity>
                        <Text style={styles.title}>{androidDate}</Text>
                        </View>
                        <View style={styles.linha}>
                        <TouchableOpacity style={styles.dtButton} onPress={setTimeAndroid}>
                            <Text style={styles.title}>Hora</Text>
                        </TouchableOpacity>
                        <Text style={styles.title}>{chosenAndroidTime} Hrs</Text>
                        </View>
                    <Text style={styles.obsText}> OBS¹: O Endereço deverá ser combinado juntamento com seu aluno!</Text>
                </View> 
                <TouchableOpacity style={styles.button} onPress={handleCriarAula}>
                    <Text style={styles.title}>Ensinar</Text>
                </TouchableOpacity>
              </ScrollView>
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
        marginLeft:15,
        marginRight:15
    },
    inputs:{
        height:40,
        borderColor:'#ccc',
        borderWidth:2,
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
        marginTop:80,
        marginBottom:20,
        padding:10,
        marginLeft:10,
        marginRight:10,
        borderRadius:40,
        borderWidth:0.5,
        borderColor:'#fff'
    },
    obsText:{
        fontSize:14,
        fontWeight:'bold',
        color:'#fff',
        paddingTop:10
    },
    preview:{
      width:50,
      height:50
    }
  });
