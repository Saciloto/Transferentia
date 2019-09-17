import React,{useState,useEffect} from 'react';
import { StyleSheet ,Text, View, ImageBackground, 
        StatusBar, ScrollView} from 'react-native';
import {ListaVertical,ListaHorizontal} from './components/Listas';

import io from 'socket.io-client';
import api from '../services/api';

export default function Aprender({navigation}){
  const userName = navigation.getParam('user');
  const [users,setUsers] = useState([])
  
  useEffect(()=> {
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

  useEffect(()=>{
    const socket = io('http://localhost:3333/');//,{
    //  query:{userName}
    //});
    setTimeout(() =>{
    socket.emit('Hello',{message:'Hello WOrdl'})
  },3000);
},[])
  
        return (
            <ImageBackground
            source={require('../assets/preto.jpg')} style={styles.container}  resizeMode="cover">
            <StatusBar barStyle="light-content" backgroundColor="#111" />
          {/*PARTE SUPERIOR*/}
            <ScrollView>
              <Text style={styles.title}>Bem-vindo ao Transferentia!</Text>
            <ListaHorizontal/>
            <Text style={styles.sugestao}> Algumas Sugestões que você pode gostar ;)  </Text>
            <ListaVertical/>
            </ScrollView>
            </ImageBackground>
        )
    }


const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      flex: 1,
      paddingHorizontal: 0,
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
      marginTop: 20,
      textAlign: 'center',
    }
  });