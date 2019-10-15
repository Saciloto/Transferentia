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
    listHorozintal:{
      flex:1,
      paddingTop:10,
      alignItems:'center',
      justifyContent:'space-between',
      marginHorizontal:20
    },
    tituloHorizontal:{
      color:'#fff',
      fontSize:20,
      fontWeight:'bold',
      paddingTop:5,
      paddingHorizontal:5,
      borderBottomWidth:0.5,
      borderBottomColor:'#f78232'
    },
    imageHorizontal:{
      resizeMode:'cover',
      width:140,
      height:140,
      borderRadius:10,
      marginVertical:5
    },
    containerListVert:{
      flex:1,
      flexDirection:'column',
      justifyContent:'space-between',
      borderWidth:0.5,
      borderRadius:10,
      borderColor:'#ccc',
      marginVertical:5,
      marginHorizontal:10,
      paddingHorizontal:5
    },
    cardVerti:{
      flex:1,
      flexDirection:'row',
      justifyContent:'center',
      backgroundColor: 'transparent',
    },
    imageVertical:{
      resizeMode:'cover',
      marginVertical:10,
      marginHorizontal:10,
      width:180,
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
      fontSize:14,
    },
    preco:{
      color:'#ccc',
      fontSize:18,
      fontWeight:'bold',
      marginHorizontal:10,
      alignSelf:'flex-end',
      textAlign:'right',
      borderBottomWidth:0.3,
      borderBottomColor:'#f78232'
    }
  });

