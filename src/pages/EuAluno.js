import React,{useState,useEffect,useCallback} from 'react';
import {Text, View, ScrollView,FlatList,TouchableOpacity,Image,RefreshControl,StyleSheet} from 'react-native';

import api from '../services/api';

export default function EuAluno({navigation}){

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

    return(
        <ScrollView>
            <FlatList 
                data={aulas}
                keyExtractor={item => item._id}
                renderItem={({item}) => (
                <TouchableOpacity onPress={()=>{}}>
                    <View>
                        <Text>{item.titulo}</Text>
                        <Image style={styles.image} source={{uri:'https://transferentia-backend.herokuapp.com/files/'+item.aulaImagem}}/>
                    </View>   
                </TouchableOpacity>    
                )}
            />

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    image:{
        flex:1,
        justifyContent:'center',
        alignContent:'stretch',
        alignSelf:'center',
        width:'100%',
        height:250
    }
})