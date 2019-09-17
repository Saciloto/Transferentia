import React, { Component } from 'react';
import { Text, View,ImageBackground,StatusBar,StyleSheet,TextInput,DatePickerAndroid,TouchableOpacity,
        TimePickerAndroid,Image,ScrollView } from 'react-native';
import Icon from '../../node_modules/react-native-vector-icons/FontAwesome5';
import ImagePicker from 'react-native-image-picker';


export default class Ensinar extends Component {

  static navigationOptions = {
    tabBarLabel:'Ensinar',
    tabBarIcon:() => (
        <Icon name="handshake" size={35} color={"#fff"}/>
    ),
  }

    constructor(props){
        super(props);
        this.state = {
            chosenDate: new Date(),
            chosenAndroidTime: '00:00',
            androidDate: `${new Date().getUTCDate()}/${new Date().getUTCMonth() + 1}/${new Date().getUTCFullYear()}`,
            value: 50,


            preview: null,
          };
    }

   
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

          this.setState({preview});
        } 
      })
    }


    setDate(newDate) {
        this.setState({ chosenDate: newDate });
      }
      
    setDateAndroid = async () => {
        try {
          const {action, year, month, day} = await DatePickerAndroid.open({
          date: new Date(),
          minDate: new Date(),
          });
          if (action !== DatePickerAndroid.dismissedAction) {
            this.setState({ androidDate: `${day}/${month + 1}/${year}` });
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
            this.setState({ chosenAndroidTime: `${h}:${m}` });
          }
        } catch ({ code, message }) {
          console.warn('Cannot open time picker', message);
        }
      };

    render() {
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
                        style={styles.inputs}/>
                    <TextInput 
                        multiline={true}
                        placeholder='Descreva sua aula aqui...'
                        placeholderTextColor='#fff'
                        style={[styles.inputs,styles.descricao]}/>
                    <TextInput 
                        placeholder="Conhecimento necessário"
                        placeholderTextColor='#fff'
                        style={styles.inputs}/>
                    <TextInput 
                        placeholder="Materiais necessários"
                        placeholderTextColor='#fff'
                        style={styles.inputs}/>
                    <View style={styles.linha}>
                        <TouchableOpacity style={styles.dtButton} onPress={this.selecionarImagem}>
                            <Text style={styles.title}>Imagem</Text>
                        </TouchableOpacity>
                      
                      {this.state.preview && <Image style={styles.preview} source={this.state.preview}/>}
                    </View>            
                        <View style={styles.linha}>
                        <TouchableOpacity style={styles.dtButton} onPress={this.setDateAndroid}>
                            <Text style={styles.title}>Data</Text>
                        </TouchableOpacity>
                        <Text style={styles.title}>{this.state.androidDate}</Text>
                        </View>
                        <View style={styles.linha}>
                        <TouchableOpacity style={styles.dtButton} onPress={this.setTimeAndroid}>
                            <Text style={styles.title}>Hora</Text>
                        </TouchableOpacity>
                        <Text style={styles.title}>{this.state.chosenAndroidTime} Hrs</Text>
                        </View>
                    <Text style={styles.obsText}> OBS¹: O Endereço deverá ser combinado juntamento com seu aluno!</Text>
                </View> 
                <TouchableOpacity style={styles.button} onPress={this.setTimeAndroid}>
                    <Text style={styles.title}>Ensinar</Text>
                </TouchableOpacity>
              </ScrollView>
            </ImageBackground>
        )
    }
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
