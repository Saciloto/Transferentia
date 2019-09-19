import React,{useState,useEffect} from 'react';
import {Text, View, ImageBackground,StatusBar, ScrollView,FlatList,TouchableOpacity,Image} from 'react-native';

import {styles} from './estilos/styles';

import io from 'socket.io-client';
import api from '../services/api';

import {exemplosJson} from '../data/exemplos'

export default function Aprender({navigation}){
  const userName = navigation.getParam('user');
  const [users,setUsers] = useState([])
  
  

  /*useEffect(()=> {
    async function loadAulas(){
      const response = await api.get('./user',{
        headers:{
          userName
        }
      })
      setUsers(response.data);
    }
    loadAulas();
  }, [userName]);
*/
  useEffect(()=>{
    const socket = io('http://localhost:3333/');//,{
    //  query:{userName}
    //});
    setTimeout(() =>{
    socket.emit('Hello',{message:'Hello WOrdl'})
  },3000);
},[])
  
return(
      <ImageBackground
      source={require('../assets/preto.jpg')} style={styles.container}  resizeMode="cover">
      <StatusBar barStyle="light-content" backgroundColor="#111" />
    {/*PARTE SUPERIOR*/}
      <ScrollView>
        <Text style={styles.title}>Bem-vindo ao Transferentia!</Text>
        <FlatList 
        style={{paddingTop:5}}
        horizontal
        data={exemplosJson}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
        <TouchableOpacity onPress={()=>navigation.navigate('Aula',{item:item.id,
                                                                  image:item.image,
                                                                  title:item.title,
                                                                  name:item.name,
                                                                  descricao:item.descricao,
                                                                  price:item.price})}>
          <View style={styles.listHorozintal}>
              <Text style={styles.tituloHorizontal}>{item.title}</Text>
              <Image style={styles.imageHorizontal} source={{uri: item.image}}/>
          </View>   
        </TouchableOpacity>    
        )}
        />
        <Text style={styles.sugestao}> Algumas Sugestões que você pode gostar ;)  </Text>
        {/* LISTA VERTICAL  */}
        <FlatList 
            style={{paddingTop:10}}
            data={exemplosJson}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <TouchableOpacity onPress={()=>navigation.navigate('Aula',{item:item.id})}>
              <View style={styles.containerFlatlist}>
                <View style={styles.containerListVert}>
                  <Text style={styles.tituloHorizontal}>{item.title}</Text>
                  <View style={styles.cardVerti}>
                    <Image style={styles.imageVertical} source={{uri: item.image}}/>
                      <View style={styles.listDescricao}>
                          <Text style={styles.txtDescricao}>{item.descricao}</Text>
                      </View>
                  </View>  
                </View>
              </View>
              </TouchableOpacity>
            )}
          />
        </ScrollView>
        </ImageBackground>
    )
}


