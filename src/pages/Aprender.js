import React,{useState,useEffect,useCallback} from 'react';
import {Text, View, ScrollView,FlatList,TouchableOpacity,Image,RefreshControl} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5'

import {styles} from './estilos/styles';
import api from '../services/api';

//Tela de aprender onde é listado as aulas disponíveis, tela principal do APP
export default function Aprender({navigation}){
  const [aulas,setAulas] = useState([])
  const [reload,setReload] = useState(false);

  useEffect(()=> {
    async function loadAulas(){
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

return(
  <ScrollView refreshControl={<RefreshControl refreshing={reload} onRefresh={onReload} style={{backgroundColor:'#fff'}}/>}>
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
              <Text style={styles.tituloHorizontal} numberOfLines={1} >{item.titulo}</Text>
              <Image style={styles.imageHorizontal} source={{uri:'https://transferentia-backend.herokuapp.com/files/'+item.aulaImagem}}/>
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
                <View style={styles.lineTitle}>
                    <Icon name='quote-left' color={'#f78232'} size={22} style={{padding:3}}/>
                    <Text style={styles.tituloVertical}>{item.titulo}</Text>
                </View>
                <View style={styles.cardVerti}>
                    <Image style={styles.imageVertical} source={{uri:'https://transferentia-backend.herokuapp.com/files/'+item.aulaImagem}}/>
                    <View style={styles.listDescricao}>
                        <Text style={styles.titleDescricao}>Descrição:</Text>
                        <Text numberOfLines={6} style={styles.txtDescricao}>- {item.descricao}</Text> 
                    </View>
                </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </ScrollView>
  )
}


