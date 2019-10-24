import React,{useState,useEffect,useCallback,useMemo} from 'react';
import {Text, View, ImageBackground,StatusBar, ScrollView,FlatList,TouchableOpacity,Image,RefreshControl,Button,AsyncStorage} from 'react-native';
import StarRating from 'react-native-star-rating'; 

import {styles} from './estilos/styles';

import io from 'socket.io-client';
import api from '../services/api';

export default function Aprender({navigation}){
  const [aulas,setAulas] = useState([])
  const [reload,setReload] = useState(false);
  const [starCount,setStarCount] = useState(4);
  //const [logedUser,setLogedUser]

  useEffect(()=> {
    async function loadAulas(){
      // const user_id = await AsyncStorage.getItem('user'); 
      // setLogedUser(user_id);
      const response = await api.get('./aula')
      setAulas(response.data);
    }
    loadAulas();
  }, []);

  const onReload = useCallback(()=> {
    setReload(true);
    async function loadAulas(){
      const response = await api.get('./aula')
      setAulas(response.data);
    }
    loadAulas();
    setReload(false)
  }, [reload])

  // useMemo(() => io('http://192.168.0.110:3333/',{ //irá refazer a conexão somente quando a varial loegedUser mudar
  //   query:{user_id}
  // }),[logedUser]);

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
                                                                  preco:item.preco,
                                                                  professor_id:item.professor})}>
          <View style={styles.listHorozintal}>
              <Text style={styles.tituloHorizontal} numberOfLines={1}>{item.titulo}</Text>
              <Image style={styles.imageHorizontal} source={{uri:'https://transferentia-backend.herokuapp.com/files/'+item.aulaImagem}}/>
              <Button color={'#f78232'} title={'Ver aula'} onPress={() => navigation.navigate('Aula',{aula_id:item._id,
                                                                  aulaImagem:item.aulaImagem,
                                                                  titulo:item.titulo,
                                                                  data:item.data,
                                                                  descricao:item.descricao,
                                                                  preco:item.preco,
                                                                  professor_id:item.professor})}/>
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
                                                                      preco:item.preco,
                                                                      professor_id:item.professor                                                                      })}>
            <View style={styles.containerListVert}>
              <Text style={styles.tituloHorizontal}>{item.titulo}</Text>
              <View style={styles.cardVerti}>
                  <Image style={styles.imageVertical} source={{uri:'https://transferentia-backend.herokuapp.com/files/'+item.aulaImagem}}/>
                  <View style={styles.listDescricao}>
                  {/* <StarRating
                              starStyle={{marginVertical:2}}
                              disabled={true}
                              maxStars={5}
                              starSize={15}
                              rating={starCount}
                              selectedStar={setStarCount}
                              fullStarColor={'#7d330f'}
                    /> */}
                      <Text style={styles.preco}>Descrição:</Text>
                      <Text numberOfLines={6} style={styles.txtDescricao}>- {item.descricao}</Text>
                      
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


