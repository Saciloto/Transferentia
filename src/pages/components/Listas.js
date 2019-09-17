import React from 'react';
import {View,Text,FlatList, TouchableOpacity,StyleSheet,Image } from 'react-native';

import {exemplosJson} from '../../data/exemplos';


export const ListaHorizontal = () => {
    return(
    <FlatList 
              style={{paddingTop:5}}
              horizontal
              data={exemplosJson}
              keyExtractor={item => item.id}
              renderItem={({item}) => (
              <TouchableOpacity>
                <View style={styles.listHorozintal}>
                    <Text style={styles.tituloHorizontal}>{item.title}</Text>
                    <Image style={styles.imageHorizontal} source={{uri: item.image}}/>
                </View>   
              </TouchableOpacity>    
              )}
            />
    )
};

export const ListaVertical = () =>{
    return(
    <FlatList 
              style={{paddingTop:10}}
              data={exemplosJson}
              keyExtractor={item => item.id}
              renderItem={({item}) => (
                <TouchableOpacity>
                <View style={styles.containerFlatlist}>
                  <View style={styles.containerListVert}>
                    <Text style={styles.tituloHorizontal}>{item.title}</Text>
                    <View style={styles.cardVerti}>
                      <Image style={styles.imageVertical} source={{uri: item.image}}/>
                        <View style={styles.listDescricao}>
                            <Text style={styles.txtDescricao}>DESCRIÇÃO dafasdsajdasjdifhaskdasldjashdoasdkohfsliahfaçsjdasfhasoifhao</Text>
                        </View>
                    </View>  
                  </View>
                </View>
                </TouchableOpacity>
              )}
            />
    )
};


const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      flex: 1,
      paddingHorizontal: 0,
    },
    titleView:{
      flex:1,
      height:150,
      width:150,
      alignItems:'center',
      justifyContent:'center',
      marginTop:20,
      backgroundColor:'#ddd',
    },
    title: {
      color: '#fff',
      fontSize: 22,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    listHorozintal:{
      flex:1,
      paddingTop:10,
      alignItems:'center',
      justifyContent:'space-between',
      marginRight:20,
      marginLeft:20,
    },
    tituloHorizontal:{
      color:'#fff',
      fontSize:16,
      fontWeight:'bold',
      paddingTop:10,
    },
    imageHorizontal:{
      resizeMode:'stretch',
      width:140,
      height:140,
      borderRadius:10
    },
    containerFlatlist:{
      flex:1,
      height:220,
      width:400,
      alignItems:'stretch',
      //backgroundColor:'#fff',
    },
    containerListVert:{
      flex:1,
      flexDirection:'column',
      justifyContent:'space-between',
      borderWidth:1,
      borderRadius:10,
      borderColor:'#7d330f'
    },
    cardVerti:{
      flex:1,
      flexDirection:'row',
      justifyContent:'center',
      backgroundColor: 'transparent',
    },
    imageVertical:{
      resizeMode:'stretch',
      width:140,
      height:140,
      borderRadius:10
    },
    listDescricao:{
      flex:1,
      paddingLeft:10,
      marginRight:10,
      marginLeft:10
    },
    txtDescricao:{
      color:'#fff',
      fontSize:14
    }
  });