import React,{useState,useEffect,useCallback} from 'react';
import {Text, View, ImageBackground,StatusBar, ScrollView,FlatList,TouchableOpacity,Image,RefreshControl,Button} from 'react-native';

import {styles} from './estilos/styles';

import io from 'socket.io-client';
import api from '../services/api';

export default function Aprender({navigation}){
  const [aulas,setAulas] = useState([])
  const [aulaImagem,setAulaImagem] = useState('');
  const [reload,setReload] = useState(false);
  

  useEffect(()=> {
    async function loadAulas(){
      const response = await api.get('./aula')
      const {aulaImagem} = response.data
      setAulaImagem(aulaImagem)
      setAulas(response.data);
    }
    loadAulas();
  }, []);

  const onReload = useCallback(()=> {
    setReload(true);
    async function loadAulas(){
      const response = await api.get('./aula')
      const {aulaImagem} = response.data
      setAulaImagem(aulaImagem)
      setAulas(response.data);
    }
    loadAulas();
    setReload(false)
  }, [reload])

//   useEffect(()=>{
//     const socket = io('http://localhost:3333/');//,{
//     //  query:{userName}
//     //});
//     setTimeout(() =>{
//     socket.emit('Hello',{message:'Hello WOrdl'})
//   },3000);
// },[])
return(
  <ImageBackground
    source={require('../assets/preto.jpg')} style={styles.container}  resizeMode="cover">
  <StatusBar barStyle="light-content" backgroundColor="#111" />
  <ScrollView refreshControl={<RefreshControl refreshing={reload} onRefresh={onReload}/>}>
    <Text style={styles.title}>Bem-vindo ao Transferentia!</Text>
    {/*Lista horizontal*/}
    <FlatList style={{paddingTop:5}} horizontal data={aulas} keyExtractor={item => item._id}
      renderItem={({item}) => (
        <TouchableOpacity onPress={()=>navigation.navigate('Aula',{aula_id:item._id,
                                                                  aulaImagem:item.aulaImagem,
                                                                  titulo:item.titulo,
                                                                  data:item.data,
                                                                  descricao:item.descricao,
                                                                  preco:item.preco})}>
          <View style={styles.listHorozintal}>
              <Text style={styles.tituloHorizontal} numberOfLines={1}>{item.titulo}</Text>
              <Image style={styles.imageHorizontal} source={{uri:'https://transferentia-backend.herokuapp.com/files/'+item.aulaImagem}}/>
              <Button color={'#f78232'} title={'Ver aula'} onPress={() => alert('Em desenvolvimento')}/>
          </View>   
        </TouchableOpacity>    
      )}
    />
    <Text style={styles.sugestao}> Algumas Sugestões que você pode gostar ;)  </Text>
    {/* LISTA VERTICAL  */}
      <FlatList style={{paddingTop:10}} data={aulas} keyExtractor={item => item._id}
        renderItem={({item}) => (
          <TouchableOpacity onPress={()=>navigation.navigate('Aula',{aula_id:item._id,
                                                                      aulaImagem:item.aulaImagem,
                                                                      titulo:item.titulo,
                                                                      data:item.data,
                                                                      descricao:item.descricao,
                                                                      preco:item.preco})}>
            <View style={styles.containerListVert}>
              <Text style={styles.tituloHorizontal}>{item.titulo}</Text>
              <View style={styles.cardVerti}>
                  <Image style={styles.imageVertical} source={{uri:'https://transferentia-backend.herokuapp.com/files/'+item.aulaImagem}}/>
                  <View style={styles.listDescricao}>
                      <Text numberOfLines={6} style={styles.txtDescricao}>- {item.descricao}</Text>
                      <Text style={styles.preco}>R$ {item.preco}</Text>
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


