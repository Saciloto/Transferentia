import React from 'react';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
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
      resizeMode:'cover',
      width:200,
      height:120,
      borderRadius:10
    },
    listDescricao:{
      flex:1,
      paddingHorizontal:10,
      marginHorizontal:10,
    },
    txtDescricao:{
      color:'#fff',
      fontSize:14
    }
  });

